"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { Link, usePathname } from "@/i18n/routing";
import LangToggle from "./LangToggle";

const navItems = [
  { key: "home", href: "/" },
  { key: "presales", href: "/playbook" },
  { key: "value", href: "/value" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;

export default function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // All pages now open with full-bleed dark hero — use white text whenever
  // not yet scrolled past the hero. Once scrolled, header gets white background
  // and reverts to dark text.
  const overDarkHero = !scrolled;

  const brandColor = overDarkHero ? "#ffffff" : "var(--color-ink)";
  const navTextColor = overDarkHero ? "rgba(255,255,255,0.9)" : "var(--color-charcoal)";
  const navHoverColor = overDarkHero ? "#ffffff" : "var(--color-accent-700)";
  const hamburgerColor = overDarkHero ? "#ffffff" : "var(--color-ink)";

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm border-b border-[var(--color-line)]"
          : "bg-transparent"
      }`}
    >
      <div className="container-wide flex items-center justify-between h-20">
        <Link
          href="/"
          aria-label="Hacey Jeong, REALTOR"
          className="flex items-center"
        >
          <span
            className="text-lg md:text-xl font-normal leading-none transition-colors"
            style={{
              fontFamily: "var(--font-display)",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              color: brandColor,
            }}
          >
            Hacey&nbsp;Jeong
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {navItems
            .filter((item) => item.key !== "home")
            .map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className="text-xs font-medium uppercase transition-colors"
                  style={{
                    letterSpacing: "0.18em",
                    color: isActive
                      ? overDarkHero
                        ? "#ffffff"
                        : "var(--color-ink)"
                      : navTextColor,
                    borderBottom: isActive ? `1px solid ${overDarkHero ? "#ffffff" : "var(--color-ink)"}` : "none",
                    paddingBottom: isActive ? "4px" : "0",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = navHoverColor;
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = navTextColor;
                  }}
                >
                  {t(item.key)}
                </Link>
              );
            })}
          <LangToggle />
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden flex flex-col gap-1.5 p-2 -mr-2"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span
            className={`block w-5 h-px transition-transform ${
              open ? "translate-y-[6px] rotate-45" : ""
            }`}
            style={{ background: hamburgerColor }}
          />
          <span
            className={`block w-5 h-px transition-opacity ${
              open ? "opacity-0" : ""
            }`}
            style={{ background: hamburgerColor }}
          />
          <span
            className={`block w-5 h-px transition-transform ${
              open ? "-translate-y-[6px] -rotate-45" : ""
            }`}
            style={{ background: hamburgerColor }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden bg-white border-t border-[var(--color-line)]">
          <div className="container-wide py-6 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="text-lg font-medium text-[var(--color-ink)] py-2"
              >
                {t(item.key)}
              </Link>
            ))}
            <div className="pt-2 border-t border-[var(--color-line)]">
              <LangToggle />
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
