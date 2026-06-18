/**
 * Space One — Services Section
 * Design: Premium interactive service cards with outcome focus
 * Typography: Sora (display) + DM Sans (body)
 * Palette: #001d2e base, #00c2f2 accent, soft blues for glow
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useLocation } from "wouter";

interface ServiceCardProps {
  id: string;
  title: string;
  outcome: string;
  features: string[];
  priceRange: string;
}

const services: ServiceCardProps[] = [
  {
    id: "web-development",
    title: "Web Development",
    outcome: "Convert visitors into paying customers",
    features: [
      "React/Next.js architecture",
      "Mobile-first responsive design",
      "Optimized performance (< 2s load)",
      "SEO-ready structure",
      "Scalable backend integration",
    ],
    priceRange: "Estimated: $2,500 – $8,000+",
  },
  {
    id: "ai-systems",
    title: "AI Business Systems",
    outcome: "Automate operations and unlock new revenue",
    features: [
      "Custom AI model integration",
      "Process automation workflows",
      "Real-time data analytics",
      "Predictive insights dashboard",
      "API-first architecture",
    ],
    priceRange: "Estimated: $5,000 – $15,000+",
  },
  {
    id: "ecommerce",
    title: "E-commerce Solutions",
    outcome: "Launch and scale your online store",
    features: [
      "Stripe/payment gateway setup",
      "Inventory management system",
      "Customer analytics dashboard",
      "Multi-currency support",
      "Abandoned cart recovery",
    ],
    priceRange: "Estimated: $3,000 – $10,000+",
  },
  {
    id: "optimization",
    title: "Website Optimization",
    outcome: "Increase conversion rates and user engagement",
    features: [
      "Core Web Vitals optimization",
      "A/B testing framework",
      "User behavior analytics",
      "Performance audits",
      "Conversion funnel analysis",
    ],
    priceRange: "Estimated: $800 – $3,000+",
  },
  {
    id: "custom-platforms",
    title: "Custom Platforms",
    outcome: "Build your unique competitive advantage",
    features: [
      "Full-stack development",
      "Database architecture",
      "Real-time collaboration features",
      "Admin dashboards",
      "Third-party integrations",
    ],
    priceRange: "Estimated: $8,000 – $25,000+",
  },
];

/* ─── Service Card Component ─── */
function ServiceCard({ service }: { service: ServiceCardProps }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
      style={{
        perspective: "1000px",
      }}
    >
      {/* Card container */}
      <div
        className="relative overflow-hidden rounded-2xl p-8 transition-all duration-500"
        style={{
          background: isHovered
            ? "rgba(0, 71, 111, 0.6)"
            : "rgba(0, 71, 111, 0.35)",
          border: isHovered
            ? "1px solid rgba(0, 194, 242, 0.4)"
            : "1px solid rgba(0, 194, 242, 0.15)",
          backdropFilter: "blur(12px)",
          boxShadow: isHovered
            ? "0 0 40px rgba(0, 194, 242, 0.2), inset 0 0 30px rgba(0, 194, 242, 0.05)"
            : "0 0 20px rgba(0, 194, 242, 0.08)",
          transform: isHovered ? "scale(1.04) translateY(-8px)" : "scale(1)",
        }}
      >
        {/* Glow background on hover */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(0, 194, 242, 0.08), transparent 70%)",
              animation: "pulse-glow 3s ease-in-out infinite",
            }}
          />
        )}

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full gap-6">
          {/* Header */}
          <div>
            {/* Service title */}
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "24px",
                color: "#fbf8f0",
                marginBottom: "12px",
                letterSpacing: "-0.02em",
              }}
            >
              {service.title}
            </motion.h3>

            {/* Outcome line */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "15px",
                fontWeight: 500,
                background:
                  "linear-gradient(135deg, #00c2f2 0%, #75dbf4 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                lineHeight: 1.5,
              }}
            >
              {service.outcome}
            </motion.p>
          </div>

          {/* Features list */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-3 flex-1"
          >
            {service.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <Check
                  size={18}
                  style={{
                    color: "#00c2f2",
                    flexShrink: 0,
                    marginTop: "2px",
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "14px",
                    color: "rgba(251, 248, 240, 0.75)",
                    lineHeight: 1.5,
                  }}
                >
                  {feature}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Price range */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="pt-6"
            style={{
              borderTop: "1px solid rgba(0, 194, 242, 0.15)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                fontWeight: 500,
                color: "rgba(251, 248, 240, 0.5)",
                marginBottom: "8px",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Pricing
            </p>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "16px",
                fontWeight: 600,
                color: "#a0e4f5",
              }}
            >
              {service.priceRange}
            </p>
          </motion.div>

          {/* Hidden CTA on hover */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="w-full mt-4 py-3 rounded-lg font-semibold text-sm transition-all"
            style={{
              fontFamily: "var(--font-body)",
              background: "#00c2f2",
              color: "#001d2e",
              border: "1px solid transparent",
              cursor: "pointer",
              boxShadow: "0 4px 16px rgba(0, 194, 242, 0.2)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 0 30px rgba(0, 194, 242, 0.4), 0 0 60px rgba(0, 194, 242, 0.12)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 4px 16px rgba(0, 194, 242, 0.2)";
            }}
          >
            Learn More
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Services Section ─── */
export default function ServicesSection() {
  const [, navigate] = useLocation();
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background: "#001d2e",
        padding: "120px 24px",
      }}
    >
      {/* Background elements */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 20%, rgba(0, 71, 111, 0.3), transparent 70%)",
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
              fontSize: "clamp(36px, 4vw, 56px)",
              color: "#fbf8f0",
              marginBottom: "16px",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            Services Built for{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, #00c2f2 0%, #75dbf4 50%, #a0e4f5 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Growth
            </span>
          </h2>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(15px, 1.5vw, 18px)",
              color: "rgba(251, 248, 240, 0.6)",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            We specialize in high-performance web solutions, AI systems, and
            digital experiences designed to scale your business and drive real
            results.
          </p>
        </motion.div>

        {/* Services grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16"
          style={{
            gridAutoRows: "minmax(500px, auto)",
          }}
        >
          {services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: 0.6,
                delay: idx * 0.08,
                ease: "easeOut",
              }}
              className={
                idx === 2
                  ? "md:col-span-2 lg:col-span-1 lg:row-span-1"
                  : "col-span-1"
              }
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          className="relative rounded-2xl p-12 text-center overflow-hidden"
          style={{
            background: "rgba(0, 71, 111, 0.4)",
            border: "1px solid rgba(0, 194, 242, 0.2)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 0 40px rgba(0, 194, 242, 0.1)",
          }}
        >
          {/* Background glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(0, 194, 242, 0.08), transparent 70%)",
            }}
          />

          {/* Content */}
          <div className="relative z-10">
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(28px, 3vw, 42px)",
                color: "#fbf8f0",
                marginBottom: "12px",
                letterSpacing: "-0.02em",
              }}
            >
              Ready to Transform Your Business?
            </h3>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(15px, 1.5vw, 18px)",
                color: "rgba(251, 248, 240, 0.65)",
                maxWidth: "700px",
                margin: "0 auto 32px",
                lineHeight: 1.7,
              }}
            >
              Answer a few questions and get a precise AI-generated quote in
              minutes. No hidden fees, no surprises.
            </p>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/pricing-calculator")}
              className="group relative overflow-hidden inline-block"
              style={{
                padding: "14px 40px",
                borderRadius: "10px",
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "15px",
                color: "#001d2e",
                background: "#00c2f2",
                border: "1px solid transparent",
                cursor: "pointer",
                boxShadow: "0 4px 24px rgba(0, 194, 242, 0.25)",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow =
                  "0 0 40px rgba(0, 194, 242, 0.5), 0 0 80px rgba(0, 194, 242, 0.2)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow =
                  "0 4px 24px rgba(0, 194, 242, 0.25)";
              }}
            >
              {/* Shimmer effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 2s linear infinite",
                  borderRadius: "10px",
                }}
              />

              <span className="relative z-10 flex items-center gap-2">
                Get Your Exact Website Estimate
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                >
                  <path
                    d="M6 3L11 8L6 13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
