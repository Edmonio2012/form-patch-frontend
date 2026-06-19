/*
 * Space One — Pricing Calculator Page (Production-Grade)
 * Multi-step form with strict validation, session management, and Edge Function integration
 * Design: Centered, focused layout with progress indicator
 * 
 * SECURITY RULES:
 * - Step progression is linear and enforced
 * - Next button disabled until required fields completed
 * - No pricing exposed in frontend
 * - Session-based step tracking
 * - All pricing calculated server-side via Edge Functions
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, AlertCircle, Loader } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { callParseRequest, callCalculatePrice, callCreateRequest } from "@/lib/api";
import { trackFormSubmission, trackCalculatorStep, trackFeatureSelection, trackEstimateView } from "@/lib/analytics";

// Step components
import CalculatorIntro from "@/components/CalculatorIntro";
import BusinessTypeStep from "@/components/calculator-steps/BusinessTypeStep";
import ProjectDetailsStep from "@/components/calculator-steps/ProjectDetailsStep";
import FeaturesStep from "@/components/calculator-steps/FeaturesStep";
import EstimateStep from "@/components/calculator-steps/EstimateStep";
import LeadFormStep from "@/components/calculator-steps/LeadFormStep";
import SuccessConfirmation from "@/components/SuccessConfirmation";

export interface FormData {
  businessType: string;
  goal: string;
  pages: string | number;
  features: string[];
  timeline: string;
  designStyle: string;
  name: string;
  email: string;
  message?: string;
  complexity?: "low" | "medium" | "high";
  projectType?: "low" | "medium" | "high";
  subscribeToPromotions?: boolean;
  agreeToTerms?: boolean;
  estimate?: {
    totalPrice: number;
    priceRange: { min: number; max: number };
    message: string;
  };
}

interface StepValidation {
  isValid: boolean;
  errorMessage?: string;
}

const TOTAL_STEPS = 6;

// Step validation rules
const STEP_REQUIREMENTS: Record<number, (data: FormData) => StepValidation> = {
  1: () => ({ isValid: true }), // Intro - no validation
  2: (data) => ({
    isValid: !!data.businessType,
    errorMessage: "Please select a business type to continue",
  }),
  3: (data) => ({
    isValid: !!data.goal && !!data.pages && !!data.timeline && !!data.designStyle,
    errorMessage: "Please complete all project details to continue",
  }),
  4: (data) => ({
    isValid: data.features.length > 0,
    errorMessage: "Please select at least one feature to continue",
  }),
  5: () => ({ isValid: true }), // Estimate - display only
  6: (data) => ({
    isValid: !!data.name && !!data.email,
    errorMessage: "Please complete all required fields to submit",
  }),
};

/**
 * Normalize frontend timeline values to backend values
 */
function normalizeTimeline(value: string): "normal" | "fast" | "urgent" {
  const timelineMap: Record<string, "normal" | "fast" | "urgent"> = {
    "asap": "urgent",
    "2-4weeks": "fast",
    "1-2months": "normal",
    "flexible": "normal",
    "urgent": "urgent",
    "fast": "fast",
    "normal": "normal",
  };
  return timelineMap[value] || "normal";
}

/**
 * Map business type to project complexity level
 */
function getProjectComplexity(businessType: string): "low" | "medium" | "high" {
  const complexityMap: Record<string, "low" | "medium" | "high"> = {
    "landing-page": "low",
    "business-website": "medium",
    "ecommerce": "high",
    "saas": "high",
    "custom": "high",
  };
  return complexityMap[businessType] || "medium";
}

export default function PricingCalculator() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    businessType: "",
    goal: "",
    pages: "",
    features: [],
    timeline: "",
    designStyle: "",
    name: "",
    email: "",
    message: "",
  });
  const [validationError, setValidationError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
  const [successData, setSuccessData] = useState<{ requestId: string; message: string } | null>(null);

  // Validate current step
  const validateCurrentStep = (): StepValidation => {
    const validator = STEP_REQUIREMENTS[currentStep];
    if (!validator) return { isValid: true };
    return validator(formData);
  };

  const isCurrentStepValid = validateCurrentStep().isValid;

  // Parse request with AI
  const parseRequest = async () => {
    try {
      setIsLoading(true);
      const result = await callParseRequest({
        businessType: formData.businessType,
        businessGoal: formData.goal,
        selectedFeatures: formData.features,
        timeline: normalizeTimeline(formData.timeline),
      });

      if (result.success) {
        updateFormData({
          complexity: result.complexity,
          projectType: result.projectType,
        });
      } else {
        setValidationError(result.error || "Failed to parse request");
        return false;
      }
    } catch (error) {
      console.error("Error parsing request:", error);
      setValidationError("Failed to process your request. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
    return true;
  };

  // Calculate price
  const calculatePrice = async () => {
    try {
      setIsLoading(true);
      trackCalculatorStep(5, "Estimate Calculation");
      const result = await callCalculatePrice({
        featureIds: formData.features,
        complexity: formData.complexity || "medium",
        timeline: normalizeTimeline(formData.timeline),
        projectComplexity: getProjectComplexity(formData.businessType),
      });

      if (result.success) {
        trackEstimateView(result.totalPrice || 0);
        updateFormData({
          estimate: {
            totalPrice: result.totalPrice || 0,
            priceRange: result.priceRange || { min: 0, max: 0 },
            message: result.message || "",
          },
        });
      } else {
        setValidationError(result.error || "Failed to calculate price");
        return false;
      }
    } catch (error) {
      console.error("Error calculating price:", error);
      setValidationError("Failed to calculate price. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
    return true;
  };

  // Submit request
  const submitRequest = async () => {
    try {
      setIsLoading(true);
      trackCalculatorStep(6, "Form Submission");
      const result = await callCreateRequest({
        businessType: formData.businessType,
        businessGoal: formData.goal,
        featureIds: formData.features,
        timeline: normalizeTimeline(formData.timeline),
        complexity: formData.complexity || "medium",
        projectComplexity: getProjectComplexity(formData.businessType),
        totalPrice: formData.estimate?.totalPrice || 0,
        pricingSnapshot: {
          timestamp: new Date().toISOString(),
        },
        sessionId,
        email: formData.email,
        companyName: formData.name,
    
        subscribeToPromotions: (formData as any).subscribeToPromotions || false,
      });

      if (result.success) {
        trackFormSubmission("pricing_calculator", true);
        setSuccessData({
          requestId: result.requestId || "",
          message: result.message || "Request submitted successfully",
        });
        window.scrollTo({ top: 0, behavior: "instant" });
        return true;
      } else {
        trackFormSubmission("pricing_calculator", false);
        setValidationError(result.error || "Failed to submit request");
        return false;
      }
    } catch (error) {
      console.error("Error submitting request:", error);
      setValidationError("Failed to submit your request. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Handle next with validation
  const handleNext = async () => {
    if (currentStep > 1 && currentStep <= TOTAL_STEPS) {
      trackCalculatorStep(currentStep, `Step ${currentStep}`);
    }
    if (currentStep === TOTAL_STEPS) {
      // Submit form
      const success = await submitRequest();
      if (success) {
        setCurrentStep(TOTAL_STEPS + 1); // Success screen
      }
      return;
    }

    // Validate current step before proceeding
    const validation = validateCurrentStep();
    if (!validation.isValid) {
      setValidationError(validation.errorMessage || "Please complete this step");
      return;
    }

    // Handle step-specific Edge Function calls
    if (currentStep === 4) {
      // Step 4 → 5: Parse request with AI
      const success = await parseRequest();
      if (!success) return;
    } else if (currentStep === 5) {
      // Step 5 → 6: Calculate price
      const success = await calculatePrice();
      if (!success) return;
    }

    // Clear error and proceed
    setValidationError("");
    if (currentStep < TOTAL_STEPS) {
      window.scrollTo({ top: 0, behavior: "instant" });
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    setValidationError("");
    if (currentStep > 1) {
      window.scrollTo({ top: 0, behavior: "instant" });
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
    setValidationError(""); // Clear error when user makes changes
  };

  const renderStep = () => {
    if (successData) {
      return (
        <SuccessConfirmation
          requestId={successData.requestId}
          email={formData.email}
          message={successData.message}
        />
      );
    }

    switch (currentStep) {
      case 1:
        return <CalculatorIntro onStart={handleNext} />;
      case 2:
        return (
          <BusinessTypeStep
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 3:
        return (
          <ProjectDetailsStep
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 4:
        return (
          <FeaturesStep formData={formData} updateFormData={updateFormData} />
        );
      case 5:
        return <EstimateStep formData={formData} />;
      case 6:
        return (
          <LeadFormStep formData={formData} updateFormData={updateFormData} />
        );
      default:
        return <CalculatorIntro onStart={handleNext} />;
    }
  };

  return (
    <div style={{ background: "#001d2e", minHeight: "100vh" }}>
      <Header />

      {/* Main content */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "clamp(60px, 8vh, 80px) 24px 0 24px",
          minHeight: "calc(100vh - 300px)",
        }}
      >
        {/* Progress indicator */}
        {currentStep !== 1 && !successData && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              paddingTop: "40px",
              paddingBottom: "30px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  maxWidth: "400px",
                  height: "4px",
                  background: "rgba(0, 194, 242, 0.1)",
                  borderRadius: "2px",
                  overflow: "hidden",
                }}
              >
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: `${((currentStep - 1) / (TOTAL_STEPS - 1)) * 100}%` }}
                  transition={{ duration: 0.5 }}
                  style={{
                    height: "100%",
                    background: "linear-gradient(90deg, #00c2f2, #75dbf4)",
                  }}
                />
              </div>
            </div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                color: "rgba(0, 194, 242, 0.7)",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              Step {currentStep} of {TOTAL_STEPS}
            </p>
          </motion.div>
        )}

        {/* Validation error message */}
        {validationError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "16px",
              marginBottom: "24px",
              background: "rgba(239, 68, 68, 0.1)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              borderRadius: "8px",
              color: "#fca5a5",
              fontFamily: "var(--font-body)",
              fontSize: "14px",
            }}
          >
            <AlertCircle size={18} />
            {validationError}
          </motion.div>
        )}

        {/* Step content with animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        {currentStep !== 1 && !successData && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px",
              paddingTop: "20px",
              paddingBottom: "60px",
            }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBack}
              disabled={currentStep === 1 || isLoading}
              style={{
                padding: "12px 24px",
                borderRadius: "10px",
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "14px",
                color: "#fbf8f0",
                background: "rgba(0, 194, 242, 0.1)",
                border: "1px solid rgba(0, 194, 242, 0.2)",
                cursor: currentStep === 1 || isLoading ? "not-allowed" : "pointer",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                opacity: currentStep === 1 || isLoading ? 0.5 : 1,
              }}
              onMouseEnter={(e) => {
                if (currentStep > 1 && !isLoading) {
                  const el = e.currentTarget;
                  el.style.background = "rgba(0, 194, 242, 0.15)";
                  el.style.borderColor = "rgba(0, 194, 242, 0.4)";
                }
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.background = "rgba(0, 194, 242, 0.1)";
                el.style.borderColor = "rgba(0, 194, 242, 0.2)";
              }}
            >
              <ChevronLeft size={16} />
              Back
            </motion.button>

            <motion.button
              whileHover={isCurrentStepValid && !isLoading ? { scale: 1.05 } : {}}
              whileTap={isCurrentStepValid && !isLoading ? { scale: 0.95 } : {}}
              onClick={handleNext}
              disabled={!isCurrentStepValid || isLoading}
              style={{
                padding: "12px 24px",
                borderRadius: "10px",
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "14px",
                color: "#001d2e",
                background: isCurrentStepValid && !isLoading ? "#00c2f2" : "rgba(0, 194, 242, 0.3)",
                border: "1px solid transparent",
                cursor: isCurrentStepValid && !isLoading ? "pointer" : "not-allowed",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                opacity: isCurrentStepValid && !isLoading ? 1 : 0.6,
              }}
              onMouseEnter={(e) => {
                if (isCurrentStepValid && !isLoading) {
                  const el = e.currentTarget;
                  el.style.boxShadow = "0 0 30px rgba(0, 194, 242, 0.4)";
                }
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.boxShadow = "none";
              }}
            >
              {isLoading ? (
                <>
                  <Loader size={16} style={{ animation: "spin 1s linear infinite" }} />
                  Processing...
                </>
              ) : (
                <>
                  {currentStep === TOTAL_STEPS ? "Submit" : "Next"}
                  <ChevronRight size={16} />
                </>
              )}
            </motion.button>
          </motion.div>
        )}
      </div>

      <Footer />

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
