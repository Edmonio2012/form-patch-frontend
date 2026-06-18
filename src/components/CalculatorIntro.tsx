/*
 * Space One — Pricing Calculator Intro
 * Design: Centered, focused layout with strong hierarchy
 * Typography: Sora (display) + DM Sans (body)
 * Palette: #001d2e base, #00c2f2 accent
 */

import { motion, easeOut } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";

interface CalculatorIntroProps {
  onStart?: () => void;
}

export default function CalculatorIntro({ onStart }: CalculatorIntroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeOut,
      },
    },
  };

  const benefits = [
    "Takes less than 5 minutes",
    "No commitment required",
    "Accurate, AI-powered estimate",
  ];

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
            "radial-gradient(circle at 50% -20%, rgba(0, 194, 242, 0.08) 0%, transparent 50%)",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 120%, rgba(0, 71, 111, 0.06) 0%, transparent 50%)",
        }}
      />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto w-full flex flex-col items-center justify-center"
        style={{
          maxWidth: "900px",
          padding: "clamp(80px, 12vw, 140px) clamp(24px, 4vw, 48px)",
          textAlign: "center",
        }}
      >
        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(32px, 6vw, 56px)",
            lineHeight: 1.2,
            color: "#fbf8f0",
            marginBottom: "24px",
            letterSpacing: "-0.02em",
          }}
        >
          Get Your Website Price in{" "}
          <span style={{ color: "#00c2f2" }}>Minutes</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={itemVariants}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(16px, 2.5vw, 18px)",
            lineHeight: 1.6,
            color: "rgba(251, 248, 240, 0.75)",
            marginBottom: "48px",
            maxWidth: "700px",
          }}
        >
          Answer a few quick questions about your project and get a personalized
          estimate powered by our intelligent pricing system.
        </motion.p>

        {/* Benefits */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mb-12"
        >
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="flex items-center gap-3"
            >
              <CheckCircle2
                size={20}
                style={{ color: "#00c2f2", flexShrink: 0 }}
                strokeWidth={2}
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

        {/* Primary CTA */}
        <motion.div variants={itemVariants} className="mb-8">
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={onStart}
            style={{
              padding: "16px 40px",
              borderRadius: "12px",
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "16px",
              letterSpacing: "-0.01em",
              color: "#001d2e",
              background: "#00c2f2",
              border: "1px solid transparent",
              cursor: "pointer",
              transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              boxShadow: "0 8px 24px rgba(0, 194, 242, 0.25)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.boxShadow =
                "0 0 40px rgba(0, 194, 242, 0.5), 0 0 80px rgba(0, 194, 242, 0.2)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.boxShadow = "0 8px 24px rgba(0, 194, 242, 0.25)";
            }}
          >
            Start Calculation
            <ArrowRight size={16} strokeWidth={2.5} />
          </motion.button>
        </motion.div>

        {/* Trust line */}
        <motion.p
          variants={itemVariants}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "13px",
            color: "rgba(0, 194, 242, 0.6)",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          No spam. No pressure. Just clarity.
        </motion.p>
      </motion.div>
    </section>
  );
}
