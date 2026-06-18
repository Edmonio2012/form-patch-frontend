/**
 * Space One — Success Confirmation Component
 * Design: Premium success state with request ID, next steps, and CTAs
 * Used after: Pricing calculator form submission
 */

import { motion } from "framer-motion";
import { CheckCircle, Mail, Calendar, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";
import { trackBookingClick, trackButtonClick } from "@/lib/analytics";

interface SuccessConfirmationProps {
  requestId: string;
  email?: string;
  message?: string;
}

export default function SuccessConfirmation({
  requestId,
  email,
  message,
}: SuccessConfirmationProps) {
  const [, navigate] = useLocation();

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

  const nextSteps = [
    {
      icon: Mail,
      title: "Confirmation Email",
      description: "We'll send details to your email within 24 hours",
    },
    {
      icon: Calendar,
      title: "Schedule a Call",
      description: "Book a consultation to discuss your project",
    },
    {
      icon: ArrowRight,
      title: "Project Kickoff",
      description: "We'll start working on your custom solution",
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        maxWidth: "700px",
        margin: "0 auto",
        padding: "40px 24px",
        textAlign: "center",
      }}
    >
      {/* Success Icon */}
      <motion.div
        variants={itemVariants}
        style={{
          marginBottom: "32px",
        }}
      >
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: "rgba(0, 194, 242, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto",
            border: "2px solid rgba(0, 194, 242, 0.3)",
          }}
        >
          <CheckCircle width={48} height={48} color="#00c2f2" />
        </div>
      </motion.div>

      {/* Main Title */}
      <motion.h1
        variants={itemVariants}
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(28px, 5vw, 40px)",
          fontWeight: 700,
          color: "#fbf8f0",
          marginBottom: "16px",
          letterSpacing: "-0.01em",
        }}
      >
        Request Submitted Successfully!
      </motion.h1>

      {/* Description */}
      <motion.p
        variants={itemVariants}
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "16px",
          color: "rgba(251, 248, 240, 0.7)",
          marginBottom: "32px",
          lineHeight: 1.6,
          maxWidth: "500px",
          margin: "0 auto 32px",
        }}
      >
        {message ||
          "Thank you for your interest! We've received your project details and will review them carefully."}
      </motion.p>

      {/* Request ID Card */}
      <motion.div
        variants={itemVariants}
        style={{
          background: "rgba(0, 194, 242, 0.08)",
          border: "1.5px solid rgba(0, 194, 242, 0.3)",
          borderRadius: "12px",
          padding: "24px",
          marginBottom: "40px",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "13px",
            color: "rgba(251, 248, 240, 0.5)",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            marginBottom: "8px",
          }}
        >
          Your Request ID
        </p>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "24px",
            fontWeight: 600,
            color: "#00c2f2",
            wordBreak: "break-all",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {requestId}
        </p>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "12px",
            color: "rgba(251, 248, 240, 0.4)",
            marginTop: "8px",
          }}
        >
          Save this ID for your records
        </p>
      </motion.div>

      {/* Next Steps */}
      <motion.div
        variants={itemVariants}
        style={{
          marginBottom: "40px",
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "18px",
            fontWeight: 600,
            color: "#fbf8f0",
            marginBottom: "24px",
          }}
        >
          What Happens Next
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
          }}
        >
          {nextSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                whileHover={{ y: -4 }}
                style={{
                  background: "rgba(0, 194, 242, 0.04)",
                  border: "1px solid rgba(0, 194, 242, 0.15)",
                  borderRadius: "10px",
                  padding: "20px",
                  textAlign: "center",
                }}
              >
                <Icon
                  width={32}
                  height={32}
                  color="rgba(0, 194, 242, 0.6)"
                  style={{ margin: "0 auto 12px" }}
                />
                <h4
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#fbf8f0",
                    marginBottom: "6px",
                  }}
                >
                  {step.title}
                </h4>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "12px",
                    color: "rgba(251, 248, 240, 0.5)",
                    lineHeight: 1.5,
                  }}
                >
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Contact Info */}
      {email && (
        <motion.p
          variants={itemVariants}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "14px",
            color: "rgba(251, 248, 240, 0.6)",
            marginBottom: "32px",
          }}
        >
          Confirmation sent to <span style={{ color: "#00c2f2" }}>{email}</span>
        </motion.p>
      )}

      {/* CTAs */}
      <motion.div
        variants={itemVariants}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          maxWidth: "400px",
          margin: "0 auto",
        }}
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            trackBookingClick("success_page_schedule_call");
            window.open("https://cal.com/edmon-khachatryan/digital-product-clarity-call", "_blank");
          }}
          style={{
            padding: "14px 28px",
            borderRadius: "8px",
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "14px",
            color: "#001d2e",
            background: "#00c2f2",
            border: "none",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "#00d9ff";
            el.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "#00c2f2";
            el.style.transform = "translateY(0)";
          }}
        >
          Schedule a Call
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            trackButtonClick("success_page_back_home");
            navigate("/");
          }}
          style={{
            padding: "14px 28px",
            borderRadius: "8px",
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "14px",
            color: "#fbf8f0",
            background: "transparent",
            border: "1.5px solid rgba(0, 194, 242, 0.3)",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = "rgba(0, 194, 242, 0.6)";
            el.style.background = "rgba(0, 194, 242, 0.08)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = "rgba(0, 194, 242, 0.3)";
            el.style.background = "transparent";
          }}
        >
          Back to Home
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
