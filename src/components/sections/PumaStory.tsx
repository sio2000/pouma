"use client";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";

export default function PumaStory() {
  const t = useTranslations("puma");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const sRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sRef, offset: ["start end", "end start"] });
  const orbY1 = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const textY = useTransform(scrollYProgress, [0, 1], [18, -18]);

  const paras = [t("p1"), t("p2"), t("p3"), t("p4"), t("p5")];

  return (
    <section id="puma" ref={sRef} className="relative py-16 md:py-20 px-6 overflow-hidden bg-dark-section scroll-mt-24">
      {/* Orbs */}
      <motion.div style={{ y: orbY1 }} className="absolute -top-20 right-0 w-[550px] h-[550px] pointer-events-none">
        <div className="w-full h-full rounded-full bg-radial from-lav-600/28 via-lav-800/8 to-transparent blur-3xl" />
      </motion.div>
      <motion.div style={{ y: orbY2 }} className="absolute -bottom-10 -left-10 w-80 h-80 pointer-events-none">
        <div className="w-full h-full rounded-full bg-radial from-gold-400/12 to-transparent blur-3xl" />
      </motion.div>

      {/* Ghost letter */}
      <div className="absolute inset-0 flex items-center justify-end pr-8 pointer-events-none overflow-hidden">
        <motion.span
          initial={{ opacity: 0, x: 80 }}
          animate={inView ? { opacity: 0.035, x: 0 } : {}}
          transition={{ duration: 1.8, delay: 0.3 }}
          className="font-display text-[20rem] text-white leading-none select-none font-bold"
        >
          P
        </motion.span>
      </div>

      <motion.div ref={ref} style={{ y: textY }} className="max-w-3xl mx-auto relative z-10">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, x: -18 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-10"
        >
          <div className="w-6 h-px bg-lav-400" />
          <span className="text-[11px] font-bold text-lav-300 tracking-[0.22em] uppercase">{t("label")}</span>
        </motion.div>

        {/* Headline — on a yellow background */}
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14"
        >
          <span className="inline-block rounded-2xl bg-gradient-to-r from-gold-300 to-gold-400 px-6 py-3 md:px-7 md:py-4 shadow-gold-glow">
            <span className="block font-display font-light text-4xl md:text-5xl lg:text-6xl text-plum leading-[1.05] tracking-tight">
              {t("headline")} {t("headline2")}
            </span>
          </span>
        </motion.div>

        {/* Paragraphs */}
        <div className="space-y-6 mb-16">
          {paras.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -22 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.28 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`text-lg leading-relaxed font-light ${
                i === paras.length - 1 ? "text-white/92 font-medium" : "text-white/55"
              }`}
            >
              {p}
            </motion.p>
          ))}
        </div>

        {/* Quote card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.88, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl overflow-hidden"
        >
          <div className="absolute inset-0 rounded-3xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(223,184,74,0.22)" }} />
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold-400 via-gold-300/70 to-transparent" />
          <div className="relative px-10 py-8">
            <span className="absolute top-3 left-5 font-display text-6xl leading-none" style={{ color: "rgba(223,184,74,0.25)" }}>"</span>
            <div className="relative space-y-4 pt-4 pl-6">
              <p className="font-display italic text-xl md:text-2xl leading-snug text-gold-300">{t("quote1")}</p>
              <p className="text-base md:text-lg leading-relaxed text-white/70">{t("quote2")}</p>
              <p className="text-base md:text-lg leading-relaxed text-white/70">{t("quote3")}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
