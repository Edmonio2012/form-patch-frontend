/*
 * Space One — Footer
 * Design: Premium 4-column grid with brand, navigation, services, and contact
 * Typography: Sora (display) + DM Sans (body)
 * Palette: #001d2e base, #00476f secondary, #00c2f2 accent
 */

import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { useLocation } from "wouter";

export default function Footer() {
  const [, navigate] = useLocation();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/" },
    { label: "Pricing Calculator", href: "/pricing-calculator" },
    { label: "Insights", href: "/" },
    { label: "Contact", href: "/contact" },
  ];

  const serviceItems = [
    { label: "Web Development", href: "/" },
    { label: "AI Business Systems", href: "/" },
    { label: "E-commerce Solutions", href: "/" },
    { label: "Website Optimization", href: "/" },
  ];

  return (
    <footer
      style={{
        background: "#001d2e",
        borderTop: "1px solid rgba(0, 194, 242, 0.1)",
        position: "relative",
      }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(0, 194, 242, 0.05) 0%, transparent 60%)",
        }}
      />

      {/* Main content */}
      <div
        className="relative z-10"
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "clamp(60px, 8vw, 100px) clamp(24px, 4vw, 48px)",
        }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12"
        >
          {/* Column 1: Brand */}
          <motion.div variants={itemVariants}>
            <div
              style={{
                marginBottom: "16px",
              }}
            >
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663462662922/HAmgmopXRYcOgpIo.png"
                alt="Space One"
                style={{
                  height: "auto",
                  width: "100%",
                  maxWidth: "180px",
                  objectFit: "contain",
                }}
              />
            </div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "14px",
                lineHeight: 1.6,
                color: "rgba(251, 248, 240, 0.65)",
                marginBottom: "16px",
              }}
            >
              We build high-performance websites and digital systems designed to
              grow your business.
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "12px",
                color: "rgba(0, 194, 242, 0.6)",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              Where digital begins
            </p>
          </motion.div>

          {/* Column 2: Navigation */}
          <motion.div variants={itemVariants}>
            <h4
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "14px",
                color: "#fbf8f0",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "20px",
              }}
            >
              Navigation
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {navItems.map((item, idx) => (
                <li key={idx} style={{ marginBottom: "12px" }}>
                  <button
                    onClick={() => navigate(item.href)}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "14px",
                      color: "rgba(251, 248, 240, 0.7)",
                      textDecoration: "none",
                      transition: "all 0.3s ease",
                      display: "inline-block",
                      position: "relative",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget;
                      el.style.color = "#00c2f2";
                      el.style.paddingLeft = "8px";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget;
                      el.style.color = "rgba(251, 248, 240, 0.7)";
                      el.style.paddingLeft = "0";
                    }}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Services */}
          <motion.div variants={itemVariants}>
            <h4
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "14px",
                color: "#fbf8f0",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "20px",
              }}
            >
              Services
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {serviceItems.map((item, idx) => (
                <li key={idx} style={{ marginBottom: "12px" }}>
                  <button
                    onClick={() => navigate(item.href)}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "14px",
                      color: "rgba(251, 248, 240, 0.7)",
                      textDecoration: "none",
                      transition: "all 0.3s ease",
                      display: "inline-block",
                      position: "relative",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget;
                      el.style.color = "#00c2f2";
                      el.style.paddingLeft = "8px";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget;
                      el.style.color = "rgba(251, 248, 240, 0.7)";
                      el.style.paddingLeft = "0";
                    }}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Contact & CTA */}
          <motion.div variants={itemVariants}>
            <h4
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "14px",
                color: "#fbf8f0",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "20px",
              }}
            >
              Get Started
            </h4>

            {/* Contact info */}
            <div style={{ marginBottom: "24px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "12px",
                }}
              >
                <Mail size={16} style={{ color: "#00c2f2" }} />
                <a
                  href="mailto:space1.agency@gmail.com"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "14px",
                    color: "rgba(251, 248, 240, 0.7)",
                    textDecoration: "none",
                    transition: "color 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#00c2f2";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(251, 248, 240, 0.7)";
                  }}
                >
                  space1.agency@gmail.com
                </a>
              </div>

            </div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/pricing-calculator")}
              style={{
                width: "100%",
                padding: "14px 24px",
                borderRadius: "10px",
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "14px",
                letterSpacing: "-0.01em",
                color: "#001d2e",
                background: "#00c2f2",
                border: "1px solid transparent",
                cursor: "pointer",
                transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                boxShadow: "0 6px 20px rgba(0, 194, 242, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.boxShadow =
                  "0 0 30px rgba(0, 194, 242, 0.4), 0 0 60px rgba(0, 194, 242, 0.15)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.boxShadow = "0 6px 20px rgba(0, 194, 242, 0.2)";
              }}
            >
              Get Estimate
              <ArrowRight size={14} strokeWidth={2.5} />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(0, 194, 242, 0.2), transparent)",
            margin: "48px 0",
          }}
        />

        {/* Bottom row */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "13px",
              color: "rgba(251, 248, 240, 0.5)",
            }}
          >
            © 2026 Space One. All rights reserved.
          </p>

          <div
            style={{
              display: "flex",
              gap: "32px",
              alignItems: "center",
            }}
          >
            <a
              href="/privacy"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                color: "rgba(251, 248, 240, 0.5)",
                textDecoration: "none",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#00c2f2";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(251, 248, 240, 0.5)";
              }}
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                color: "rgba(251, 248, 240, 0.5)",
                textDecoration: "none",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#00c2f2";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(251, 248, 240, 0.5)";
              }}
            >
              Terms of Service
            </a>
            <a
              href="/faq"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                color: "rgba(251, 248, 240, 0.5)",
                textDecoration: "none",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#00c2f2";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(251, 248, 240, 0.5)";
              }}
            >
              FAQ
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
