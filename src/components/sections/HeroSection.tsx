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
  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, 120]);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", fn, { passive: true });
    return () => window.removeEventListener("mousemove", fn);
  }, [mx, my]);

  const lines = [t("headline1"), t("headline2"), t("headline3")];

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-hero-canvas"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <motion.div style={{ x: orbX, y: orbY, rotate: ringRotate }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90vw,820px)] h-[min(90vw,820px)]"
        >
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-lav-400/45"
            animate={{ rotate: 360 }}
            transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute inset-[12%] rounded-full border border-lav-300/35" />
          <motion.div
            className="absolute inset-[24%] rounded-full border border-gold-400/30"
            animate={{ rotate: -360 }}
            transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>

        <motion.div
          style={{ x: orbX, y: orbY }}
          className="absolute -top-48 -left-48 w-[760px] h-[760px] rounded-full"
          animate={{ opacity: [0.4, 0.72, 0.4] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-full h-full rounded-full bg-[radial-gradient(circle,rgba(206,180,247,0.62)_0%,transparent_68%)] blur-3xl" />
        </motion.div>

        <motion.div
          style={{ x: orbX2, y: orbY2 }}
          className="absolute -bottom-44 -right-24 w-[580px] h-[580px] rounded-full"
          animate={{ opacity: [0.15, 0.38, 0.15] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          <div className="w-full h-full rounded-full bg-[radial-gradient(circle,rgba(245,179,53,0.42)_0%,transparent_65%)] blur-3xl" />
        </motion.div>

        <motion.div
          className="absolute top-[32%] right-[18%] w-44 h-44 rounded-full bg-lav-100/50 blur-[70px]"
          animate={{ y: [-20, 20, -20], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(99,68,173,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(99,68,173,0.35) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(ellipse 75% 65% at 50% 38%, black, transparent)",
          }}
        />

        {/* Floating accent marks */}
        {[
          { top: "18%", left: "12%", delay: 0 },
          { top: "62%", right: "10%", delay: 1.2 },
          { bottom: "22%", left: "20%", delay: 2.4 },
        ].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-gold-400/60"
            style={{ ...pos }}
            animate={{ y: [0, -12, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 5 + i, repeat: Infinity, delay: pos.delay, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="absolute inset-0 dot-grid opacity-[0.025] pointer-events-none" aria-hidden />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity, scale }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-28 pb-14"
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
                className={`text-display-xl block text-[clamp(2.35rem,7vw,4.65rem)] ${
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
