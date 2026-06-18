/**
 * Space One — Trust & Social Proof Section
 * Design: Premium credibility builder with metrics, logos, testimonials
 * Typography: Sora (display) + DM Sans (body)
 * Palette: #001d2e base, #00c2f2 accent, soft blues for glow
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { Award, Zap, Rocket, Shield, TrendingUp } from "lucide-react";

interface TrustMetric {
  id: string;
  icon: React.ReactNode;
  value: string;
  label: string;
}

interface ClientLogo {
  id: string;
  name: string;
  placeholder: string;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  outcome: string;
}

const trustMetrics: TrustMetric[] = [
  {
    id: "websites",
    icon: <Rocket size={28} />,
    value: "50+",
    label: "Websites Delivered",
  },
  {
    id: "performance",
    icon: <Zap size={28} />,
    value: "98%",
    label: "Average Performance Score",
  },
  {
    id: "delivery",
    icon: <Award size={28} />,
    value: "7 Days",
    label: "Average Delivery Time",
  },
  {
    id: "uptime",
    icon: <Shield size={28} />,
    value: "99.9%",
    label: "Uptime Guarantee",
  },
  {
    id: "growth",
    icon: <TrendingUp size={28} />,
    value: "240%",
    label: "Avg Client Growth",
  },
];

const clientLogos: ClientLogo[] = [
  { id: "1", name: "TechVenture", placeholder: "TV" },
  { id: "2", name: "GrowthLabs", placeholder: "GL" },
  { id: "3", name: "DigitalFlow", placeholder: "DF" },
  { id: "4", name: "CloudScale", placeholder: "CS" },
  { id: "5", name: "InnovateCo", placeholder: "IC" },
  { id: "6", name: "FutureStack", placeholder: "FS" },
  { id: "7", name: "DataDrive", placeholder: "DD" },
  { id: "8", name: "VelocityAI", placeholder: "VA" },
];

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Chen",
    role: "Founder",
    company: "TechVenture",
    quote:
      "We needed a website that could handle scale. Space One delivered exactly that—fast, clean, and it started bringing leads immediately.",
    outcome: "3x traffic increase in first month",
  },
  {
    id: "2",
    name: "Marcus Rodriguez",
    role: "CEO",
    company: "GrowthLabs",
    quote:
      "The process was transparent and efficient. They understood our business and built something that actually converts.",
    outcome: "$50K in new revenue from website",
  },
  {
    id: "3",
    name: "Emma Thompson",
    role: "Product Lead",
    company: "DigitalFlow",
    quote:
      "Professional team, clear communication, and the final product exceeded expectations. Highly recommend.",
    outcome: "Launched in 5 days, zero downtime",
  },
];

/* ─── Trust Metric Card ─── */
function MetricCard({ metric }: { metric: TrustMetric }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      <div
        className="rounded-xl p-6 transition-all duration-500"
        style={{
          background: isHovered
            ? "rgba(0, 71, 111, 0.5)"
            : "rgba(0, 71, 111, 0.3)",
          border: isHovered
            ? "1px solid rgba(0, 194, 242, 0.3)"
            : "1px solid rgba(0, 194, 242, 0.12)",
          backdropFilter: "blur(12px)",
          boxShadow: isHovered
            ? "0 0 30px rgba(0, 194, 242, 0.15), inset 0 0 20px rgba(0, 194, 242, 0.03)"
            : "0 0 15px rgba(0, 194, 242, 0.05)",
          transform: isHovered ? "translateY(-6px)" : "translateY(0)",
        }}
      >
        {/* Icon */}
        <motion.div
          initial={{ opacity: 0.6 }}
          animate={isHovered ? { opacity: 1 } : { opacity: 0.6 }}
          transition={{ duration: 0.3 }}
          style={{
            color: "#00c2f2",
            marginBottom: "16px",
          }}
        >
          {metric.icon}
        </motion.div>

        {/* Value */}
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "32px",
            color: "#fbf8f0",
            marginBottom: "8px",
            letterSpacing: "-0.02em",
          }}
        >
          {metric.value}
        </motion.h3>

        {/* Label */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "14px",
            color: "rgba(251, 248, 240, 0.6)",
            lineHeight: 1.5,
          }}
        >
          {metric.label}
        </p>
      </div>
    </motion.div>
  );
}

/* ─── Client Logo ─── */
function ClientLogoItem({ logo }: { logo: ClientLogo }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex-shrink-0"
    >
      <div
        className="rounded-lg flex items-center justify-center transition-all duration-300"
        style={{
          width: "120px",
          height: "120px",
          background: "rgba(0, 71, 111, 0.4)",
          border: "1px solid rgba(0, 194, 242, 0.15)",
          backdropFilter: "blur(8px)",
          opacity: isHovered ? 1 : 0.6,
          boxShadow: isHovered
            ? "0 0 20px rgba(0, 194, 242, 0.2)"
            : "0 0 10px rgba(0, 194, 242, 0.05)",
          transform: isHovered ? "scale(1.05)" : "scale(1)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "18px",
            background:
              "linear-gradient(135deg, #00c2f2 0%, #75dbf4 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {logo.placeholder}
        </span>
      </div>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "12px",
          color: "rgba(251, 248, 240, 0.5)",
          marginTop: "8px",
          textAlign: "center",
        }}
      >
        {logo.name}
      </p>
    </motion.div>
  );
}

/* ─── Testimonial Card ─── */
function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
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
    >
      <div
        className="rounded-xl p-8 transition-all duration-500"
        style={{
          background: isHovered
            ? "rgba(0, 71, 111, 0.5)"
            : "rgba(0, 71, 111, 0.3)",
          border: isHovered
            ? "1px solid rgba(0, 194, 242, 0.3)"
            : "1px solid rgba(0, 194, 242, 0.12)",
          backdropFilter: "blur(12px)",
          boxShadow: isHovered
            ? "0 0 30px rgba(0, 194, 242, 0.15), inset 0 0 20px rgba(0, 194, 242, 0.03)"
            : "0 0 15px rgba(0, 194, 242, 0.05)",
          transform: isHovered ? "translateY(-8px)" : "translateY(0)",
        }}
      >
        {/* Quote mark */}
        <div
          style={{
            fontSize: "48px",
            color: "rgba(0, 194, 242, 0.2)",
            marginBottom: "12px",
            lineHeight: 1,
          }}
        >
          "
        </div>

        {/* Quote */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "16px",
            color: "#fbf8f0",
            lineHeight: 1.8,
            marginBottom: "20px",
            fontStyle: "italic",
          }}
        >
          {testimonial.quote}
        </p>

        {/* Outcome highlight */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isHovered ? { opacity: 1 } : { opacity: 0.6 }}
          transition={{ duration: 0.3 }}
          className="mb-6 pb-6"
          style={{
            borderBottom: "1px solid rgba(0, 194, 242, 0.15)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "14px",
              fontWeight: 600,
              background:
                "linear-gradient(135deg, #00c2f2 0%, #75dbf4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            ✓ {testimonial.outcome}
          </p>
        </motion.div>

        {/* Author */}
        <div>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "15px",
              color: "#fbf8f0",
              marginBottom: "4px",
            }}
          >
            {testimonial.name}
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "13px",
              color: "rgba(251, 248, 240, 0.5)",
            }}
          >
            {testimonial.role} at {testimonial.company}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Trust Section ─── */
export default function TrustSection() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background: "#001d2e",
        padding: "100px 24px",
      }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 100% 50% at 50% 80%, rgba(0, 71, 111, 0.2), transparent 70%)",
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
          className="mb-16 text-center"
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(32px, 3.5vw, 48px)",
              color: "#fbf8f0",
              marginBottom: "12px",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            Trusted by Growing Businesses
          </h2>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(14px, 1.2vw, 16px)",
              color: "rgba(251, 248, 240, 0.6)",
              maxWidth: "500px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Real results from real clients. We've helped 50+ businesses scale
            their digital presence.
          </p>
        </motion.div>

        {/* ─── Trust Metrics Row ─── */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {trustMetrics.map((metric, idx) => (
              <motion.div
                key={metric.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.06,
                  ease: "easeOut",
                }}
              >
                <MetricCard metric={metric} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* ─── Client Logos Section ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "13px",
              fontWeight: 600,
              color: "rgba(251, 248, 240, 0.4)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "24px",
              textAlign: "center",
            }}
          >
            Trusted by Leading Companies
          </p>

          <div
            className="overflow-x-auto pb-4 scrollbar-hide"
            style={{
              scrollBehavior: "smooth",
            }}
          >
            <div
              className="flex gap-6 justify-center lg:justify-start"
              style={{
                minWidth: "min-content",
                paddingLeft: "24px",
                paddingRight: "24px",
              }}
            >
              {clientLogos.map((logo) => (
                <ClientLogoItem key={logo.id} logo={logo} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* ─── Testimonials Grid ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "13px",
              fontWeight: 600,
              color: "rgba(251, 248, 240, 0.4)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "24px",
              textAlign: "center",
            }}
          >
            What Our Clients Say
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.1,
                  ease: "easeOut",
                }}
              >
                <TestimonialCard testimonial={testimonial} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* CSS for scrollbar hiding */}
      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
