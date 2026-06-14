"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { EASE_LUXURY } from "@/lib/motion";
import {
  hasSeenPreloader,
  markPreloaderSeen,
  setPreloaderPending,
  setPreloaderReady,
} from "@/lib/preloader";

export default function Preloader() {
  const t = useTranslations("preloader");
  const messages = [t("m1"), t("m2"), t("m3"), t("m4")];
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [phase, setPhase] = useState<"logo" | "message" | "exit">("logo");

  // Determine visibility on first mount based on preloader state
  useEffect(() => {
    setMounted(true);

    if (hasSeenPreloader()) {
      setPreloaderReady();
      setVisible(false);
      
      // Hide static shell if it exists
      const staticShell = document.getElementById("preloader-static");
      if (staticShell) {
        staticShell.style.display = "none";
      }
      return;
    }

    setPreloaderPending();
    setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible) return;

    // Phase timeline:
    // 0-900ms: Logo phase (just logo)
    // 900-4200ms: Message phase (rotating messages)
    // 4200-5200ms: Exit phase (blur + fade out)
    // 5200ms: Done
    const msgTimer = setTimeout(() => setPhase("message"), 900);
    const cycle = setInterval(() => {
      setMessageIndex((i) => (i + 1) % messages.length);
    }, 2200);
    const exitTimer = setTimeout(() => setPhase("exit"), 4200);
    const hideTimer = setTimeout(() => {
      markPreloaderSeen();
      setPreloaderReady();
      setVisible(false);
      
      // Hide static shell after animation
      const staticShell = document.getElementById("preloader-static");
      if (staticShell) {
        staticShell.style.display = "none";
      }
    }, 5200);

    return () => {
      clearTimeout(msgTimer);
      clearTimeout(exitTimer);
      clearTimeout(hideTimer);
      clearInterval(cycle);
    };
  }, [visible, messages.length]);

  // Only render motion component after hydration
  if (!mounted) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: EASE_LUXURY }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-plum-mid overflow-hidden"
          aria-live="polite"
          aria-busy={phase !== "exit"}
        >
          {/* Background gradients */}
          <div className="absolute inset-0 pointer-events-none max-lg:[&_*]:!animate-none" aria-hidden>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-lav-700/30 blur-3xl max-lg:w-64 max-lg:h-64" />
            <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-gold-400/12 blur-3xl max-lg:w-48 max-lg:h-48" />
            <motion.div
              className="absolute inset-0 opacity-30 max-lg:hidden"
              style={{
                background:
                  "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(176,154,232,0.2) 0%, transparent 70%)",
              }}
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* Main content */}
          <motion.div
            initial={{ scale: 0.88, opacity: 0 }}
            animate={
              phase === "exit"
                ? { scale: 1.08, opacity: 0, filter: "blur(12px)" }
                : { scale: 1, opacity: 1, filter: "blur(0px)" }
            }
            transition={{ duration: 1, ease: EASE_LUXURY }}
            className="relative z-10 flex flex-col items-center text-center px-6 sm:px-8"
          >
            {/* Logo with bobbing animation */}
            <motion.div
              className="relative w-24 h-24 sm:w-28 sm:h-28 mb-8 sm:mb-10 max-lg:animate-none"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/finallogo.png"
                alt="The Pouma Academy"
                fill
                className="object-contain drop-shadow-[0_0_30px_rgba(176,154,232,0.55)]"
                sizes="112px"
                priority
              />
            </motion.div>

            {/* Brand text */}
            <motion.p
              className="font-display text-xs tracking-[0.35em] uppercase text-lav-300/80 mb-5 sm:mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              The Pouma Academy
            </motion.p>

            {/* Rotating message text - EFFECT #1 */}
            <div className="h-14 sm:h-16 flex items-center justify-center max-w-md px-2">
              <AnimatePresence mode="wait">
                {phase !== "logo" && (
                  <motion.p
                    key={messageIndex}
                    initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
                    transition={{ duration: 0.75, ease: EASE_LUXURY }}
                    className="font-display italic text-lg sm:text-xl md:text-2xl text-white/90 leading-snug"
                  >
                    {messages[messageIndex]}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Scanning gradient line - EFFECT #2 */}
            <motion.div
              className="mt-10 sm:mt-14 h-px w-28 sm:w-32 bg-gradient-to-r from-transparent via-lav-400/50 to-transparent overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <motion.div
                className="h-full w-1/2 bg-gradient-to-r from-transparent via-gold-400 to-transparent max-lg:hidden"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
