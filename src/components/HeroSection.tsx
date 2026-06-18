/**
 * Space One — Hero Section
 * Design: "Aurora Field" — Atmospheric Luxury
 * Typography: Sora (display) + DM Sans (body)
 * Palette: #001d2e base, #00476f surfaces, #00c2f2 accent, soft blues for glow
 */

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { useLocation } from "wouter";
import { trackButtonClick, trackBookingClick } from "@/lib/analytics";
import { getTranslation, getCurrentLanguage } from "@/lib/i18n";

/* ─── CDN Asset URLs ─── */
const ASSETS = {
  card1: "https://d2xsxph8kpxj0f.cloudfront.net/310519663462662922/BRBeNV3wqALzUgryjGNHvZ/floating-card-1-Ajz5EH2XqpAsuHTendu4Ja.webp",
  card2: "https://d2xsxph8kpxj0f.cloudfront.net/310519663462662922/BRBeNV3wqALzUgryjGNHvZ/floating-card-2-TNbZhAAAFkdn83r4iwRHxZ.webp",
  card3: "https://d2xsxph8kpxj0f.cloudfront.net/310519663462662922/BRBeNV3wqALzUgryjGNHvZ/floating-card-3-jkwJ9884NVQvakUEFoXGQQ.webp",
};

/* ─── Ambient Particles (memoized to avoid re-render) ─── */
function AmbientParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 25 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 2.5 + 1,
        delay: Math.random() * 20,
        duration: Math.random() * 15 + 22,
        opacity: Math.random() * 0.25 + 0.08,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            bottom: "-5%",
            width: p.size,
            height: p.size,
            background: `rgba(0, 194, 242, ${p.opacity})`,
            boxShadow: `0 0 ${p.size * 4}px rgba(0, 194, 242, ${p.opacity * 0.4})`,
            animation: `particle-float ${p.duration}s ${p.delay}s linear infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Aurora Background ─── */
function AuroraBackground({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base */}
      <div className="absolute inset-0" style={{ background: "#001d2e" }} />

      {/* Deep radial — right-biased for visual area */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 65% 45%, rgba(0, 71, 111, 0.55) 0%, transparent 70%)",
        }}
      />

      {/* Aurora blob 1 */}
      <div
        className="absolute will-change-transform"
        style={{
          width: "130%",
          height: "130%",
          top: "-15%",
          left: "-15%",
          background:
            "radial-gradient(ellipse 45% 35% at 60% 35%, rgba(117, 219, 244, 0.13) 0%, transparent 70%)",
          animation: "aurora-drift 32s ease-in-out infinite",
          transform: `translate(${mouseX * 0.015}px, ${mouseY * 0.015}px)`,
        }}
      />

      {/* Aurora blob 2 */}
      <div
        className="absolute will-change-transform"
        style={{
          width: "100%",
          height: "100%",
          top: "0",
          left: "0",
          background:
            "radial-gradient(ellipse 35% 45% at 25% 55%, rgba(153, 219, 241, 0.09) 0%, transparent 65%)",
          animation: "aurora-drift-2 26s ease-in-out infinite",
          transform: `translate(${mouseX * -0.012}px, ${mouseY * -0.012}px)`,
        }}
      />

      {/* Accent glow — right side */}
      <div
        className="absolute will-change-transform"
        style={{
          width: "50%",
          height: "50%",
          top: "20%",
          right: "0%",
          background:
            "radial-gradient(ellipse at center, rgba(0, 194, 242, 0.05) 0%, transparent 55%)",
          animation: "pulse-glow 10s ease-in-out infinite",
          transform: `translate(${mouseX * 0.025}px, ${mouseY * 0.025}px)`,
        }}
      />

      {/* Bottom vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to top, #001d2e 0%, transparent 25%)",
        }}
      />

      {/* Top vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0, 29, 46, 0.6) 0%, transparent 18%)",
        }}
      />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />
    </div>
  );
}

/* ─── Floating Visual Cards ─── */
function FloatingCards({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  return (
    <div className="relative w-full h-full" style={{ minHeight: "420px" }}>
      {/* Card 1 — Analytics Dashboard (largest, back-left) */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.85 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.4, delay: 0.6, ease: "easeOut" }}
        className="absolute"
        style={{
          top: "8%",
          left: "0%",
          width: "78%",
          maxWidth: "400px",
          animation: "float-card-1 8s ease-in-out infinite",
          transform: `translate(${mouseX * 0.035}px, ${mouseY * 0.035}px)`,
          zIndex: 1,
        }}
      >
        <div className="relative group">
          <div
            className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              background:
                "linear-gradient(135deg, rgba(0, 194, 242, 0.12), transparent 60%)",
              filter: "blur(16px)",
            }}
          />
          <img
            src={ASSETS.card1}
            alt="Analytics Dashboard"
            className="w-full rounded-xl relative"
            style={{
              filter: "drop-shadow(0 30px 60px rgba(0, 0, 0, 0.45))",
            }}
            loading="eager"
          />
        </div>
      </motion.div>

      {/* Card 2 — Performance Score (medium, overlapping front-right) */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.85 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.4, delay: 0.9, ease: "easeOut" }}
        className="absolute"
        style={{
          bottom: "5%",
          right: "-2%",
          width: "52%",
          maxWidth: "270px",
          animation: "float-card-2 7s ease-in-out infinite",
          transform: `translate(${mouseX * -0.025}px, ${mouseY * -0.025}px)`,
          zIndex: 3,
        }}
      >
        <div className="relative group">
          <div
            className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              background:
                "linear-gradient(135deg, rgba(0, 194, 242, 0.18), transparent 60%)",
              filter: "blur(14px)",
            }}
          />
          <img
            src={ASSETS.card2}
            alt="Performance Score"
            className="w-full rounded-xl relative"
            style={{
              filter: "drop-shadow(0 24px 48px rgba(0, 0, 0, 0.4))",
            }}
            loading="eager"
          />
        </div>
      </motion.div>

      {/* Card 3 — Leads notification (small, top-right floating) */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.85 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.4, delay: 1.2, ease: "easeOut" }}
        className="absolute"
        style={{
          top: "2%",
          right: "-8%",
          width: "48%",
          maxWidth: "240px",
          animation: "float-card-3 9s ease-in-out infinite",
          transform: `translate(${mouseX * 0.045}px, ${mouseY * 0.045}px)`,
          zIndex: 2,
        }}
      >
        <div className="relative group">
          <div
            className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              background:
                "linear-gradient(135deg, rgba(0, 194, 242, 0.18), transparent 60%)",
              filter: "blur(12px)",
            }}
          />
          <img
            src={ASSETS.card3}
            alt="New Leads"
            className="w-full rounded-xl relative"
            style={{
              filter: "drop-shadow(0 18px 36px rgba(0, 0, 0, 0.4))",
            }}
            loading="eager"
          />
        </div>
      </motion.div>

      {/* Decorative orbital rings */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ width: "120%", height: "120%" }}
      >
        <svg viewBox="0 0 500 500" className="w-full h-full opacity-[0.05]">
          <ellipse
            cx="250"
            cy="250"
            rx="230"
            ry="150"
            fill="none"
            stroke="#00c2f2"
            strokeWidth="0.5"
            strokeDasharray="4 10"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="-12 250 250"
              to="348 250 250"
              dur="60s"
              repeatCount="indefinite"
            />
          </ellipse>
          <ellipse
            cx="250"
            cy="250"
            rx="170"
            ry="110"
            fill="none"
            stroke="#75dbf4"
            strokeWidth="0.3"
            strokeDasharray="2 14"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="25 250 250"
              to="-335 250 250"
              dur="50s"
              repeatCount="indefinite"
            />
          </ellipse>
        </svg>
      </div>
    </div>
  );
}

/* ─── CTA Button ─── */
function CTAButton({
  children,
  variant = "primary",
  onClick,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
}) {
  const isPrimary = variant === "primary";

  return (
    <motion.button
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="relative group overflow-hidden"
      style={{
        padding: isPrimary ? "16px 38px" : "16px 34px",
        borderRadius: "12px",
        fontFamily: "var(--font-display)",
        fontWeight: 600,
        fontSize: "15px",
        letterSpacing: "-0.01em",
        color: isPrimary ? "#001d2e" : "#fbf8f0",
        background: isPrimary ? "#00c2f2" : "transparent",
        border: isPrimary ? "1px solid transparent" : "1px solid rgba(0, 194, 242, 0.3)",
        cursor: "pointer",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        boxShadow: isPrimary
          ? "0 4px 20px rgba(0, 194, 242, 0.2)"
          : "none",
      }}
    >
      {/* Glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow: isPrimary
            ? "0 0 35px rgba(0, 194, 242, 0.45), 0 0 70px rgba(0, 194, 242, 0.15), inset 0 0 25px rgba(255, 255, 255, 0.1)"
            : "0 0 30px rgba(0, 194, 242, 0.12), inset 0 0 20px rgba(0, 194, 242, 0.04)",
          borderRadius: "12px",
        }}
      />

      {/* Shimmer for primary */}
      {isPrimary && (
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 2s linear infinite",
            borderRadius: "12px",
          }}
        />
      )}

      {/* Secondary hover fill */}
      {!isPrimary && (
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
          style={{
            background: "rgba(0, 194, 242, 0.08)",
            borderRadius: "12px",
          }}
        />
      )}

      <span className="relative z-10 flex items-center gap-2">
        {children}
        {isPrimary && (
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
        )}
      </span>
    </motion.button>
  );
}

/* ─── Main Hero Section ─── */
export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.05 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [, navigate] = useLocation();

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePos({
      x: (clientX / innerWidth - 0.5) * 2,
      y: (clientY / innerHeight - 0.5) * 2,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  const textContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  };

  const textItem = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.85,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        minHeight: "100vh",
        background: "#001d2e",
        paddingTop: "clamp(60px, 8vh, 80px)",
      }}
    >
      {/* Background system */}
      <AuroraBackground mouseX={mousePos.x * 25} mouseY={mousePos.y * 25} />
      <AmbientParticles />

      {/* Content */}
      <div
        className="relative z-10 w-full mx-auto flex flex-col lg:flex-row items-center justify-center"
        style={{
          maxWidth: "1320px",
          minHeight: "100vh",
          padding: "clamp(80px, 10vh, 100px) 24px clamp(32px, 4vh, 48px)",
          gap: "clamp(32px, 4vw, 64px)",
          paddingTop: "clamp(80px, 10vh, 100px)",
        }}
      >
        {/* ─── Left: Text ─── */}
        <motion.div
          variants={textContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex-1 flex flex-col items-center text-center lg:items-start lg:text-left lg:pr-4"
          style={{ maxWidth: "640px" }}
        >
          {/* Badge */}
          <motion.div variants={textItem}>
            <div
              className="inline-flex items-center gap-2 mb-5"
              style={{
                padding: "7px 16px",
                borderRadius: "100px",
                background: "rgba(0, 71, 111, 0.35)",
                border: "1px solid rgba(0, 194, 242, 0.12)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div
                className="rounded-full"
                style={{
                  width: "6px",
                  height: "6px",
                  background: "#00c2f2",
                  boxShadow: "0 0 8px rgba(0, 194, 242, 0.5)",
                  animation: "pulse-glow 3s ease-in-out infinite",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "#a0e4f5",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                {getTranslation(getCurrentLanguage(), 'premium_web_agency')}
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={textItem}
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(32px, 4.5vw, 64px)",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: "#fbf8f0",
              marginBottom: "20px",
            }}
          >
            {getTranslation(getCurrentLanguage(), 'hero_headline_part1')}
            <span style={{ color: "#fbf8f0", opacity: 0.4 }}> — </span>
            <span
              style={{
                background:
                  "linear-gradient(135deg, #00c2f2 0%, #75dbf4 50%, #a0e4f5 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {getTranslation(getCurrentLanguage(), 'hero_headline_part2')}
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={textItem}
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              fontSize: "clamp(15px, 1.6vw, 19px)",
              lineHeight: 1.7,
              color: "rgba(251, 248, 240, 0.6)",
              marginBottom: "28px",
              maxWidth: "500px",
            }}
          >
            {getTranslation(getCurrentLanguage(), 'hero_description')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={textItem}
            className="flex flex-col sm:flex-row items-center lg:items-start gap-3"
          >
            <CTAButton variant="primary" onClick={() => {
              trackButtonClick("hero_get_estimate");
              navigate("/pricing-calculator");
            }}>{getTranslation(getCurrentLanguage(), 'get_website_estimate')}</CTAButton>
            <CTAButton variant="secondary" onClick={() => {
              trackBookingClick("hero_book_consultation");
              window.open("https://cal.com/edmon-khachatryan/digital-product-clarity-call", "_blank");
            }}>{getTranslation(getCurrentLanguage(), 'book_consultation')}</CTAButton>
          </motion.div>

          {/* Trust */}
          <motion.div
            variants={textItem}
            className="flex items-center gap-3 mt-5"
          >
            <div className="flex -space-x-1.5">
              {["#003a5c", "#004d73", "#00608a", "#0073a1"].map((bg, i) => (
                <div
                  key={i}
                  className="rounded-full"
                  style={{
                    width: "26px",
                    height: "26px",
                    background: bg,
                    border: "2px solid #001d2e",
                    boxShadow: "0 0 0 1px rgba(0, 194, 242, 0.08)",
                  }}
                />
              ))}
            </div>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                fontWeight: 400,
                color: "rgba(251, 248, 240, 0.35)",
                letterSpacing: "0.01em",
              }}
            >
              Trusted by growing businesses worldwide
            </span>
          </motion.div>
        </motion.div>

        {/* ─── Right: Visual ─── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, x: 30 }}
          animate={isInView ? { opacity: 1, scale: 1, x: 0 } : {}}
          transition={{ duration: 1.6, delay: 0.3, ease: "easeOut" }}
          className="flex-1 relative w-full hidden lg:block"
          style={{
            minHeight: "450px",
            maxWidth: "580px",
          }}
        >
          <FloatingCards mouseX={mousePos.x * 25} mouseY={mousePos.y * 25} />
        </motion.div>

        {/* Mobile visual — simplified, shown only on small screens */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
          className="relative w-full lg:hidden mt-4"
          style={{ maxWidth: "400px" }}
        >
          <div className="relative">
            <img
              src={ASSETS.card1}
              alt="Analytics Dashboard"
              className="w-full rounded-xl"
              style={{
                filter: "drop-shadow(0 20px 40px rgba(0, 0, 0, 0.4))",
              }}
              loading="eager"
            />
            {/* Overlay performance card on mobile */}
            <div
              className="absolute -bottom-6 -right-2"
              style={{ width: "45%", maxWidth: "180px" }}
            >
              <img
                src={ASSETS.card2}
                alt="Performance Score"
                className="w-full rounded-lg"
                style={{
                  filter: "drop-shadow(0 12px 24px rgba(0, 0, 0, 0.5))",
                  animation: "float-card-2 7s ease-in-out infinite",
                }}
                loading="eager"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-20"
        style={{
          background: "linear-gradient(to top, #001d2e, transparent)",
        }}
      />
    </section>
  );
}
