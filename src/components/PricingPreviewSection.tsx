/*
 * Space One — Pricing Calculator Preview Section
 * Design: Premium glassmorphism with interactive mock calculator
 * Typography: Sora (display) + DM Sans (body)
 * Palette: #001d2e base, #00476f surfaces, #00c2f2 accent, soft blues for glow
 */

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useLocation } from "wouter";

export default function PricingPreviewSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [, navigate] = useLocation();
  const [selectedFeatures, setSelectedFeatures] = useState<number[]>([0, 2]);
  const [estimatedPrice, setEstimatedPrice] = useState("$2,500");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  /* Simulate price calculation based on selected features */
  useEffect(() => {
    const basePrice = 2500;
    const pricePerFeature = 800;
    const totalPrice = basePrice + selectedFeatures.length * pricePerFeature;
    setEstimatedPrice(`$${totalPrice.toLocaleString()}`);
  }, [selectedFeatures]);

  const toggleFeature = (index: number) => {
    setSelectedFeatures((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const features = [
    { label: "Mobile Responsive" },
    { label: "SEO Optimized" },
    { label: "Payment Integration" },
    { label: "Analytics Dashboard" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        minHeight: "auto",
        padding: "clamp(60px, 8vh, 100px) 24px",
        background: "#001d2e",
      }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(0, 194, 242, 0.05) 0%, transparent 70%)",
        }}
      />

      {/* Content container */}
      <div
        className="relative z-10 mx-auto w-full"
        style={{
          maxWidth: "1320px",
        }}
      >
        {/* Main grid */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 items-center"
          style={{
            gap: "clamp(32px, 6vw, 80px)",
          }}
        >
          {/* LEFT: Value + CTA */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col gap-6"
          >
            {/* Headline */}
            <motion.h2
              variants={itemVariants}
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(28px, 5vw, 48px)",
                lineHeight: 1.2,
                color: "#fbf8f0",
                letterSpacing: "-0.02em",
              }}
            >
              Get Your Website Price in{" "}
              <span style={{ color: "#00c2f2" }}>Minutes</span>
            </motion.h2>

            {/* Subtext */}
            <motion.p
              variants={itemVariants}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(15px, 2vw, 16px)",
                lineHeight: 1.6,
                color: "rgba(251, 248, 240, 0.7)",
              }}
            >
              Answer a few simple questions and get a personalized estimate
              powered by our intelligent pricing system.
            </motion.p>

            {/* Benefits */}
            <motion.div variants={itemVariants} className="flex flex-col gap-3">
              {[
                "No commitment required",
                "AI-powered accurate estimates",
                "Takes less than 5 minutes",
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      background: "rgba(0, 194, 242, 0.15)",
                      border: "1px solid rgba(0, 194, 242, 0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Check
                      size={12}
                      style={{ color: "#00c2f2", strokeWidth: 3 }}
                    />
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "14px",
                      color: "#fbf8f0",
                    }}
                  >
                    {benefit}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 pt-4"
            >
              <button
                onClick={() => navigate("/pricing-calculator")}
                style={{
                  padding: "16px 34px",
                  borderRadius: "12px",
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "15px",
                  letterSpacing: "-0.01em",
                  color: "#001d2e",
                  background: "#00c2f2",
                  border: "1px solid transparent",
                  cursor: "pointer",
                  transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  boxShadow: "0 4px 20px rgba(0, 194, 242, 0.2)",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.boxShadow =
                    "0 0 35px rgba(0, 194, 242, 0.45), 0 0 70px rgba(0, 194, 242, 0.15)";
                  el.style.transform = "scale(1.04)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.boxShadow = "0 4px 20px rgba(0, 194, 242, 0.2)";
                  el.style.transform = "scale(1)";
                }}
              >
                Start Price Calculation
              </button>

              <button
                onClick={() => navigate("/pricing-calculator")}
                style={{
                  padding: "16px 34px",
                  borderRadius: "12px",
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "15px",
                  letterSpacing: "-0.01em",
                  color: "#fbf8f0",
                  background: "transparent",
                  border: "1px solid rgba(0, 194, 242, 0.3)",
                  cursor: "pointer",
                  transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "rgba(0, 194, 242, 0.6)";
                  el.style.boxShadow =
                    "0 0 30px rgba(0, 194, 242, 0.12), inset 0 0 20px rgba(0, 194, 242, 0.04)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "rgba(0, 194, 242, 0.3)";
                  el.style.boxShadow = "none";
                }}
              >
                See How It Works
              </button>
            </motion.div>
          </motion.div>

          {/* RIGHT: Calculator Preview */}
          <motion.div
            variants={itemVariants}
            className="relative"
            style={{
              perspective: "1000px",
            }}
          >
            {/* Background glow behind preview */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(0, 194, 242, 0.1) 0%, transparent 60%)",
                borderRadius: "20px",
                filter: "blur(40px)",
                transform: "scale(1.1)",
              }}
            />

            {/* Calculator card */}
            <div
              className="relative"
              style={{
                background: "rgba(0, 71, 111, 0.25)",
                border: "1px solid rgba(0, 194, 242, 0.15)",
                borderRadius: "20px",
                backdropFilter: "blur(20px)",
                padding: "clamp(24px, 4vw, 40px)",
                boxShadow:
                  "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(0, 194, 242, 0.1)",
              }}
            >
              {/* Header */}
              <div className="mb-6">
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: "14px",
                    color: "#00c2f2",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginBottom: "8px",
                  }}
                >
                  Quick Estimate
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "20px",
                    color: "#fbf8f0",
                  }}
                >
                  Select Features
                </div>
              </div>

              {/* Feature checkboxes */}
              <div className="space-y-3 mb-8">
                {features.map((feature, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => toggleFeature(idx)}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "12px 14px",
                      borderRadius: "10px",
                      background: selectedFeatures.includes(idx)
                        ? "rgba(0, 194, 242, 0.1)"
                        : "rgba(0, 194, 242, 0.03)",
                      border: selectedFeatures.includes(idx)
                        ? "1px solid rgba(0, 194, 242, 0.3)"
                        : "1px solid rgba(0, 194, 242, 0.1)",
                      cursor: "pointer",
                      transition:
                        "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                      textAlign: "left",
                    }}
                  >
                    {/* Checkbox */}
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "6px",
                        background: selectedFeatures.includes(idx)
                          ? "#00c2f2"
                          : "transparent",
                        border: selectedFeatures.includes(idx)
                          ? "1px solid #00c2f2"
                          : "1px solid rgba(0, 194, 242, 0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        transition: "all 0.3s ease",
                      }}
                    >
                      {selectedFeatures.includes(idx) && (
                        <Check
                          size={14}
                          style={{
                            color: "#001d2e",
                            strokeWidth: 3,
                          }}
                        />
                      )}
                    </div>

                    {/* Label */}
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "14px",
                        color: "#fbf8f0",
                        fontWeight: 500,
                      }}
                    >
                      {feature.label}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Divider */}
              <div
                style={{
                  height: "1px",
                  background:
                    "linear-gradient(90deg, transparent, rgba(0, 194, 242, 0.2), transparent)",
                  marginBottom: "20px",
                }}
              />

              {/* Price display */}
              <div
                style={{
                  padding: "16px",
                  borderRadius: "12px",
                  background: "rgba(0, 194, 242, 0.08)",
                  border: "1px solid rgba(0, 194, 242, 0.2)",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "12px",
                    color: "rgba(251, 248, 240, 0.6)",
                    marginBottom: "6px",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Estimated Price
                </div>
                <motion.div
                  key={estimatedPrice}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "28px",
                    color: "#00c2f2",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {estimatedPrice}
                </motion.div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "11px",
                    color: "rgba(251, 248, 240, 0.5)",
                    marginTop: "6px",
                  }}
                >
                  Complexity may adjust final price
                </div>
              </div>

              {/* Progress indicator */}
              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  gap: "6px",
                }}
              >
                {[0, 1, 2].map((step) => (
                  <div
                    key={step}
                    style={{
                      flex: 1,
                      height: "3px",
                      borderRadius: "2px",
                      background:
                        step < Math.ceil(selectedFeatures.length / 2)
                          ? "#00c2f2"
                          : "rgba(0, 194, 242, 0.15)",
                      transition: "all 0.4s ease",
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
