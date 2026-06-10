"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import PremiumButton from "@/components/ui/PremiumButton";

export default function CtaSection() {
  const t   = useTranslations("cta");
  const locale = useLocale();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });

  return (
    <section className="relative py-16 md:py-20 px-6 overflow-hidden bg-ivory">
      {/* Dark inset card */}
      <div className="max-w-5xl mx-auto relative">
        {/* Actual dark card */}
        <div ref={ref} className="relative rounded-3xl overflow-hidden bg-dark-section shadow-strong">
          {/* BG orbs inside card */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-lav-800/30 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-gold-400/16 blur-3xl" />
            <div className="absolute inset-0 dot-grid opacity-[0.04]" />
          </div>

          <div className="relative z-10 text-center py-16 md:py-20 px-8 md:px-16">
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="inline-flex items-center gap-2 mb-8"
            >
              <div className="w-6 h-px bg-lav-400" />
              <span className="text-[11px] font-bold text-lav-300 tracking-[0.22em] uppercase">The Pouma Academy</span>
              <div className="w-6 h-px bg-lav-400" />
            </motion.div>

            <div className="overflow-hidden mb-2">
              <motion.h2
                initial={{ y: 70, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="font-display font-light text-5xl md:text-6xl text-white leading-tight tracking-tight"
              >
                {t("headline")}
              </motion.h2>
            </div>
            <div className="overflow-hidden mb-8">
              <motion.h2
                initial={{ y: 70, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="font-display font-light text-5xl md:text-6xl text-gold leading-tight tracking-tight"
              >
                {t("headline2")}
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.36 }}
              className="text-white/45 text-lg mb-12"
            >
              {t("body")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.48 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <PremiumButton href={`/${locale}/contact`} variant="gold" size="lg">
                {t("primary")}
              </PremiumButton>
              <PremiumButton
                href={`/${locale}/programs`}
                variant="ghost"
                size="lg"
                className="border-white/20"
              >
                {t("secondary")}
              </PremiumButton>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
