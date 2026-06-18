/*
 * Privacy Policy Page
 * Professional legal page with dummy content
 */

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
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
              onClick={() => window.history.back()}
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
              Back
            </motion.button>

            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "48px",
                fontWeight: 700,
                marginBottom: "16px",
                color: "#fbf8f0",
              }}
            >
              Privacy Policy
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "16px",
                color: "rgba(251, 248, 240, 0.7)",
              }}
            >
              Last updated: April 25, 2026
            </motion.p>
          </div>
        </section>

        {/* Content Section */}
        <section style={{ padding: "60px 24px" }}>
          <div
            style={{
              maxWidth: "900px",
              margin: "0 auto",
              fontFamily: "var(--font-body)",
              fontSize: "16px",
              lineHeight: "1.8",
              color: "rgba(251, 248, 240, 0.9)",
            }}
          >
            {/* Section 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ marginBottom: "40px" }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "28px",
                  fontWeight: 700,
                  color: "#fbf8f0",
                  marginBottom: "16px",
                  borderBottom: "2px solid rgba(0, 194, 242, 0.3)",
                  paddingBottom: "12px",
                }}
              >
                1. Introduction
              </h2>
              <p>
                Space One ("Company," "we," "us," "our," or "Provider") operates the website. We are committed to protecting your privacy and ensuring you have a positive experience on our website and when using our services.
              </p>
              <p>
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
              </p>
            </motion.div>

            {/* Section 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{ marginBottom: "40px" }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "28px",
                  fontWeight: 700,
                  color: "#fbf8f0",
                  marginBottom: "16px",
                  borderBottom: "2px solid rgba(0, 194, 242, 0.3)",
                  paddingBottom: "12px",
                }}
              >
                2. Information We Collect
              </h2>
              <p>
                We may collect information about you in a variety of ways. The information we may collect on the site includes:
              </p>
              <ul style={{ marginLeft: "24px", marginTop: "12px" }}>
                <li>
                  <strong>Personal Data:</strong> Name, email address, phone number, company name, and other information you voluntarily provide when submitting forms or requesting our services.
                </li>
                <li>
                  <strong>Usage Data:</strong> Information about how you interact with our website, including pages visited, time spent, and links clicked.
                </li>
                <li>
                  <strong>Device Information:</strong> Browser type, operating system, IP address, and other technical information.
                </li>
                <li>
                  <strong>Cookies:</strong> We use cookies to enhance your experience and analyze website usage.
                </li>
              </ul>
            </motion.div>

            {/* Section 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{ marginBottom: "40px" }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "28px",
                  fontWeight: 700,
                  color: "#fbf8f0",
                  marginBottom: "16px",
                  borderBottom: "2px solid rgba(0, 194, 242, 0.3)",
                  paddingBottom: "12px",
                }}
              >
                3. Use of Your Information
              </h2>
              <p>
                Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the site to:
              </p>
              <ul style={{ marginLeft: "24px", marginTop: "12px" }}>
                <li>Process your requests and provide you with our services</li>
                <li>Send you marketing and promotional communications (with your consent)</li>
                <li>Improve our website and services</li>
                <li>Respond to your inquiries and customer service requests</li>
                <li>Monitor and analyze trends, usage, and activities</li>
                <li>Comply with legal obligations</li>
              </ul>
            </motion.div>

            {/* Section 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{ marginBottom: "40px" }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "28px",
                  fontWeight: 700,
                  color: "#fbf8f0",
                  marginBottom: "16px",
                  borderBottom: "2px solid rgba(0, 194, 242, 0.3)",
                  paddingBottom: "12px",
                }}
              >
                4. Disclosure of Your Information
              </h2>
              <p>
                We may share your information with third parties in the following circumstances:
              </p>
              <ul style={{ marginLeft: "24px", marginTop: "12px" }}>
                <li>With service providers who assist us in operating our website and conducting our business</li>
                <li>When required by law or to protect our legal rights</li>
                <li>With your consent or at your direction</li>
                <li>In connection with a merger, acquisition, or sale of assets</li>
              </ul>
            </motion.div>

            {/* Section 5 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              style={{ marginBottom: "40px" }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "28px",
                  fontWeight: 700,
                  color: "#fbf8f0",
                  marginBottom: "16px",
                  borderBottom: "2px solid rgba(0, 194, 242, 0.3)",
                  paddingBottom: "12px",
                }}
              >
                5. Security of Your Information
              </h2>
              <p>
                We use administrative, technical, and physical security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is completely secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
              </p>
            </motion.div>

            {/* Section 6 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              style={{ marginBottom: "40px" }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "28px",
                  fontWeight: 700,
                  color: "#fbf8f0",
                  marginBottom: "16px",
                  borderBottom: "2px solid rgba(0, 194, 242, 0.3)",
                  paddingBottom: "12px",
                }}
              >
                6. Contact Preferences
              </h2>
              <p>
                If at any time you would like to unsubscribe from receiving future emails, we include detailed unsubscribe instructions at the bottom of each email. You may also contact us at{" "}
                <a
                  href="mailto:space1.agency@gmail.com"
                  style={{ color: "#00c2f2", textDecoration: "none", fontWeight: 600 }}
                >
                  space1.agency@gmail.com
                </a>{" "}
                to manage your preferences.
              </p>
            </motion.div>

            {/* Section 7 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              style={{ marginBottom: "40px" }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "28px",
                  fontWeight: 700,
                  color: "#fbf8f0",
                  marginBottom: "16px",
                  borderBottom: "2px solid rgba(0, 194, 242, 0.3)",
                  paddingBottom: "12px",
                }}
              >
                7. Your Rights
              </h2>
              <p>
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul style={{ marginLeft: "24px", marginTop: "12px" }}>
                <li>The right to access your personal information</li>
                <li>The right to correct inaccurate data</li>
                <li>The right to request deletion of your data</li>
                <li>The right to opt-out of marketing communications</li>
                <li>The right to data portability</li>
              </ul>
            </motion.div>

            {/* Section 8 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              style={{ marginBottom: "60px" }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "28px",
                  fontWeight: 700,
                  color: "#fbf8f0",
                  marginBottom: "16px",
                  borderBottom: "2px solid rgba(0, 194, 242, 0.3)",
                  paddingBottom: "12px",
                }}
              >
                8. Changes to This Privacy Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </motion.div>

            {/* Contact Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              style={{
                padding: "24px",
                background: "rgba(0, 194, 242, 0.05)",
                borderRadius: "12px",
                border: "1px solid rgba(0, 194, 242, 0.2)",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "#fbf8f0",
                  marginBottom: "12px",
                }}
              >
                Contact Us
              </h3>
              <p>
                If you have questions about this Privacy Policy or our privacy practices, please contact us at{" "}
                <a
                  href="mailto:space1.agency@gmail.com"
                  style={{ color: "#00c2f2", textDecoration: "none", fontWeight: 600 }}
                >
                  space1.agency@gmail.com
                </a>
              </p>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
