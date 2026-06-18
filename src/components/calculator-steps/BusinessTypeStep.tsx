/*
 * Step 2: Business Type Selection
 * Design: Clean card grid with clear selection states
 * Psychology: Easy, intuitive, progress-driven
 */

import { motion } from "framer-motion";
import { FormData } from "@/pages/PricingCalculator";
import {
  Globe,
  ShoppingCart,
  Zap,
  Layers,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

interface BusinessTypeStepProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

const businessTypes = [
  {
    id: "business-website",
    label: "Business Website",
    description: "Professional website for your company or service",
    icon: Globe,
  },
  {
    id: "ecommerce",
    label: "E-commerce Store",
    description: "Sell products online with payments and inventory",
    icon: ShoppingCart,
  },
  {
    id: "landing-page",
    label: "Landing Page",
    description: "Single-page site focused on conversions",
    icon: Zap,
  },
  {
    id: "saas",
    label: "Web Application / SaaS",
    description: "Advanced platform with user accounts and features",
    icon: Layers,
  },
  {
    id: "custom",
    label: "Custom Project",
    description: "Something unique or complex",
    icon: Sparkles,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function BusinessTypeStep({
  formData,
  updateFormData,
}: BusinessTypeStepProps) {
  const isSelected = (id: string) => formData.businessType === id;

  return (
    <section
      style={{
        background: "#001d2e",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% -20%, rgba(0, 194, 242, 0.06) 0%, transparent 50%)",
        }}
      />

      <div
        className="relative z-10"
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "80px 24px 20px 24px",
        }}
      >
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            textAlign: "center",
            marginBottom: "60px",
          }}
        >
          <motion.h2
            variants={itemVariants}
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(32px, 5vw, 44px)",
              lineHeight: 1.2,
              color: "#fbf8f0",
              marginBottom: "16px",
              letterSpacing: "-0.02em",
            }}
          >
            What Type of Website Do You Need?
          </motion.h2>

          <motion.p
            variants={itemVariants}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(16px, 2vw, 18px)",
              lineHeight: 1.6,
              color: "rgba(251, 248, 240, 0.7)",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            Select the option that best matches your project. This helps us
            tailor your estimate.
          </motion.p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
            marginBottom: "20px",
          }}
        >
          {businessTypes.map((type) => {
            const Icon = type.icon;
            const selected = isSelected(type.id);

            return (
              <motion.button
                key={type.id}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => updateFormData({ businessType: type.id })}
                style={{
                  padding: "32px 28px",
                  borderRadius: "16px",
                  background: selected
                    ? "linear-gradient(135deg, rgba(0, 194, 242, 0.2) 0%, rgba(0, 194, 242, 0.08) 100%)"
                    : "rgba(0, 71, 111, 0.25)",
                  border: selected
                    ? "2px solid #00c2f2"
                    : "2px solid rgba(0, 194, 242, 0.15)",
                  backdropFilter: "blur(10px)",
                  cursor: "pointer",
                  transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  textAlign: "center",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  if (!selected) {
                    el.style.background =
                      "rgba(0, 71, 111, 0.4)";
                    el.style.borderColor = "rgba(0, 194, 242, 0.3)";
                    el.style.boxShadow =
                      "0 0 30px rgba(0, 194, 242, 0.1)";
                  } else {
                    el.style.boxShadow =
                      "0 0 40px rgba(0, 194, 242, 0.25)";
                  }
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  if (!selected) {
                    el.style.background = "rgba(0, 71, 111, 0.25)";
                    el.style.borderColor = "rgba(0, 194, 242, 0.15)";
                    el.style.boxShadow = "none";
                  } else {
                    el.style.boxShadow =
                      "0 0 30px rgba(0, 194, 242, 0.15)";
                  }
                }}
              >
                {/* Selected indicator */}
                {selected && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    style={{
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                      background: "#00c2f2",
                      borderRadius: "50%",
                      padding: "4px",
                    }}
                  >
                    <CheckCircle2
                      size={20}
                      style={{ color: "#001d2e" }}
                      strokeWidth={3}
                    />
                  </motion.div>
                )}

                {/* Icon */}
                <motion.div
                  animate={{
                    scale: selected ? 1.15 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  style={{
                    marginBottom: "20px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Icon
                    size={40}
                    style={{
                      color: selected ? "#00c2f2" : "rgba(0, 194, 242, 0.5)",
                      transition: "all 0.3s ease",
                    }}
                    strokeWidth={1.5}
                  />
                </motion.div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: "18px",
                    color: "#fbf8f0",
                    marginBottom: "10px",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {type.label}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "14px",
                    lineHeight: 1.5,
                    color: "rgba(251, 248, 240, 0.65)",
                  }}
                >
                  {type.description}
                </p>
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
