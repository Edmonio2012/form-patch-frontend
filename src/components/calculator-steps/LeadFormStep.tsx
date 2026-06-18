/*
 * Step 6: Lead Form Submission
 */

import { motion } from "framer-motion";
import { FormData } from "@/pages/PricingCalculator";
import { CheckCircle2 } from "lucide-react";

interface LeadFormStepProps {
  formData: FormData & { subscribeToPromotions?: boolean; agreeToTerms?: boolean };
  updateFormData: (updates: Partial<FormData>) => void;
}

export default function LeadFormStep({
  formData,
  updateFormData,
}: LeadFormStepProps) {
  const handleInputChange = (field: string, value: string) => {
    updateFormData({ [field]: value } as Partial<FormData>);
  };

  const isFormValid = formData.name && formData.email && (formData as any).agreeToTerms;

  // Handle checkbox change properly
  const handleCheckboxChange = (checked: boolean) => {
    updateFormData({ subscribeToPromotions: checked } as Partial<FormData>);
  };

  // Handle terms agreement checkbox
  const handleTermsChange = (checked: boolean) => {
    updateFormData({ agreeToTerms: checked } as Partial<FormData>);
  };

  return (
    <section
      style={{
        background: "#001d2e",
        padding: "60px 24px 20px 24px",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "36px",
            color: "#fbf8f0",
            marginBottom: "16px",
            textAlign: "center",
          }}
        >
          Get Your Quote
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "16px",
            color: "rgba(251, 248, 240, 0.7)",
            marginBottom: "40px",
            textAlign: "center",
          }}
        >
          Share your contact info and we'll send you a detailed quote
        </motion.p>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            display: "grid",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          {/* Name */}
          <div>
            <label
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "14px",
                color: "#fbf8f0",
                display: "block",
                marginBottom: "8px",
              }}
            >
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="John Doe"
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "8px",
                fontFamily: "var(--font-body)",
                fontSize: "14px",
                color: "#fbf8f0",
                background: "rgba(0, 71, 111, 0.3)",
                border: "1px solid rgba(0, 194, 242, 0.2)",
                outline: "none",
                transition: "all 0.3s ease",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "rgba(0, 194, 242, 0.5)";
                e.currentTarget.style.background = "rgba(0, 71, 111, 0.4)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(0, 194, 242, 0.2)";
                e.currentTarget.style.background = "rgba(0, 71, 111, 0.3)";
              }}
            />
          </div>

          {/* Email */}
          <div>
            <label
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "14px",
                color: "#fbf8f0",
                display: "block",
                marginBottom: "8px",
              }}
            >
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="john@example.com"
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "8px",
                fontFamily: "var(--font-body)",
                fontSize: "14px",
                color: "#fbf8f0",
                background: "rgba(0, 71, 111, 0.3)",
                border: "1px solid rgba(0, 194, 242, 0.2)",
                outline: "none",
                transition: "all 0.3s ease",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "rgba(0, 194, 242, 0.5)";
                e.currentTarget.style.background = "rgba(0, 71, 111, 0.4)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(0, 194, 242, 0.2)";
                e.currentTarget.style.background = "rgba(0, 71, 111, 0.3)";
              }}
            />
          </div>



          {/* Promotions Opt-in */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 16px",
              background: "rgba(0, 194, 242, 0.05)",
              borderRadius: "8px",
              border: "1px solid rgba(0, 194, 242, 0.15)",
            }}
          >
            <input
              type="checkbox"
              id="subscribe-promotions"
              checked={formData.subscribeToPromotions || false}
              onChange={(e) => handleCheckboxChange(e.target.checked)}
              style={{
                width: "18px",
                height: "18px",
                cursor: "pointer",
                accentColor: "#00c2f2",
              }}
            />
            <label
              htmlFor="subscribe-promotions"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "14px",
                color: "rgba(251, 248, 240, 0.8)",
                cursor: "pointer",
                margin: 0,
              }}
            >
              Subscribe to our promotions and special offers
            </label>
          </div>

          {/* Terms Agreement (Required) */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "12px",
              padding: "12px 16px",
              background: "rgba(251, 248, 240, 0.02)",
              borderRadius: "8px",
              border: "1px solid rgba(251, 248, 240, 0.1)",
            }}
          >
            <input
              type="checkbox"
              id="agree-terms"
              checked={(formData as any).agreeToTerms || false}
              onChange={(e) => handleTermsChange(e.target.checked)}
              style={{
                width: "18px",
                height: "18px",
                cursor: "pointer",
                accentColor: "#00c2f2",
                marginTop: "2px",
                flexShrink: 0,
              }}
            />
            <label
              htmlFor="agree-terms"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "14px",
                color: "rgba(251, 248, 240, 0.8)",
                cursor: "pointer",
                margin: 0,
                lineHeight: "1.5",
              }}
            >
              I agree to the{" "}
              <a
                href="/terms"
                style={{
                  color: "#00c2f2",
                  textDecoration: "none",
                  fontWeight: 600,
                  transition: "opacity 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Terms of Use
              </a>
              {" "}
              and{" "}
              <a
                href="/privacy"
                style={{
                  color: "#00c2f2",
                  textDecoration: "none",
                  fontWeight: 600,
                  transition: "opacity 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Privacy Policy
              </a>
              <span style={{ color: "#ff6b6b" }}>*</span>
            </label>
          </div>
        </motion.form>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            display: "grid",
            gap: "12px",
            marginBottom: "40px",
            padding: "24px",
            background: "rgba(0, 71, 111, 0.2)",
            borderRadius: "12px",
          }}
        >
          {[
            "Personalized quote within 24 hours",
            "No hidden fees or surprise charges",
            "Direct contact with our team",
          ].map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + idx * 0.1 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <CheckCircle2
                size={18}
                style={{ color: "#00c2f2", flexShrink: 0 }}
              />
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "14px",
                  color: "rgba(251, 248, 240, 0.8)",
                }}
              >
                {benefit}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Submit note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "12px",
            color: "rgba(251, 248, 240, 0.5)",
            textAlign: "center",
          }}
        >
          <span style={{ color: "#ff6b6b" }}>*</span> Required fields
        </motion.p>
      </div>
    </section>
  );
}
