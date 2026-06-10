"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

type SkillItem = { title: string; detail: string };

export default function CommunicationSection() {
  const t = useTranslations("communication");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });
  const [expanded, setExpanded] = useState<number | null>(null);
  const skills = t.raw("skills") as SkillItem[];

  const handleClick = (index: number) => {
    setExpanded(index);
  };

  const handleDoubleClick = (index: number) => {
    if (expanded === index) setExpanded(null);
  };

  return (
    <section className="relative py-16 md:py-20 px-6 overflow-hidden bg-dark-section">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-lav-800/30 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-gold-400/14 blur-3xl" />
        <div className="absolute inset-0 dot-grid opacity-[0.04]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              className="inline-flex items-center gap-2 mb-8"
            >
              <div className="w-6 h-px bg-lav-400" />
              <span className="text-[11px] font-bold text-lav-300 tracking-[0.22em] uppercase">
                {t("label")}
              </span>
            </motion.div>

            <div className="overflow-hidden mb-1">
              <motion.h2
                initial={{ y: 70, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="font-display font-light text-4xl md:text-5xl text-white leading-[1.03] tracking-tight"
              >
                {t("headline")}
              </motion.h2>
            </div>
            <div className="overflow-hidden mb-8">
              <motion.h2
                initial={{ y: 70, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="font-display font-light text-4xl md:text-5xl text-gold leading-[1.03] tracking-tight"
              >
                {t("headline2")}
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.32 }}
              className="text-white/50 text-lg leading-relaxed max-w-md"
            >
              {t("body")}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.42 }}
              className="mt-7 border-l-2 border-gold-400/50 pl-5 font-display italic text-gold-300 text-lg md:text-xl leading-relaxed max-w-md"
            >
              {t("quote")}
            </motion.p>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {skills.map((skill, i) => {
              const isOpen = expanded === i;
              return (
                <motion.div
                  key={skill.title}
                  initial={{ opacity: 0, y: 28, scale: 0.96 }}
                  animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.15 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => handleClick(i)}
                  onDoubleClick={() => handleDoubleClick(i)}
                  className={`group relative rounded-2xl border transition-all duration-400 overflow-hidden cursor-pointer select-none ${
                    isOpen
                      ? "bg-lav-900/60 border-lav-400/50 shadow-glow col-span-1 sm:col-span-2"
                      : "bg-dark-elevated border-white/8 hover:border-lav-400/35 hover:bg-lav-900/40"
                  }`}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isOpen}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleClick(i);
                    if (e.key === "Escape") setExpanded(null);
                  }}
                >
                  <div className="relative z-10 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors duration-300 ${
                            isOpen ? "bg-gold-400" : "bg-gold-400/80"
                          }`}
                        />
                        <span
                          className={`text-sm font-medium transition-colors duration-300 ${
                            isOpen ? "text-white" : "text-white/65 group-hover:text-white/85"
                          }`}
                        >
                          {skill.title}
                        </span>
                      </div>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-lav-300/60 text-xs flex-shrink-0 mt-0.5"
                        aria-hidden
                      >
                        ▾
                      </motion.span>
                    </div>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="text-white/55 text-sm leading-relaxed pt-4 pl-4 border-l border-gold-400/30 mt-4">
                            {skill.detail}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
