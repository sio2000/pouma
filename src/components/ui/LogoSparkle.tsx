"use client";
import { motion } from "framer-motion";

type Spark = { top: string; left: string; size: number; delay: number; gap: number };

/** A few small star glints, placed around the logo and twinkling periodically. */
const SPARKS: Spark[] = [
  { top: "-8%", left: "60%", size: 13, delay: 0.6, gap: 3.6 },
  { top: "56%", left: "-6%", size: 9, delay: 2.4, gap: 4.4 },
  { top: "70%", left: "78%", size: 7, delay: 4.0, gap: 5.2 },
];

function Star({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0c.6 6.5 5.5 11.4 12 12-6.5.6-11.4 5.5-12 12-.6-6.5-5.5-11.4-12-12C6.5 11.4 11.4 6.5 12 0Z" />
    </svg>
  );
}

export default function LogoSparkle() {
  return (
    <span className="pointer-events-none absolute inset-0 z-10" aria-hidden>
      {SPARKS.map((s, i) => (
        <motion.span
          key={i}
          className="absolute text-gold-300 drop-shadow-[0_0_4px_rgba(245,179,53,0.65)]"
          style={{ top: s.top, left: s.left }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], rotate: [0, 35] }}
          transition={{
            duration: 1.3,
            repeat: Infinity,
            repeatDelay: s.gap,
            delay: s.delay,
            ease: "easeInOut",
          }}
        >
          <Star size={s.size} />
        </motion.span>
      ))}
    </span>
  );
}
