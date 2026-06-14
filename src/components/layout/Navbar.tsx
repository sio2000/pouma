"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import PremiumButton from "@/components/ui/PremiumButton";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import LogoSparkle from "@/components/ui/LogoSparkle";
import { X } from "lucide-react";
import { EASE_LUXURY } from "@/lib/motion";

export default function Navbar() {
  const t = useTranslations("nav");
  const brand = useTranslations("brand");
  const locale = useLocale();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 1]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const links = [
    { href: "/", label: t("home") },
    { href: "/programs", label: t("programs") },
    { href: "/about", label: t("about") },
    { href: "/resources", label: t("resources") },
    { href: "/contact", label: t("contact") },
  ];

  const lp = (href: string) => `/${locale}${href === "/" ? "" : href}`;

  const isActive = (href: string) => {
    const full = lp(href);
    if (href === "/")
      return pathname === `/${locale}` || pathname === `/${locale}/`;
    return pathname.startsWith(full);
  };

  const isHome =
    pathname === `/${locale}` || pathname === `/${locale}/`;

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isHome) {
      e.preventDefault();
      document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  return (
    <>
      <motion.div
        style={{ opacity: bgOpacity }}
        className="fixed top-0 left-0 right-0 z-40 h-[4.5rem] pointer-events-none"
        aria-hidden
      >
        <div className="h-full glass" />
      </motion.div>
      <motion.div
        style={{ opacity: borderOpacity }}
        className="fixed top-[4.5rem] left-0 right-0 z-40 h-px bg-gradient-to-r from-transparent via-lav-300/40 to-transparent pointer-events-none"
        aria-hidden
      />

      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE_LUXURY }}
        className="fixed top-0 left-0 right-0 z-50 h-[4.5rem]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-full flex items-center justify-between">
          <Link href={lp("/")} onClick={handleLogoClick} className="flex items-center gap-2 sm:gap-3 group min-w-0 flex-1 sm:flex-initial sm:flex-shrink-0 max-w-[calc(100%-3.25rem)]">
            <motion.div
              whileHover={{ scale: 1.05, rotate: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="relative w-[3.75rem] h-[3.75rem] sm:w-[4.25rem] sm:h-[4.25rem] flex-shrink-0"
            >
              <Image
                src="/finallogo.png"
                alt="The Pouma Academy"
                fill
                className="object-contain"
                sizes="(max-width: 640px) 60px, 68px"
                priority
              />
              <LogoSparkle />
            </motion.div>
            <div className="block leading-tight min-w-0">
              <span className="font-display text-[15px] sm:text-base md:text-lg font-semibold text-lav-600 tracking-wide block leading-snug">
                {brand("name")}
              </span>
              <span className="font-script text-[13px] sm:text-sm text-plum block leading-tight mt-0.5 sm:mt-1 pl-0.5 whitespace-normal">
                {brand("tagline")}
              </span>
            </div>
          </Link>

          <nav
            className="hidden lg:flex items-center gap-0.5"
            onMouseLeave={() => setHovered(null)}
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={lp(link.href)}
                onMouseEnter={() => setHovered(link.href)}
                className={cn(
                  "relative px-4 py-2.5 text-sm font-medium tracking-wide rounded-xl transition-colors duration-300",
                  isActive(link.href) ? "text-lav-600" : "text-plum/45 hover:text-plum"
                )}
              >
                {hovered === link.href && (
                  <motion.span
                    layoutId="nav-hover-pill"
                    className="absolute inset-0 bg-lav-50/90 rounded-xl border border-lav-100"
                    transition={{ type: "spring", stiffness: 450, damping: 34 }}
                  />
                )}
                {isActive(link.href) && (
                  <motion.span
                    layoutId="nav-active-dot"
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-lav-500"
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-5">
            <LanguageSwitcher />
            <PremiumButton href={lp("/contact")} variant="primary" size="md">
              {t("bookSession")}
            </PremiumButton>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden relative w-11 h-11 min-w-11 min-h-11 flex flex-col items-center justify-center gap-1.5 cursor-pointer rounded-xl hover:bg-lav-50/80 active:bg-lav-100/80 transition-colors touch-manipulation"
            aria-label="Toggle menu"
            style={{ zIndex: 60 }}
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: EASE_LUXURY }}
              className="w-5 h-[1.5px] bg-plum block origin-center"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              className="w-4 h-[1.5px] bg-plum block self-end"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: EASE_LUXURY }}
              className="w-5 h-[1.5px] bg-plum block origin-center"
            />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at calc(100% - 52px) 36px)" }}
            animate={{ opacity: 1, clipPath: "circle(160% at calc(100% - 52px) 36px)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at calc(100% - 52px) 36px)" }}
            transition={{ duration: 0.55, ease: EASE_LUXURY }}
            className="fixed inset-0 lg:hidden flex flex-col bg-plum-mid"
            style={{ zIndex: 55 }}
          >
            <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-lav-700/20 blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 left-0 w-64 h-64 rounded-full bg-gold-400/8 blur-3xl pointer-events-none" />

            <div className="flex flex-col h-full px-6 sm:px-8 pt-6 pb-10">
              <div className="flex items-center justify-end mb-6">
                <motion.button
                  type="button"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25, delay: 0.05 }}
                  onClick={() => setMenuOpen(false)}
                  className="w-12 h-12 flex items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20 hover:border-white/35 active:scale-95 transition-all cursor-pointer"
                  aria-label="Κλείσιμο μενού"
                >
                  <X className="w-6 h-6" strokeWidth={2} aria-hidden />
                </motion.button>
              </div>

              <nav className="flex flex-col gap-0 flex-1">
                {links.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -32 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -32 }}
                    transition={{ duration: 0.45, delay: i * 0.05, ease: EASE_LUXURY }}
                  >
                    <Link
                      href={lp(link.href)}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        "block font-display py-4 transition-colors",
                        "text-[clamp(2.5rem,9vw,3.75rem)] leading-[1.05] tracking-tight",
                        isActive(link.href)
                          ? "text-gold-300"
                          : "text-white/70 hover:text-white"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col gap-6 border-t border-white/10 pt-8 mt-2"
              >
                <LanguageSwitcher variant="mobile" />
                <Link
                  href={lp("/contact")}
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-center py-4 rounded-2xl bg-lav-600 text-white font-semibold text-sm shadow-glow active:scale-[0.98] transition-transform"
                >
                  {t("bookSession")}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
