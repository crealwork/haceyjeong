import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-[var(--color-line)]">
      <div className="container-wide py-20 md:py-28 text-center">
        <span
          className="block text-3xl md:text-4xl font-normal leading-none mb-6"
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontWeight: 300,
            color: "var(--color-ink)",
            letterSpacing: "-0.01em",
            fontVariationSettings: '"opsz" 96',
          }}
        >
          Hacey Jeong
        </span>
        <p
          className="text-sm text-[var(--color-graphite)] mb-12 max-w-md mx-auto"
        >
          {t("footer.tagline")}
        </p>

        {/* Inline horizontal nav — no 3-column block */}
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-12 text-xs uppercase">
          <Link href="/about" className="text-[var(--color-charcoal)] hover:text-[var(--color-accent-700)]" style={{ letterSpacing: "0.18em" }}>
            {t("nav.about")}
          </Link>
          <Link href="/playbook" className="text-[var(--color-charcoal)] hover:text-[var(--color-accent-700)]" style={{ letterSpacing: "0.18em" }}>
            {t("nav.presales")}
          </Link>
          <Link href="/value" className="text-[var(--color-charcoal)] hover:text-[var(--color-accent-700)]" style={{ letterSpacing: "0.18em" }}>
            {t("nav.value")}
          </Link>
          <Link href="/contact" className="text-[var(--color-charcoal)] hover:text-[var(--color-accent-700)]" style={{ letterSpacing: "0.18em" }}>
            {t("nav.contact")}
          </Link>
        </nav>

        {/* Single contact line */}
        <div className="text-sm text-[var(--color-graphite)] space-x-4 mb-3">
          <a href="tel:+16047290317" className="hover:text-[var(--color-ink)]">
            604-729-0317
          </a>
          <span aria-hidden>·</span>
          <a
            href="https://www.instagram.com/haceyjeong/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[var(--color-ink)]"
          >
            @haceyjeong
          </a>
          <span aria-hidden>·</span>
          <span>Royal LePage Nanaimo Realty</span>
        </div>

        {/* Compliance + © */}
        <div className="text-xs text-[var(--color-graphite)] pt-8 border-t border-[var(--color-line)] mt-12 max-w-md mx-auto">
          © {year} Hacey Jeong, REALTOR<sup>®</sup> · BCFSA RE604910 · {t("footer.rights")}
        </div>

        {/* Built with Sundayable */}
        <div className="mt-6 text-[11px] text-[var(--color-graphite)]/80 max-w-md mx-auto">
          Built with{" "}
          <a
            href="https://sundayable.com"
            target="_blank"
            rel="noreferrer"
            className="text-[var(--color-charcoal)] hover:text-[var(--color-accent-700)] underline-offset-2 hover:underline transition-colors"
          >
            Sundayable
          </a>
        </div>
      </div>
    </footer>
  );
}
