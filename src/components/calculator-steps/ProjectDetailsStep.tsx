/*
 * Step 3: Project Details
 * Design: Clean form with smooth interactions and real-time validation
 * Psychology: Fast, simple, guided experience
 */

import { motion } from "framer-motion";
import { useState } from "react";
import { FormData } from "@/pages/PricingCalculator";
import { Sparkles, Zap, Layers, Palette } from "lucide-react";

interface ProjectDetailsStepProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

const pageOptions = [
  { label: "1 page", value: "1" },
  { label: "2–5 pages", value: "2-5" },
  { label: "5–10 pages", value: "5-10" },
  { label: "10+ pages", value: "10+" },
];

const timelineOptions = [
  { label: "ASAP (Rush)", value: "asap", icon: Zap },
  { label: "2–4 weeks", value: "2-4weeks", icon: Sparkles },
  { label: "1–2 months", value: "1-2months", icon: Layers },
  { label: "Flexible", value: "flexible", icon: Palette },
];

const designStyles = [
  {
    id: "minimal",
    label: "Minimal & Clean",
    description: "Simple, elegant, distraction-free",
  },
  {
    id: "modern",
    label: "Modern & Bold",
    description: "Contemporary, vibrant, eye-catching",
  },
  {
    id: "luxury",
    label: "Luxury & Premium",
    description: "Sophisticated, high-end, exclusive",
  },
  {
    id: "ai",
    label: "Not Sure (AI Decides)",
    description: "Let us recommend based on your goals",
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

export default function ProjectDetailsStep({
  formData,
  updateFormData,
}: ProjectDetailsStepProps) {
  const [focusedField, setFocusedField] = useState<string | null>(null);

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
          maxWidth: "900px",
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
            marginBottom: "30px",
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
            Tell Us About Your Project
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
            These details help us generate a more accurate estimate tailored to
            your needs.
          </motion.p>
        </motion.div>

        {/* Form sections */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
          }}
        >
          {/* Project Goal */}
          <motion.div variants={itemVariants}>
            <label
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "16px",
                color: "#fbf8f0",
                display: "block",
                marginBottom: "12px",
                letterSpacing: "-0.01em",
              }}
            >
              What is the main goal of your website?
            </label>
            <textarea
              placeholder="e.g., get more leads, sell products online, showcase my business..."
              value={formData.goal || ""}
              onChange={(e) => updateFormData({ goal: e.target.value })}
              onFocus={() => setFocusedField("goal")}
              onBlur={() => setFocusedField(null)}
              style={{
                width: "100%",
                padding: "16px 20px",
                borderRadius: "12px",
                fontFamily: "var(--font-body)",
                fontSize: "16px",
                lineHeight: 1.5,
                color: "#fbf8f0",
                background:
                  focusedField === "goal"
                    ? "rgba(0, 194, 242, 0.15)"
                    : "rgba(0, 71, 111, 0.25)",
                border:
                  focusedField === "goal"
                    ? "2px solid #00c2f2"
                    : "2px solid rgba(0, 194, 242, 0.15)",
                backdropFilter: "blur(10px)",
                resize: "vertical",
                minHeight: "100px",
                transition: "all 0.3s ease",
                outline: "none",
              }}
            />
          </motion.div>

          {/* Pages Count */}
          <motion.div variants={itemVariants}>
            <label
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "16px",
                color: "#fbf8f0",
                display: "block",
                marginBottom: "16px",
                letterSpacing: "-0.01em",
              }}
            >
              How many pages do you need?
            </label>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                gap: "12px",
              }}
            >
              {pageOptions.map((option) => (
                <motion.button
                  key={option.value}
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => updateFormData({ pages: option.value })}
                  style={{
                    padding: "16px 20px",
                    borderRadius: "12px",
                    fontFamily: "var(--font-body)",
                    fontSize: "15px",
                    fontWeight: 500,
                    color:
                      formData.pages === option.value
                        ? "#001d2e"
                        : "#fbf8f0",
                    background:
                      formData.pages === option.value
                        ? "#00c2f2"
                        : "rgba(0, 71, 111, 0.25)",
                    border:
                      formData.pages === option.value
                        ? "2px solid #00c2f2"
                        : "2px solid rgba(0, 194, 242, 0.15)",
                    backdropFilter: "blur(10px)",
                    cursor: "pointer",
                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  {option.label}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div variants={itemVariants}>
            <label
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "16px",
                color: "#fbf8f0",
                display: "block",
                marginBottom: "16px",
                letterSpacing: "-0.01em",
              }}
            >
              When do you need it ready?
            </label>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                gap: "12px",
              }}
            >
              {timelineOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <motion.button
                    key={option.value}
                    whileHover={{ y: -4, scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => updateFormData({ timeline: option.value })}
                    style={{
                      padding: "16px 20px",
                      borderRadius: "12px",
                      fontFamily: "var(--font-body)",
                      fontSize: "15px",
                      fontWeight: 500,
                      color:
                        formData.timeline === option.value
                          ? "#001d2e"
                          : "#fbf8f0",
                      background:
                        formData.timeline === option.value
                          ? "#00c2f2"
                          : "rgba(0, 71, 111, 0.25)",
                      border:
                        formData.timeline === option.value
                          ? "2px solid #00c2f2"
                          : "2px solid rgba(0, 194, 242, 0.15)",
                      backdropFilter: "blur(10px)",
                      cursor: "pointer",
                      transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                    }}
                  >
                    <Icon size={18} />
                    {option.label}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Design Style */}
          <motion.div variants={itemVariants}>
            <label
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "16px",
                color: "#fbf8f0",
                display: "block",
                marginBottom: "16px",
                letterSpacing: "-0.01em",
              }}
            >
              What design style appeals to you?
            </label>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "16px",
              }}
            >
              {designStyles.map((style) => (
                <motion.button
                  key={style.id}
                  whileHover={{ y: -6, scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => updateFormData({ designStyle: style.id })}
                  style={{
                    padding: "20px 24px",
                    borderRadius: "12px",
                    textAlign: "left",
                    fontFamily: "var(--font-body)",
                    background:
                      formData.designStyle === style.id
                        ? "linear-gradient(135deg, rgba(0, 194, 242, 0.2) 0%, rgba(0, 194, 242, 0.08) 100%)"
                        : "rgba(0, 71, 111, 0.25)",
                    border:
                      formData.designStyle === style.id
                        ? "2px solid #00c2f2"
                        : "2px solid rgba(0, 194, 242, 0.15)",
                    backdropFilter: "blur(10px)",
                    cursor: "pointer",
                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: "15px",
                      color: "#fbf8f0",
                      marginBottom: "6px",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {style.label}
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      color: "rgba(251, 248, 240, 0.65)",
                      lineHeight: 1.4,
                    }}
                  >
                    {style.description}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
