/*
 * Space One — Server Unavailable Page
 * Design: Premium error state with animated loader
 * Used when: API unreachable, deployment in progress, network error
 */

import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { useState } from "react";

export default function ServerUnavailable() {
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = () => {
    setIsRetrying(true);
    // Reload the page after a brief delay
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const loaderVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "linear" as const,
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.15,
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

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #001d2e 0%, #00324a 100%)",
        position: "relative",
        overflow: "hidden",
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
          maxWidth: "500px",
          padding: "24px",
        }}
      >
        {/* Animated loader */}
        <motion.div
          variants={itemVariants}
          style={{
            marginBottom: "40px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <motion.div
            variants={loaderVariants}
            animate="animate"
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              border: "2px solid rgba(0, 194, 242, 0.2)",
              borderTopColor: "#00c2f2",
              borderRightColor: "#00c2f2",
            }}
          />
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
          We're Preparing Your Experience
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={itemVariants}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "16px",
            color: "rgba(251, 248, 240, 0.65)",
            lineHeight: 1.6,
            marginBottom: "40px",
          }}
        >
          Our servers are currently starting or updating. Please try again in a few moments.
        </motion.p>

        {/* Status indicator */}
        <motion.div
          variants={itemVariants}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 16px",
            borderRadius: "8px",
            background: "rgba(0, 194, 242, 0.08)",
            border: "1px solid rgba(0, 194, 242, 0.15)",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#00c2f2",
              animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "13px",
              color: "rgba(0, 194, 242, 0.8)",
            }}
          >
            Connecting...
          </span>
        </motion.div>

        {/* Retry button */}
        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleRetry}
          disabled={isRetrying}
          style={{
            padding: "14px 32px",
            borderRadius: "10px",
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "15px",
            letterSpacing: "-0.01em",
            color: "#001d2e",
            background: isRetrying ? "rgba(0, 194, 242, 0.6)" : "#00c2f2",
            border: "1px solid transparent",
            cursor: isRetrying ? "not-allowed" : "pointer",
            transition: "all 0.3s ease",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            opacity: isRetrying ? 0.7 : 1,
          }}
        >
          <RefreshCw
            size={16}
            style={{
              animation: isRetrying ? "spin 1s linear infinite" : undefined,
            }}
          />
          {isRetrying ? "Retrying..." : "Try Again"}
        </motion.button>

        {/* Help text */}
        <motion.p
          variants={itemVariants}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "13px",
            color: "rgba(251, 248, 240, 0.4)",
            marginTop: "24px",
          }}
        >
          Auto-retrying in 10 seconds...
        </motion.p>
      </motion.div>

      {/* CSS animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
