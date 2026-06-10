"use client";

import { Children, useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useInView, type MotionValue } from "framer-motion";
import { useTranslations } from "next-intl";

/** Map each quote to a homepage section band (6 quotes across 9 sections). */
function quoteRange(index: number) {
  const sections = 9;
  const start = Math.max(0, index / sections - 0.01);
  const center = (index + 0.65) / sections;
  const end = Math.min(1, (index + 1.35) / sections + 0.01);
  const fade = Math.min((end - start) * 0.28, 0.055);

  return {
    input: [start, start + fade, center, end - fade, end] as [
      number,
      number,
      number,
      number,
      number,
    ],
  };
}

function FloatingQuote({
  text,
  index,
  scrollYProgress,
}: {
  text: string;
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const isLeft = index % 2 === 0;
  const { input } = quoteRange(index);

  const opacity = useTransform(scrollYProgress, input, [0, 0.55, 1, 0.55, 0]);
  const x = useTransform(
    scrollYProgress,
    input,
    isLeft ? [-28, -8, 0, -8, -28] : [28, 8, 0, 8, 28]
  );
  const y = useTransform(scrollYProgress, input, [18, 6, 0, -6, -18]);
  const scale = useTransform(scrollYProgress, input, [0.96, 0.99, 1.01, 0.99, 0.96]);
  const blur = useTransform(scrollYProgress, input, [5, 1.5, 0, 1.5, 5]);
  const filter = useTransform(blur, (v) => `blur(${v}px)`);
  const lineW = useTransform(scrollYProgress, input, [0, 0.5, 1, 0.5, 0]);

  const topOffsets = ["38%", "44%", "36%", "46%", "40%", "42%"];

  return (
    <motion.div
      style={{
        opacity,
        x,
        y,
        scale,
        filter,
        top: topOffsets[index % topOffsets.length],
      }}
      className={`fixed z-20 w-[min(15rem,22vw)] pointer-events-none hidden xl:block ${
        isLeft ? "left-8 2xl:left-14" : "right-8 2xl:right-14"
      }`}
      aria-hidden
    >
      <div
        className={`relative rounded-2xl border border-lav-200/55 bg-white/78 backdrop-blur-md px-5 py-4 shadow-soft ring-1 ring-lav-100/80 ${
          isLeft ? "text-left" : "text-right"
        }`}
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-lav-50/60 via-transparent to-gold-100/30 pointer-events-none" />
        <p className="relative font-display italic text-[clamp(1.05rem,1.35vw,1.45rem)] text-plum/85 leading-relaxed tracking-wide">
          {text}
        </p>
        <motion.div
          style={{ scaleX: lineW }}
          className={`mt-4 h-px w-16 bg-gradient-to-r from-lav-400/70 to-transparent ${
            isLeft ? "origin-left" : "ml-auto origin-right"
          }`}
        />
      </div>
    </motion.div>
  );
}

function MobileQuote({
  text,
  align,
}: {
  text: string;
  align: "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-15% 0px", amount: 0.6 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`xl:hidden px-6 py-3 pointer-events-none ${
        align === "left" ? "text-left" : "text-right"
      }`}
      aria-hidden
    >
      <p className="font-display italic text-[1.15rem] text-plum/75 leading-snug max-w-[16rem] inline-block border-l-2 border-lav-300/50 pl-4">
        {text}
      </p>
    </motion.div>
  );
}

function QuoteLayer({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const t = useTranslations("scrollQuotes");
  const quotes = [t("q1"), t("q2"), t("q3"), t("q4"), t("q5"), t("q6")];

  return (
    <>
      {quotes.map((text, i) => (
        <FloatingQuote
          key={i}
          text={text}
          index={i}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </>
  );
}

type HomeSectionsWithQuotesProps = {
  children: ReactNode;
};

/**
 * Wraps homepage sections and scatters emotional quotes left/right while scrolling.
 */
export function HomeSectionsWithQuotes({ children }: HomeSectionsWithQuotesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("scrollQuotes");
  const quotes = [t("q1"), t("q2"), t("q3"), t("q4"), t("q5"), t("q6")];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.75", "end 0.25"],
  });

  const childArray = Children.toArray(children);
  const mobileInsertAfter = [0, 2, 4, 5, 7, 8];

  return (
    <div ref={containerRef} className="relative">
      <QuoteLayer scrollYProgress={scrollYProgress} />
      {childArray.map((child, i) => (
        <div key={i}>
          {child}
          {mobileInsertAfter.includes(i) && (
            <MobileQuote
              text={quotes[mobileInsertAfter.indexOf(i)]}
              align={mobileInsertAfter.indexOf(i) % 2 === 0 ? "left" : "right"}
            />
          )}
        </div>
      ))}
    </div>
  );
}
