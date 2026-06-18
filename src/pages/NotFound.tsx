/*
 * Space One — 404 Not Found Page
 * Design: Premium error state with navigation options
 * Used when: User navigates to non-existent route
 */

import { motion } from "framer-motion";
import { ArrowRight, Home, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import Header from "@/components/Header";

export default function NotFound() {
  const [, navigate] = useLocation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const numberVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6 },
    },
  };

  return (
    <>
      <Header />
      
      {/* Back button - fixed top left below header */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => window.history.back()}
        style={{
          position: "fixed",
          top: "100px",
          left: "24px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          background: "transparent",
          border: "1px solid rgba(0, 194, 242, 0.3)",
          color: "#00c2f2",
          padding: "8px 16px",
          borderRadius: "6px",
          cursor: "pointer",
          fontFamily: "var(--font-body)",
          fontSize: "14px",
          fontWeight: 600,
          transition: "all 0.3s ease",
          zIndex: 50,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(0, 194, 242, 0.1)";
          e.currentTarget.style.borderColor = "#00c2f2";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.borderColor = "rgba(0, 194, 242, 0.3)";
        }}
      >
        <ArrowLeft size={16} />
        Back
      </motion.button>

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #001d2e 0%, #00324a 100%)",
          position: "relative",
          overflow: "hidden",
          marginTop: "80px",
        }}
      >
        {/* Animated background gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 50% 50%, rgba(0, 194, 242, 0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Main content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            textAlign: "center",
            zIndex: 10,
            maxWidth: "550px",
            padding: "24px",
            position: "relative",
          }}
        >
          {/* 404 Number */}
          <motion.div
            variants={numberVariants}
            style={{
              marginBottom: "32px",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(80px, 15vw, 140px)",
                fontWeight: 800,
                background: "linear-gradient(135deg, #00c2f2 0%, rgba(0, 194, 242, 0.5) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                lineHeight: 1,
                letterSpacing: "-0.03em",
              }}
            >
              404
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 6vw, 42px)",
              fontWeight: 700,
              color: "#fbf8f0",
              marginBottom: "16px",
              letterSpacing: "-0.02em",
            }}
          >
            Page Not Found
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={itemVariants}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "16px",
              color: "rgba(251, 248, 240, 0.65)",
              lineHeight: 1.6,
              marginBottom: "48px",
            }}
          >
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </motion.p>

          {/* Action buttons */}
          <motion.div
            variants={itemVariants}
            style={{
              display: "flex",
              gap: "16px",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Get Estimate button */}
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/pricing-calculator")}
              style={{
                width: "100%",
                maxWidth: "300px",
                padding: "14px 32px",
                borderRadius: "10px",
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "15px",
                letterSpacing: "-0.01em",
                color: "#fbf8f0",
                background: "transparent",
                border: "1px solid rgba(0, 194, 242, 0.3)",
                cursor: "pointer",
                transition: "all 0.3s ease",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(0, 194, 242, 0.1)";
                e.currentTarget.style.borderColor = "rgba(0, 194, 242, 0.6)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "rgba(0, 194, 242, 0.3)";
              }}
            >
              <ArrowRight size={16} />
              Get Estimate
            </motion.button>

            {/* Go to Home button */}
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/")}
              style={{
                width: "100%",
                maxWidth: "300px",
                padding: "14px 32px",
                borderRadius: "10px",
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "15px",
                letterSpacing: "-0.01em",
                color: "#001d2e",
                background: "#00c2f2",
                border: "1px solid transparent",
                cursor: "pointer",
                transition: "all 0.3s ease",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                boxShadow: "0 6px 20px rgba(0, 194, 242, 0.2)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 30px rgba(0, 194, 242, 0.4), 0 0 60px rgba(0, 194, 242, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(0, 194, 242, 0.2)";
              }}
            >
              <Home size={16} />
              Go to Home
            </motion.button>
          </motion.div>

          {/* Help text */}
          <motion.p
            variants={itemVariants}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "13px",
              color: "rgba(251, 248, 240, 0.4)",
              marginTop: "40px",
            }}
          >
            Need help? Contact us at{" "}
            <a
              href="mailto:space1.agency@gmail.com"
              style={{
                color: "rgba(0, 194, 242, 0.8)",
                textDecoration: "none",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#00c2f2";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(0, 194, 242, 0.8)";
              }}
            >
              space1.agency@gmail.com
            </a>
          </motion.p>
        </motion.div>
      </div>
    </>
  );
}
