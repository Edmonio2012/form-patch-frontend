/*
 * FAQ Page
 * Frequently Asked Questions with back button
 */

import { motion } from "framer-motion";
import { ChevronDown, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import faqData from "@/data/faq.json";
import { getTranslation, getCurrentLanguage } from "@/lib/i18n";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = faqData.faqs;

export default function FAQ() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [, setLocation] = useLocation();

  const handleBack = () => {
    window.history.back();
  };

  return (
    <>
      <Header />
      <main style={{ background: "#001d2e", color: "#fbf8f0", minHeight: "100vh" }}>
        {/* Hero Section */}
        <section
          style={{
            padding: "120px 24px 60px",
            background: "linear-gradient(135deg, #001d2e 0%, #003d5c 100%)",
            borderBottom: "1px solid rgba(0, 194, 242, 0.1)",
          }}
        >
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            {/* Back Button */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={handleBack}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "transparent",
                border: "1px solid rgba(0, 194, 242, 0.3)",
                color: "#00c2f2",
                padding: "10px 20px",
                borderRadius: "6px",
                cursor: "pointer",
                fontFamily: "var(--font-body)",
                fontSize: "14px",
                fontWeight: 600,
                marginBottom: "32px",
                transition: "all 0.3s ease",
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
              {getTranslation(getCurrentLanguage(), 'back')}
            </motion.button>

            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "48px",
                fontWeight: 700,
                marginBottom: "16px",
                color: "#fbf8f0",
              }}
            >
              {getTranslation(getCurrentLanguage(), 'frequently_asked_questions')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "16px",
                color: "rgba(251, 248, 240, 0.7)",
              }}
            >
              {getTranslation(getCurrentLanguage(), 'find_answers')}
            </motion.p>
          </div>
        </section>

        {/* FAQ Content */}
        <section style={{ padding: "60px 24px" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {faqItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  style={{
                    border: "1px solid rgba(0, 194, 242, 0.2)",
                    borderRadius: "12px",
                    overflow: "hidden",
                    background: "rgba(0, 194, 242, 0.02)",
                  }}
                >
                  <button
                    onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                    style={{
                      width: "100%",
                      padding: "20px",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "16px",
                      transition: "background 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(0, 194, 242, 0.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "#fbf8f0",
                        textAlign: "left",
                        margin: 0,
                      }}
                    >
                      {item.question}
                    </h3>
                    <motion.div
                      animate={{ rotate: expandedId === item.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ flexShrink: 0 }}
                    >
                      <ChevronDown size={20} color="#00c2f2" />
                    </motion.div>
                  </button>

                  {expandedId === item.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        borderTop: "1px solid rgba(0, 194, 242, 0.1)",
                        padding: "20px",
                        background: "rgba(0, 194, 242, 0.02)",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "15px",
                          lineHeight: "1.8",
                          color: "rgba(251, 248, 240, 0.8)",
                          margin: 0,
                        }}
                      >
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Contact Section */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{
                marginTop: "60px",
                padding: "40px",
                background: "linear-gradient(135deg, rgba(0, 194, 242, 0.1) 0%, rgba(0, 194, 242, 0.05) 100%)",
                borderRadius: "12px",
                border: "1px solid rgba(0, 194, 242, 0.2)",
                textAlign: "center",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "#fbf8f0",
                  marginBottom: "12px",
                }}
              >
                {getTranslation(getCurrentLanguage(), 'didnt_find_answer')}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "16px",
                  color: "rgba(251, 248, 240, 0.7)",
                  marginBottom: "20px",
                }}
              >
                {getTranslation(getCurrentLanguage(), 'contact_team')}{" "} 
                <a
                  href="mailto:space1.agency@gmail.com"
                  style={{ color: "#00c2f2", textDecoration: "none", fontWeight: 600 }}
                >
                  space1.agency@gmail.com
                </a>
              </p>
              <a
                href="/pricing-calculator"
                style={{
                  display: "inline-block",
                  padding: "12px 32px",
                  background: "#00c2f2",
                  color: "#001d2e",
                  textDecoration: "none",
                  borderRadius: "8px",
                  fontFamily: "var(--font-display)",
                  fontSize: "14px",
                  fontWeight: 700,
                  transition: "opacity 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "0.8";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "1";
                }}
              >
                Get Your Estimate
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
