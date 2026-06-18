/*
 * Step 5: Estimate Display (Production-Grade)
 * NO PRICING EXPOSED - Display only summary of selections
 * Pricing is calculated server-side only
 */

import { motion } from "framer-motion";
import { FormData } from "@/pages/PricingCalculator";
import { CheckCircle2 } from "lucide-react";

interface EstimateStepProps {
  formData: FormData;
}

export default function EstimateStep({ formData }: EstimateStepProps) {
  // Get feature titles for display - Maps UUIDs to feature names
  const FEATURES_MAP: Record<string, string> = {
    // CORE WEBSITE
    "db872964-9f58-4d62-915c-2d90dca428a8": "Responsive Design",
    "95f0f7b5-5924-4b50-9643-1b460fac0697": "Dark Mode",
    "f2d77d96-a334-4c43-a206-fba133c5088c": "Animations & Microinteractions",
    "88e867ed-aac6-44ad-8481-306ed217c336": "Design System",
    "95e6cdf8-7328-48d5-a826-d00c2d351eb3": "Custom UI Design",
    // STRUCTURE & CONTENT
    "3968655e-bd4f-48b6-bfde-8d45f8fc6057": "Multi-page Structure (up to 5 pages)",
    "2de74e29-9295-442f-a336-3c9c0b5d22a4": "Advanced Page Structures (10+ pages)",
    "dd2bdbc9-d4c8-4e72-b6ee-5c12c6dc7b71": "Media Gallery",
    "d586d4d8-359e-431c-8297-0dad46e11f79": "Blog System",
    "c7e3b261-9d87-4e20-a763-a6d396fe4abe": "CMS System",
    // MARKETING & CONVERSION
    "1620fc9b-a56a-4e25-a0e4-7af4428e9688": "SEO Optimization",
    "4f8faafa-438d-40ba-b3d8-0b32cdbb2919": "Analytics Integration",
    "d1092461-c1c7-4f57-8c80-8c67d64f44e9": "Conversion Optimization",
    "fe50bc50-e12d-4dc8-8194-baaa23b10955": "Lead Forms / Email Capture",
    "0413e107-bbc5-4b55-a1b0-f176578eef92": "Social Media Integration",
    // E-COMMERCE
    "8c5d54d0-cf0d-4369-8dcd-77fb75e05546": "Product Listings",
    "512bd98d-ffd7-4552-a4f0-30add9773025": "Shopping Cart",
    "f36b9843-49d7-4a7c-aef8-06b743944822": "Payment Integration",
    "b5c0a9d1-bdcd-496b-a7c6-9996db19e11b": "Inventory System (Advanced)",
    "d94c441d-7153-4399-8761-8329ac5c5a28": "Order Dashboard",
    // USER SYSTEMS
    "810218b8-c96d-41a9-b976-3cc3e2271c13": "User Authentication",
    "fbbfec2e-1216-48b3-8d2f-c007bae51729": "User Profiles",
    "560759f9-3ceb-46f7-969f-c53be3223376": "Role & Permission System",
    "ea55587a-6db8-4e5b-b213-5eaf42475ab0": "Dashboard UI",
    // ADVANCED SYSTEMS
    "caa3b511-7001-4c0e-9ebb-3ca92b88d76e": "API Integration",
    "aeb0fd07-8001-4344-9fb4-7ed61f5c9134": "AI Integration",
    "9bb28f34-3bd2-4520-97c1-2da5bba43c48": "Real-time Features",
    "cf349003-6c5c-414d-b181-cc1cd0fd7a0a": "File Upload System",
    "5a91143b-a816-4094-8b21-b3c0547f8cae": "Global Search",
    // COMMUNICATION
    "0e6ec3f1-6668-4b0f-b7e7-d5859bd1c8a2": "Real-time Chat",
    "46f19b9d-5c5d-477a-8ec5-2a465c8d2752": "Media Sharing",
    // BUSINESS CORE
    "b688d725-2e9e-41be-955b-10079b221b0a": "Admin Panel",
    "6375bb28-80b3-4b49-b48d-b8381fb33c0c": "Advanced Admin Controls",
    "b215fb3d-f6f5-4643-8a27-c41a5d4496e1": "Subscription System",
    "aafccb67-d7a8-4de2-851b-662912f51427": "Billing Logic",
    "0e3848e7-def8-47a2-8e94-8506f615b7ee": "Notification System",
    "6234d8a4-0d76-45f8-9437-c70e73a39fca": "Security Enhancements",
    "c4fd8de8-6044-4f2f-be82-34089079e6e4": "Performance Optimization",
    // EXTENSIONS
    "3c169129-4bf1-45ce-89a9-9f369dc49bf7": "Third-party Integrations",
    "0a6af717-cf58-4b23-88fa-3739a738b911": "API Access for Clients",
    "0cfac1de-250b-4bc5-a617-e7921d914422": "Workflow Automation",
    "2e25173d-2bb6-403b-b1f8-a387282c8c91": "White-label System",
    "b94eee30-b774-48e1-aacc-5fa7945fde87": "Custom Feature Development",
    // POLISH & STABILITY
    "116070d3-b145-4c5b-b415-9a0b95cb97a4": "Maintenance Setup",
    "6d7c7622-0e48-4787-b3e0-a79ea89eec89": "Deployment Setup",
    "6e1beec8-5eef-40f5-9fa1-e0d2f5b0e2c2": "Backup & Recovery",
    "93b493a8-123b-4262-94e0-b64317102601": "Monitoring System",
    "65fecdea-d4b4-4a86-aa8c-9d80a42135e1": "Accessibility Optimization",
    "b224d1bf-a454-4def-80fd-b12bc3423a59": "Mobile Optimization",
    "eb5908e4-fbab-475c-8586-76ff192e5098": "Cross-browser Optimization",
    "abb9dede-bc08-42cb-9b30-f0a026b5dea8": "Documentation & Training",
  };

  const selectedFeatureNames = formData.features.map(
    (id) => FEATURES_MAP[id] || id
  );

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "0 auto",
        padding: "0 24px 20px 24px",
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: "48px", textAlign: "center" }}
      >
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "32px",
            color: "#fbf8f0",
            marginBottom: "16px",
          }}
        >
          Your Project Summary
        </h2>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "16px",
            color: "rgba(251, 248, 240, 0.7)",
          }}
        >
          Review your selections before submitting your inquiry
        </p>
      </motion.div>

      {/* Summary cards */}
      <div style={{ display: "grid", gap: "20px", marginBottom: "40px" }}>
        {/* Business Type */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            padding: "20px",
            borderRadius: "12px",
            background: "rgba(0, 194, 242, 0.08)",
            border: "1px solid rgba(0, 194, 242, 0.2)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
            <CheckCircle2 size={18} color="#00c2f2" />
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "12px",
                color: "rgba(0, 194, 242, 0.7)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Business Type
            </span>
          </div>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "18px",
              fontWeight: 600,
              color: "#fbf8f0",
              marginLeft: "30px",
            }}
          >
            {formData.businessType.charAt(0).toUpperCase() + formData.businessType.slice(1)}
          </p>
        </motion.div>

        {/* Project Details */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          style={{
            padding: "20px",
            borderRadius: "12px",
            background: "rgba(0, 194, 242, 0.08)",
            border: "1px solid rgba(0, 194, 242, 0.2)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
            <CheckCircle2 size={18} color="#00c2f2" />
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "12px",
                color: "rgba(0, 194, 242, 0.7)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Project Details
            </span>
          </div>
          <div style={{ marginLeft: "30px", display: "grid", gap: "8px" }}>
            <div>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "12px",
                  color: "rgba(251, 248, 240, 0.5)",
                }}
              >
                Pages:
              </span>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#fbf8f0",
                  marginTop: "2px",
                }}
              >
                {formData.pages}
              </p>
            </div>
            <div>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "12px",
                  color: "rgba(251, 248, 240, 0.5)",
                }}
              >
                Timeline:
              </span>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#fbf8f0",
                  marginTop: "2px",
                }}
              >
                {formData.timeline}
              </p>
            </div>
            <div>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "12px",
                  color: "rgba(251, 248, 240, 0.5)",
                }}
              >
                Design Style:
              </span>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#fbf8f0",
                  marginTop: "2px",
                }}
              >
                {formData.designStyle}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Selected Features */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            padding: "20px",
            borderRadius: "12px",
            background: "rgba(0, 194, 242, 0.08)",
            border: "1px solid rgba(0, 194, 242, 0.2)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
            <CheckCircle2 size={18} color="#00c2f2" />
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "12px",
                color: "rgba(0, 194, 242, 0.7)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Selected Features ({selectedFeatureNames.length})
            </span>
          </div>
          <div
            style={{
              marginLeft: "30px",
              display: "grid",
              gap: "8px",
              maxHeight: "200px",
              overflowY: "auto",
            }}
          >
            {selectedFeatureNames.map((feature, index) => (
              <div
                key={index}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "13px",
                  color: "#fbf8f0",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span
                  style={{
                    width: "4px",
                    height: "4px",
                    background: "#00c2f2",
                    borderRadius: "50%",
                  }}
                />
                {feature}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Message */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        style={{
          padding: "20px",
          borderRadius: "12px",
          background: "rgba(117, 219, 244, 0.05)",
          border: "1px solid rgba(117, 219, 244, 0.2)",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "14px",
            color: "rgba(251, 248, 240, 0.7)",
            lineHeight: 1.6,
          }}
        >
          Your personalized estimate will be calculated and sent to your email after you submit your inquiry. Our team will review your project details and provide a detailed quote within 24 hours.
        </p>
      </motion.div>
    </div>
  );
}
