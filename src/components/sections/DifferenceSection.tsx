"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

const ICONS = [
  <svg key="p" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>,
  <svg key="g" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>,
  <svg key="m" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21a48.25 48.25 0 01-8.135-.687c-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" /></svg>,
  <svg key="c" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" /></svg>,
  <svg key="t" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></svg>,
  <svg key="r" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg>,
];

const KEYS = ["personalization", "smallGroups", "methodology", "communication", "criticalThinking", "realLife"] as const;

export default function DifferenceSection() {
  const t = useTranslations("difference");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });
  const [expanded, setExpanded] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setExpanded((prev) => (prev === index ? null : index));
  };

  return (
    <section className="relative py-16 md:py-20 px-6 bg-ivory overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-[0.016] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="max-w-2xl mb-12">
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            className="rule-ornament mb-7 w-fit"
          >
            {t("label")}
          </motion.div>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: 60, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-light text-4xl md:text-5xl text-plum leading-tight tracking-tight"
            >
              {t("title")}
            </motion.h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {KEYS.map((key, i) => {
            const isOpen = expanded === i;
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 44, scale: 0.97 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.07 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => handleToggle(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleToggle(i);
                  }
                  if (e.key === "Escape") setExpanded(null);
                }}
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
                className={`group relative rounded-3xl border transition-all duration-400 cursor-pointer select-none overflow-hidden ${
                  isOpen
                    ? "bg-white border-lav-400/60 shadow-medium md:col-span-2 lg:col-span-2"
                    : "bg-white border-lav-100/80 hover:border-lav-300/55 shadow-soft hover:shadow-medium"
                }`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br transition-all duration-500 rounded-3xl pointer-events-none ${
                    isOpen ? "from-lav-50/90 to-white/40" : "from-lav-50/0 to-lav-50/0 group-hover:from-lav-50/80 group-hover:to-white/20"
                  }`}
                />
                <span
                  className={`absolute -bottom-3 -right-1 font-display text-8xl font-bold select-none leading-none pointer-events-none transition-colors duration-500 ${
                    isOpen ? "text-lav-200/70" : "text-lav-100/80 group-hover:text-lav-200/60"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="relative z-10 p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 min-w-0">
                      <div
                        className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-400 ${
                          isOpen ? "bg-lav-600 text-white" : "bg-lav-100 text-lav-600 group-hover:bg-lav-600 group-hover:text-white"
                        }`}
                      >
                        {ICONS[i]}
                      </div>
                      <h3
                        className={`font-semibold text-base tracking-tight pt-2.5 transition-colors duration-300 ${
                          isOpen ? "text-plum" : "text-plum group-hover:text-plum"
                        }`}
                      >
                        {t(`features.${key}.title`)}
                      </h3>
                    </div>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-lav-400/70 text-xs flex-shrink-0 mt-3"
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
                        <p className="text-plum/55 text-sm leading-relaxed pt-5 pl-[3.75rem] border-l-2 border-lav-300/50 ml-1 mt-1">
                          {t(`features.${key}.desc`)}
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
    </section>
  );
}
