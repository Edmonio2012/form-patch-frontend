/**
 * Space One — Header Component
 * Design: Premium glassmorphism navigation with sticky scroll behavior
 * Typography: Sora (display) + DM Sans (body)
 * Palette: #001d2e base, #00c2f2 accent, soft blues for glow
 */

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { trackButtonClick, trackBookingClick } from "@/lib/analytics";
import LanguageSelector from "./LanguageSelector";

interface HeaderProps {
  logoText?: string;
}

export default function Header({ logoText = "Space One" }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const [, navigate] = useLocation();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/#services" },
    { label: "Insights", href: "/#insights" },
    { label: "Contact", href: "/contact" },
  ];

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    setIsScrolled(scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  /* Close mobile menu when clicking outside */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [isMobileMenuOpen]);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 w-full"
      style={{
        background: "#001d2e",
        backdropFilter: isScrolled ? "blur(12px)" : "blur(4px)",
        borderBottom: isScrolled
          ? "1px solid rgba(0, 194, 242, 0.08)"
          : "1px solid rgba(0, 194, 242, 0.04)",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        zIndex: 50,
      }}
    >
      <div
        className="mx-auto flex items-center justify-between"
        style={{
          maxWidth: "1320px",
          padding: "16px 24px",
          gap: "32px",
        }}
      >
        {/* ─── Logo ─── */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 flex-shrink-0 group"
          style={{
            textDecoration: "none",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: "0",
          }}
        >
          {/* Logo image */}
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663462662922/BRBeNV3wqALzUgryjGNHvZ/space-one-logo-flipped_92f86800.png"
            alt="Space One Logo"
            className="group-hover:scale-110 transition-transform duration-300"
            style={{
              width: "38px",
              height: "38px",
              objectFit: "contain",
              filter: "drop-shadow(0 0 8px rgba(0, 194, 242, 0.25))",
            }}
          />

          {/* Logo text */}
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "18px",
              color: "#fbf8f0",
              letterSpacing: "-0.02em",
            }}
          >
            {logoText}
          </span>
        </button>

        {/* ─── Desktop Navigation ─── */}
        <nav
          className="hidden lg:flex items-center gap-8 flex-1"
          style={{
            maxWidth: "500px",
          }}
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                const isAnchor = item.href.startsWith("#");
                if (!isAnchor) {
                  e.preventDefault();
                  navigate(item.href);
                }
              }}
              className="relative group"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "14px",
                fontWeight: 500,
                color: "rgba(251, 248, 240, 0.65)",
                textDecoration: "none",
                transition: "color 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#fbf8f0";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color =
                  "rgba(251, 248, 240, 0.65)";
              }}
            >
              {item.label}

              {/* Underline glow on hover */}
              <div
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#00c2f2] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  boxShadow: "0 0 12px rgba(0, 194, 242, 0.5)",
                }}
              />
            </a>
          ))}
        </nav>

        {/* ─── Desktop CTAs ─── */}
        <div
          className="hidden lg:flex items-center gap-4 flex-shrink-0"
          style={{
            marginLeft: "auto",
          }}
        >
          {/* Language Selector - Disabled temporarily while translations are being applied */}
          {/* <LanguageSelector /> */}
          {/* Secondary CTA */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              trackBookingClick("header_book_call");
              window.open("https://cal.com/edmon-khachatryan/digital-product-clarity-call", "_blank");
            }}
            className="group relative overflow-hidden"
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              fontFamily: "var(--font-body)",
              fontWeight: 500,
              fontSize: "13px",
              color: "#fbf8f0",
              background: "transparent",
              border: "1px solid rgba(0, 194, 242, 0.2)",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "rgba(0, 194, 242, 0.4)";
              el.style.background = "rgba(0, 194, 242, 0.06)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "rgba(0, 194, 242, 0.2)";
              el.style.background = "transparent";
            }}
          >
            Book Call
          </motion.button>

          {/* Primary CTA - Get Estimate with Enhanced Styling */}
          <motion.button
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              trackButtonClick("header_get_estimate");
              navigate("/pricing-calculator");
            }}
            className="group relative overflow-hidden"
            style={{
              padding: "10px 22px",
              borderRadius: "8px",
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "13px",
              color: "#001d2e",
              background: "linear-gradient(135deg, #00c2f2 0%, #75dbf4 100%)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              cursor: "pointer",
              boxShadow: "0 6px 24px rgba(0, 194, 242, 0.35)",
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              letterSpacing: "0.3px",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.boxShadow =
                "0 12px 40px rgba(0, 194, 242, 0.5), 0 0 60px rgba(0, 194, 242, 0.2)";
              el.style.transform = "translateY(-3px)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.boxShadow = "0 6px 24px rgba(0, 194, 242, 0.35)";
              el.style.transform = "translateY(0)";
            }}
          >
            {/* Glow effect */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 2s linear infinite",
                borderRadius: "8px",
              }}
            />

            <span className="relative z-10 flex items-center gap-1.5">Get Estimate</span>
          </motion.button>
        </div>

        {/* ─── Mobile Menu Button ─── */}
        <button
          className="hidden md:hidden lg:hidden xl:hidden 2xl:hidden sm:flex rounded-lg transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{
            background: isMobileMenuOpen
              ? "rgba(0, 194, 242, 0.1)"
              : "transparent",
            border: "1px solid rgba(0, 194, 242, 0.15)",
            cursor: "pointer",
            width: "44px",
            height: "44px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "20px",
              height: "20px",
            }}
          >
            {/* Top line */}
            <div
              style={{
                position: "absolute",
                width: "20px",
                height: "2px",
                background: "#fbf8f0",
                borderRadius: "1px",
                transition: "all 0.35s cubic-bezier(0.4, 0.0, 0.2, 1)",
                top: "0px",
                left: "0px",
                transform: isMobileMenuOpen ? "translateY(9px) rotate(45deg)" : "translateY(0px) rotate(0deg)",
                transformOrigin: "center center",
              }}
            />
            {/* Middle line */}
            <div
              style={{
                position: "absolute",
                width: "20px",
                height: "2px",
                background: "#fbf8f0",
                borderRadius: "1px",
                transition: "all 0.35s cubic-bezier(0.4, 0.0, 0.2, 1)",
                top: "9px",
                left: "0px",
                opacity: isMobileMenuOpen ? 0 : 1,
              }}
            />
            {/* Bottom line */}
            <div
              style={{
                position: "absolute",
                width: "20px",
                height: "2px",
                background: "#fbf8f0",
                borderRadius: "1px",
                transition: "all 0.35s cubic-bezier(0.4, 0.0, 0.2, 1)",
                bottom: "0px",
                left: "0px",
                transform: isMobileMenuOpen ? "translateY(-9px) rotate(-45deg)" : "translateY(0px) rotate(0deg)",
                transformOrigin: "center center",
              }}
            />
          </div>
        </button>
      </div>

      {/* ─── Mobile Menu ─── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="hidden max-lg:block lg:hidden overflow-hidden"
            style={{
              borderTop: "1px solid rgba(0, 194, 242, 0.1)",
              background: "rgba(0, 29, 46, 0.8)",
              backdropFilter: "blur(8px)",
            }}
          >
            <nav
              className="flex flex-col gap-1"
              style={{
                padding: "16px 24px",
              }}
            >
              {navItems.map((item, idx) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="px-4 py-3 rounded-lg transition-colors"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "rgba(251, 248, 240, 0.65)",
                    textDecoration: "none",
                    background: "transparent",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(0, 194, 242, 0.08)";
                    (e.currentTarget as HTMLElement).style.color = "#fbf8f0";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "transparent";
                    (e.currentTarget as HTMLElement).style.color =
                      "rgba(251, 248, 240, 0.65)";
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </motion.a>
              ))}

              {/* Mobile Language Selector */}
              <div
                className="px-4 py-3"
                style={{
                  marginTop: "8px",
                }}
              >
                <LanguageSelector />
              </div>

              {/* Mobile CTAs */}
              <div
                className="flex flex-col gap-2 mt-4 pt-4"
                style={{
                  borderTop: "1px solid rgba(0, 194, 242, 0.1)",
                }}
              >
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navItems.length * 0.05 }}
                  onClick={() => {
                    trackBookingClick("mobile_menu_book_call");
                    window.open("https://cal.com/edmon-khachatryan/digital-product-clarity-call", "_blank");
                  }}
                  className="w-full px-4 py-3 rounded-lg"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 500,
                    fontSize: "13px",
                    color: "#fbf8f0",
                    background: "rgba(0, 194, 242, 0.08)",
                    border: "1px solid rgba(0, 194, 242, 0.2)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "rgba(0, 194, 242, 0.12)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "rgba(0, 194, 242, 0.08)";
                  }}
                >
                  Book Call
                </motion.button>

                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (navItems.length + 1) * 0.05 }}
                  className="w-full px-4 py-3 rounded-lg group relative overflow-hidden"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "15px",
                    color: "#001d2e",
                    background: "linear-gradient(135deg, #00c2f2 0%, #75dbf4 100%)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 16px rgba(0, 194, 242, 0.25)",
                    letterSpacing: "0.3px",
                  }}
                  onClick={() => {
                    trackButtonClick("mobile_menu_get_estimate");
                    navigate("/pricing-calculator");
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.boxShadow =
                      "0 8px 32px rgba(0, 194, 242, 0.4), 0 0 60px rgba(0, 194, 242, 0.15)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.boxShadow =
                      "0 4px 16px rgba(0, 194, 242, 0.25)";
                  }}
                >
                  Get Estimate
                </motion.button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
