/*
 * Terms of Use Page
 * Professional legal page with dummy content
 */

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsOfUse() {
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
              Terms of Use
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
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
              <p>
                Space One ("Company," "we," "us," or "our") operates the website. These Terms of Use constitute a legally binding agreement between you and Space One regarding your use of the website and services.
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
                2. Use License
              </h2>
              <p>
                Permission is granted to temporarily download one copy of the materials (information or software) on Space One's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul style={{ marginLeft: "24px", marginTop: "12px" }}>
                <li>Modifying or copying the materials</li>
                <li>Using the materials for any commercial purpose or for any public display</li>
                <li>Attempting to decompile or reverse engineer any software contained on the website</li>
                <li>Removing any copyright or other proprietary notations from the materials</li>
                <li>Transferring the materials to another person or "mirroring" the materials on any other server</li>
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
                3. Disclaimer
              </h2>
              <p>
                The materials on Space One's website are provided on an 'as is' basis. Space One makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
              <p>
                Further, Space One does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
              </p>
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
                4. Limitations
              </h2>
              <p>
                In no event shall Space One or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Space One's website, even if Space One or an authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>
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
                5. Accuracy of Materials
              </h2>
              <p>
                The materials appearing on Space One's website could include technical, typographical, or photographic errors. Space One does not warrant that any of the materials on its website are accurate, complete, or current. Space One may make changes to the materials contained on its website at any time without notice.
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
                6. Links
              </h2>
              <p>
                Space One has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Space One of the site. Use of any such linked website is at the user's own risk.
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
                7. Modifications
              </h2>
              <p>
                Space One may revise these terms of use for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of use.
              </p>
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
                8. Governing Law
              </h2>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which Space One operates, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
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
                Questions?
              </h3>
              <p>
                If you have any questions about these Terms of Use, please contact us at{" "}
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
