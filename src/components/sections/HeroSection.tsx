"use client";
import { useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import PremiumButton from "@/components/ui/PremiumButton";
import { EASE_LUXURY } from "@/lib/motion";

export default function HeroSection() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 42, damping: 20 });
  const sy = useSpring(my, { stiffness: 42, damping: 20 });
  const orbX = useTransform(sx, [-0.5, 0.5], [-40, 40]);
  const orbY = useTransform(sy, [-0.5, 0.5], [-24, 24]);
  const orbX2 = useTransform(sx, [-0.5, 0.5], [28, -28]);
  const orbY2 = useTransform(sy, [-0.5, 0.5], [18, -18]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.55], [1, 0.94]);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    const mq = window.matchMedia("(min-width: 1024px)");
    if (!mq.matches) return;
    window.addEventListener("mousemove", fn, { passive: true });
    const onChange = () => {
      if (!mq.matches) {
        mx.set(0);
        my.set(0);
        window.removeEventListener("mousemove", fn);
      }
    };
    mq.addEventListener("change", onChange);
    return () => {
      window.removeEventListener("mousemove", fn);
      mq.removeEventListener("change", onChange);
    };
  }, [mx, my]);

  const lines = [t("headline1"), t("headline2"), t("headline3")];

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-hero-canvas"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        {/* Static color washes — pushed to corners, softer in center */}
        <div className="absolute -top-[12%] -left-[12%] w-[48vw] h-[48vh] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(181,143,239,0.38)_0%,rgba(206,180,247,0.12)_42%,transparent_72%)] blur-[80px]" />
        <div className="absolute -bottom-[8%] -right-[6%] w-[46vw] h-[46vh] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(245,179,53,0.42)_0%,rgba(255,217,120,0.14)_45%,transparent_72%)] blur-[68px]" />

        {/* Center lift — keeps headline area airy, less purple */}
        <div className="absolute top-[18%] left-1/2 -translate-x-1/2 w-[min(92vw,56rem)] h-[58vh] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(253,251,248,0.92)_0%,rgba(253,251,248,0.55)_45%,transparent_72%)] blur-[48px]" />

        {/* Slow breathing aurora — visible ambient motion */}
        <motion.div
          className="absolute inset-0"
          animate={{ opacity: [0.55, 0.78, 0.55] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="absolute top-[4%] left-[4%] w-[50vw] max-w-2xl h-[38vh] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(155,111,232,0.32)_0%,rgba(206,180,247,0.12)_50%,transparent_72%)] blur-[72px]"
            animate={{ x: [0, 36, 0], y: [0, -20, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-[6%] right-[8%] w-[48vw] max-w-2xl h-[38vh] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(245,179,53,0.38)_0%,rgba(255,217,120,0.12)_48%,transparent_72%)] blur-[60px]"
            animate={{ x: [0, -30, 0], y: [0, 16, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        </motion.div>

        {/* Mouse-reactive spotlight — softer, higher up so it misses the headline */}
        <motion.div
          style={{ x: orbX, y: orbY }}
          className="absolute -top-[22%] left-1/2 -translate-x-1/2 w-[78vw] h-[52vh]"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(181,143,239,0.26)_0%,rgba(206,180,247,0.08)_55%,transparent_78%)] blur-[64px]" />
        </motion.div>

        <motion.div
          style={{ x: orbX2, y: orbY2 }}
          className="absolute -bottom-[10%] right-[-6%] w-[52vw] h-[46vh]"
          animate={{ scale: [1, 1.05, 1], opacity: [0.9, 1, 0.9] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        >
          <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(232,154,24,0.32)_0%,rgba(245,179,53,0.12)_52%,transparent_74%)] blur-[56px]" />
        </motion.div>

        {/* Soft grid texture */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(111,68,196,0.28) 1px, transparent 1px), linear-gradient(90deg, rgba(111,68,196,0.28) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse 68% 58% at 50% 38%, black 0%, transparent 78%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 68% 58% at 50% 38%, black 0%, transparent 78%)",
          }}
        />

        {[
          { top: "22%", left: "12%", delay: 0, color: "bg-lav-400/55" },
          { top: "52%", right: "10%", delay: 1.6, color: "bg-gold-400/60" },
          { top: "72%", left: "22%", delay: 0.8, color: "bg-lav-500/45" },
        ].map((pos, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 rounded-full ${pos.color} shadow-[0_0_12px_currentColor]`}
            style={{ top: pos.top, left: pos.left, right: pos.right }}
            animate={{ y: [0, -14, 0], opacity: [0.35, 0.75, 0.35] }}
            transition={{ duration: 5.5 + i, repeat: Infinity, delay: pos.delay, ease: "easeInOut" }}
          />
        ))}
      </div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity, scale }}
        className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto pt-24 sm:pt-28 pb-10 sm:pb-14"
      >
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: EASE_LUXURY }}
          className="font-script text-2xl md:text-3xl text-gold-500 mb-5"
        >
          {t("motto")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE_LUXURY }}
          className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass shadow-soft mb-10"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-lav-500 opacity-60 animate-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-lav-600" />
          </span>
          <span className="text-eyebrow text-lav-700">{t("tagline")}</span>
        </motion.div>

        <div className="mb-8 space-y-0">
          {lines.map((line, i) => (
            <div key={i} className="overflow-hidden py-0.5">
              <motion.h1
                initial={{ y: "108%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 1.15,
                  delay: 0.35 + i * 0.12,
                  ease: EASE_LUXURY,
                }}
                className={`text-display-xl block text-[clamp(1.8rem,5vw,3.3rem)] ${
                  i === 1 ? "text-gradient" : "text-plum"
                }`}
              >
                {line}
              </motion.h1>
            </div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.95, ease: EASE_LUXURY }}
          className="text-body-premium text-lg md:text-xl max-w-lg mx-auto mb-8"
        >
          {t("subtext")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 1.05, ease: EASE_LUXURY }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <PremiumButton href={`/${locale}/contact`} variant="primary" size="lg">
            {t("cta1")}
            <motion.svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </motion.svg>
          </PremiumButton>
          <PremiumButton href={`/${locale}/programs`} variant="secondary" size="lg">
            {t("cta2")}
          </PremiumButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: EASE_LUXURY }}
          className="mt-8"
        >
          <PremiumButton href="#puma" variant="gold" size="md" className="rounded-full px-6">
            {t("whyName")}
            <motion.svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </motion.svg>
          </PremiumButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
