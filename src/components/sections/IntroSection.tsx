"use client";
import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import PremiumButton from "@/components/ui/PremiumButton";
import { EASE_LUXURY } from "@/lib/motion";

type IntroCard = { tag: string; title: string; desc: string };

const ICONS: ReactNode[] = [
  <g key="who">
    <circle cx="12" cy="8" r="3.4" />
    <path d="M5.5 19.5c0-3.7 2.9-5.6 6.5-5.6s6.5 1.9 6.5 5.6" />
  </g>,
  <g key="problem">
    <rect x="5" y="11" width="14" height="9" rx="2.2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </g>,
  <g key="how">
    <rect x="5" y="11" width="14" height="9" rx="2.2" />
    <path d="M8 11V8a4 4 0 0 1 7.4-1.9" />
  </g>,
];

const CARD_THEMES = [
  {
    frame: "from-lav-300/80 via-lav-100/40 to-white/60",
    glow: "bg-lav-300/25",
    icon: "from-lav-100 to-lav-200/80 text-lav-700 ring-lav-200/80",
    accent: "from-lav-500 via-lav-400 to-lav-300",
    hover: "group-hover:shadow-[0_20px_50px_-12px_rgba(155,111,232,0.28)]",
  },
  {
    frame: "from-plum/20 via-lav-100/30 to-white/60",
    glow: "bg-plum/10",
    icon: "from-lav-50 to-lav-100 text-plum ring-lav-200/70",
    accent: "from-plum-soft via-lav-500 to-lav-400",
    hover: "group-hover:shadow-[0_20px_50px_-12px_rgba(82,64,128,0.22)]",
  },
  {
    frame: "from-gold-300/90 via-gold-200/50 to-white/70",
    glow: "bg-gold-300/30",
    icon: "from-gold-200/80 to-gold-200/40 text-gold-500 ring-gold-300/60",
    accent: "from-gold-500 via-gold-400 to-lav-400",
    hover: "group-hover:shadow-gold-glow",
  },
];

export default function IntroSection() {
  const t = useTranslations("intro");
  const locale = useLocale();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const cards = t.raw("cards") as IntroCard[];

  return (
    <section className="relative py-20 md:py-28 px-6 overflow-hidden bg-section-elevated">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 max-w-3xl bg-gradient-to-r from-transparent via-lav-300/50 to-transparent" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[60vw] h-72 bg-[radial-gradient(ellipse_at_center,rgba(206,180,247,0.22)_0%,transparent_70%)] blur-2xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-gold-200/20 blur-3xl" />
      </div>

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE_LUXURY }}
          className="flex items-center justify-center gap-3 mb-7"
        >
          <span className="w-8 h-px bg-gold-400/70" />
          <span className="text-eyebrow text-lav-600">{t("eyebrow")}</span>
          <span className="w-8 h-px bg-gold-400/70" />
        </motion.div>

        <div className="text-center max-w-3xl mx-auto">
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "110%" }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 1, delay: 0.1, ease: EASE_LUXURY }}
              className="text-display-xl text-plum text-[clamp(1.9rem,4.6vw,3.1rem)]"
            >
              {t("headline1")}
            </motion.h2>
          </div>
          <div className="overflow-hidden pb-1">
            <motion.h2
              initial={{ y: "110%" }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 1, delay: 0.2, ease: EASE_LUXURY }}
              className="text-display-xl text-gradient text-[clamp(1.9rem,4.6vw,3.1rem)]"
            >
              {t("headline2")}
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.4, ease: EASE_LUXURY }}
            className="text-body-premium text-lg md:text-xl mt-7 max-w-2xl mx-auto"
          >
            {t("lead")}
          </motion.p>
        </div>

        <div className="relative mt-14 md:mt-16">
          <div
            className="hidden md:block absolute top-[4.5rem] left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-lav-200/0 via-lav-300/50 to-lav-200/0 pointer-events-none"
            aria-hidden
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7">
            {cards.map((card, i) => {
              const theme = CARD_THEMES[i % CARD_THEMES.length];
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 36 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.5 + i * 0.14, ease: EASE_LUXURY }}
                  whileHover={{
                    y: -10,
                    transition: { type: "spring", stiffness: 280, damping: 22 },
                  }}
                  className={`group relative rounded-[1.75rem] p-[1px] bg-gradient-to-br ${theme.frame} shadow-soft transition-shadow duration-500 ${theme.hover}`}
                >
                  <article className="relative h-full overflow-hidden rounded-[calc(1.75rem-1px)] bg-white/95 backdrop-blur-md px-7 pt-8 pb-8">
                    <span
                      className={`pointer-events-none absolute -top-10 -right-8 h-36 w-36 rounded-full blur-3xl opacity-60 transition-opacity duration-500 group-hover:opacity-100 ${theme.glow}`}
                      aria-hidden
                    />
                    <span
                      className={`pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r ${theme.accent} opacity-70 transition-opacity duration-300 group-hover:opacity-100`}
                      aria-hidden
                    />
                    <span
                      className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/70 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
                      aria-hidden
                    />

                    <div className="relative flex items-start justify-between gap-4 mb-6">
                      <span
                        className={`inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ring-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] ${theme.icon}`}
                        aria-hidden
                      >
                        <svg
                          width="26"
                          height="26"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.65}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          {ICONS[i % ICONS.length]}
                        </svg>
                      </span>
                      <span
                        className="method-num font-display text-[3.25rem] font-light leading-none tracking-tight opacity-90"
                        aria-hidden
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <p className="relative text-eyebrow text-lav-600 mb-3">{card.tag}</p>
                    <h3 className="relative font-display text-[1.65rem] md:text-[1.75rem] text-plum leading-[1.15] mb-4">
                      {card.title}
                    </h3>
                    <p className="relative text-[15px] leading-[1.75] text-plum/62">{card.desc}</p>
                  </article>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.95, ease: EASE_LUXURY }}
          className="mt-12 flex justify-center"
        >
          <PremiumButton href={`/${locale}/contact`} variant="gold" size="lg" className="rounded-full px-7">
            {t("cta")}
            <motion.svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              aria-hidden
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </motion.svg>
          </PremiumButton>
        </motion.div>
      </div>
    </section>
  );
}
