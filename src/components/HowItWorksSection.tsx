/**
 * Space One — How It Works Section
 * Design: Clean 4-step timeline with interactive cards
 * Typography: Sora (display) + DM Sans (body)
 * Palette: #001d2e base, #00c2f2 accent, soft blues for glow
 * Psychology: Simplicity, structure, zero risk
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Zap, Hammer, Rocket } from "lucide-react";
import { useLocation } from "wouter";

interface ProcessStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  details: string[];
}

const processSteps: ProcessStep[] = [
  {
    id: 1,
    title: "Tell Us Your Idea",
    description: "Answer simple questions about your business and goals",
    icon: <MessageSquare size={32} />,
    details: ["Business type", "Target audience", "Key features needed"],
  },
  {
    id: 2,
    title: "Get AI Estimate",
    description: "Receive a precise price range based on your requirements",
    icon: <Zap size={32} />,
    details: ["Feature analysis", "Complexity assessment", "Timeline estimate"],
  },
  {
    id: 3,
    title: "We Build Your Website",
    description: "High-performance design and development with modern stack",
    icon: <Hammer size={32} />,
    details: ["React/Next.js", "Performance optimized", "SEO-ready"],
  },
  {
    id: 4,
    title: "Launch & Grow",
    description: "Deploy, optimize, and scale your digital presence",
    icon: <Rocket size={32} />,
    details: ["Live deployment", "Performance tuning", "Growth support"],
  },
];

/* ─── Step Card ─── */
function StepCard({
  step,
  isHovered,
  onHover,
  index,
}: {
  step: ProcessStep;
  isHovered: boolean;
  onHover: (hovered: boolean) => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      className="relative group"
    >
      {/* Card background */}
      <div
        className="rounded-xl p-8 transition-all duration-500 h-full"
        style={{
          background: isHovered
            ? "rgba(0, 71, 111, 0.5)"
            : "rgba(0, 71, 111, 0.25)",
          border: isHovered
            ? "1px solid rgba(0, 194, 242, 0.4)"
            : "1px solid rgba(0, 194, 242, 0.12)",
          backdropFilter: "blur(12px)",
          boxShadow: isHovered
            ? "0 0 30px rgba(0, 194, 242, 0.2), inset 0 0 20px rgba(0, 194, 242, 0.04)"
            : "0 0 15px rgba(0, 194, 242, 0.05)",
          transform: isHovered ? "translateY(-12px)" : "translateY(0)",
        }}
      >
        {/* Step number badge */}
        <motion.div
          initial={{ opacity: 0.6 }}
          animate={isHovered ? { opacity: 1 } : { opacity: 0.6 }}
          transition={{ duration: 0.3 }}
          className="inline-flex items-center justify-center mb-6"
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "12px",
            background: isHovered
              ? "rgba(0, 194, 242, 0.2)"
              : "rgba(0, 194, 242, 0.08)",
            border: "1px solid rgba(0, 194, 242, 0.3)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "24px",
              background:
                "linear-gradient(135deg, #00c2f2 0%, #75dbf4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {step.id}
          </span>
        </motion.div>

        {/* Icon */}
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={isHovered ? { opacity: 1 } : { opacity: 0.5 }}
          transition={{ duration: 0.3 }}
          style={{
            color: "#00c2f2",
            marginBottom: "20px",
          }}
        >
          {step.icon}
        </motion.div>

        {/* Title */}
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "20px",
            color: "#fbf8f0",
            marginBottom: "12px",
            letterSpacing: "-0.01em",
            lineHeight: 1.2,
          }}
        >
          {step.title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "14px",
            color: "rgba(251, 248, 240, 0.6)",
            lineHeight: 1.6,
            marginBottom: "20px",
          }}
        >
          {step.description}
        </p>

        {/* Details list - show on hover */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={
            isHovered
              ? { opacity: 1, height: "auto" }
              : { opacity: 0, height: 0 }
          }
          transition={{ duration: 0.3 }}
          style={{
            overflow: "hidden",
            paddingTop: isHovered ? "16px" : "0",
            borderTop: isHovered
              ? "1px solid rgba(0, 194, 242, 0.15)"
              : "none",
          }}
        >
          <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {step.details.map((detail, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0 }}
                transition={{ delay: idx * 0.05 }}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "13px",
                  color: "rgba(0, 194, 242, 0.7)",
                  marginBottom: idx < step.details.length - 1 ? "8px" : "0",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    background: "#00c2f2",
                  }}
                />
                {detail}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ─── Progress Line ─── */
function ProgressLine({ activeStep }: { activeStep: number }) {
  return (
    <div
      className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 transform -translate-y-1/2 -z-10"
      style={{
        background: "rgba(0, 194, 242, 0.1)",
      }}
    >
      <motion.div
        initial={{ width: "0%" }}
        animate={{
          width: `${((activeStep - 1) / 3) * 100 + 25}%`,
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          height: "100%",
          background: "linear-gradient(90deg, #00c2f2 0%, #75dbf4 100%)",
          boxShadow: "0 0 20px rgba(0, 194, 242, 0.4)",
        }}
      />
    </div>
  );
}

/* ─── Main How It Works Section ─── */
export default function HowItWorksSection() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [, navigate] = useLocation();

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background: "#001d2e",
        padding: "100px 24px",
      }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 100% 50% at 50% 20%, rgba(0, 71, 111, 0.15), transparent 70%)",
        }}
      />

      {/* Content container */}
      <div
        className="relative z-10 mx-auto"
        style={{
          maxWidth: "1320px",
        }}
      >
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-20 text-center"
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(32px, 3.5vw, 48px)",
              color: "#fbf8f0",
              marginBottom: "12px",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            How It Works
          </h2>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(14px, 1.2vw, 16px)",
              color: "rgba(251, 248, 240, 0.6)",
              maxWidth: "500px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            A simple, structured process designed to remove uncertainty and
            deliver results. From idea to launch in 4 straightforward steps.
          </p>
        </motion.div>

        {/* ─── Steps Grid ─── */}
        <div className="relative">
          {/* Progress line (desktop only) */}
          <ProgressLine activeStep={hoveredStep || 1} />

          {/* Steps grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, idx) => (
              <StepCard
                key={step.id}
                step={step}
                isHovered={hoveredStep === step.id}
                onHover={(hovered) =>
                  setHoveredStep(hovered ? step.id : null)
                }
                index={idx}
              />
            ))}
          </div>
        </div>

        {/* ─── CTA Section ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="mt-20 text-center"
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "15px",
              color: "rgba(251, 248, 240, 0.7)",
              marginBottom: "16px",
              lineHeight: 1.6,
            }}
          >
            Ready to start? Get your personalized estimate in minutes.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/pricing-calculator")}
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: "15px",
              padding: "14px 32px",
              borderRadius: "8px",
              border: "none",
              background: "linear-gradient(135deg, #00c2f2 0%, #75dbf4 100%)",
              color: "#001d2e",
              cursor: "pointer",
              boxShadow: "0 0 20px rgba(0, 194, 242, 0.3)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              const target = e.currentTarget as HTMLButtonElement;
              target.style.boxShadow =
                "0 0 40px rgba(0, 194, 242, 0.6), 0 0 20px rgba(117, 219, 244, 0.3)";
            }}
            onMouseLeave={(e) => {
              const target = e.currentTarget as HTMLButtonElement;
              target.style.boxShadow = "0 0 20px rgba(0, 194, 242, 0.3)";
            }}
          >
            Get Your Website Estimate
          </motion.button>
        </motion.div>

        {/* ─── Trust line ─── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "12px",
            color: "rgba(251, 248, 240, 0.4)",
            textAlign: "center",
            marginTop: "16px",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          No credit card required • Free estimate • Takes 2 minutes
        </motion.p>
      </div>
    </section>
  );
}
