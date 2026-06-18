/*
 * Space One — Final CTA Section
 * Design: Premium centered call-to-action with bold typography
 * Typography: Sora (display) + DM Sans (body)
 * Palette: #001d2e base, #00c2f2 accent, soft blues for glow
 */

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { ArrowRight } from "lucide-react";
import { trackButtonClick, trackBookingClick } from "@/lib/analytics";

export default function FinalCTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [, navigate] = useLocation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        minHeight: "auto",
        padding: "clamp(80px, 10vh, 140px) 24px",
        background: "#001d2e",
      }}
    >
      {/* Background gradient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(0, 194, 242, 0.08) 0%, transparent 65%)",
        }}
      />

      {/* Animated background elements */}
      <div
        className="absolute top-0 left-1/4 w-96 h-96 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0, 194, 242, 0.05) 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: "float-slow 20s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-96 h-96 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(117, 219, 244, 0.03) 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: "float-slow 24s ease-in-out infinite reverse",
        }}
      />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative z-10 mx-auto w-full flex flex-col items-center justify-center"
        style={{
          maxWidth: "900px",
          textAlign: "center",
        }}
      >
        {/* Headline */}
        <motion.h2
          variants={itemVariants}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(32px, 6vw, 56px)",
            lineHeight: 1.15,
            color: "#fbf8f0",
            letterSpacing: "-0.02em",
            marginBottom: "clamp(16px, 2vw, 24px)",
          }}
        >
          Ready to Build a Website That{" "}
          <span style={{ color: "#00c2f2" }}>Actually Works?</span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          variants={itemVariants}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(15px, 2vw, 18px)",
            lineHeight: 1.6,
            color: "rgba(251, 248, 240, 0.7)",
            marginBottom: "clamp(32px, 5vw, 48px)",
            maxWidth: "600px",
          }}
        >
          Get a personalized estimate in minutes and start building a
          high-performance website designed to grow your business.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center mb-8"
        >
          {/* Primary CTA */}
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              trackButtonClick("final_cta_get_estimate");
              navigate("/pricing-calculator");
            }}
            style={{
              padding: "18px 44px",
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
              boxShadow: "0 8px 28px rgba(0, 194, 242, 0.25)",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              minWidth: "280px",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.boxShadow =
                "0 0 40px rgba(0, 194, 242, 0.5), 0 0 80px rgba(0, 194, 242, 0.2)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.boxShadow = "0 8px 28px rgba(0, 194, 242, 0.25)";
            }}
          >
            Get Your Website Estimate
            <ArrowRight
              size={18}
              style={{
                strokeWidth: 2.5,
                transition: "transform 0.3s ease",
              }}
            />
          </motion.button>

          {/* Secondary CTA */}
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              trackBookingClick("final_cta_book_consultation");
              window.open("https://cal.com/edmon-khachatryan/digital-product-clarity-call", "_blank");
            }}
            style={{
              padding: "18px 44px",
              borderRadius: "12px",
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "16px",
              letterSpacing: "-0.01em",
              color: "#fbf8f0",
              background: "transparent",
              border: "1.5px solid rgba(0, 194, 242, 0.35)",
              cursor: "pointer",
              transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              minWidth: "280px",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = "rgba(0, 194, 242, 0.7)";
              el.style.background = "rgba(0, 194, 242, 0.08)";
              el.style.boxShadow =
                "0 0 35px rgba(0, 194, 242, 0.15), inset 0 0 20px rgba(0, 194, 242, 0.05)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = "rgba(0, 194, 242, 0.35)";
              el.style.background = "transparent";
              el.style.boxShadow = "none";
            }}
          >
            Book a Consultation
          </motion.button>
        </motion.div>

        {/* Trust reinforcement */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center items-center"
          style={{
            paddingTop: "clamp(16px, 2vw, 24px)",
            borderTop: "1px solid rgba(0, 194, 242, 0.1)",
          }}
        >
          {[
            "No commitment required",
            "Fast response time",
            "Built for real business results",
          ].map((text, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#00c2f2",
                  boxShadow: "0 0 8px rgba(0, 194, 242, 0.4)",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "13px",
                  color: "rgba(251, 248, 240, 0.6)",
                  letterSpacing: "0.02em",
                }}
              >
                {text}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* CSS animations */}
      <style>{`
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-40px) translateX(0px);
          }
          75% {
            transform: translateY(-20px) translateX(-10px);
          }
        }
      `}</style>
    </section>
  );
}
