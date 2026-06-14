"use client";
import { useEffect, useLayoutEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_LUXURY } from "@/lib/motion";
import {
  hasSeenPreloader,
  markPreloaderSeen,
  setPreloaderPending,
  setPreloaderReady,
} from "@/lib/preloader";

export default function Preloader() {
  const [visible, setVisible] = useState(false);

  useLayoutEffect(() => {
    const staticShell = document.getElementById("preloader-static");
    if (staticShell) staticShell.remove();

    if (hasSeenPreloader()) {
      setPreloaderReady();
      setVisible(false);
      return;
    }

    setPreloaderPending();
    setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible) return;

    // Reveal the site after a brief half-second logo flash, then fade out.
    const hideTimer = setTimeout(() => {
      markPreloaderSeen();
      setPreloaderReady();
      setVisible(false);
    }, 520);

    return () => clearTimeout(hideTimer);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE_LUXURY }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-plum-mid"
          aria-hidden
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-lav-700/25 blur-3xl pointer-events-none" />

          <motion.div
            initial={{ scale: 0.95, opacity: 1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.45, ease: EASE_LUXURY }}
            className="relative w-24 h-24 sm:w-28 sm:h-28"
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
