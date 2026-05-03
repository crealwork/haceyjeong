import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
import type { Locale } from "@/i18n/routing";
import ContactForm from "@/components/ContactForm";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://haceyjeong.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Contact Hacey — Vancouver Island REALTOR® | Hacey Jeong",
    description:
      "Reach Hacey Jeong, REALTOR® — Nanaimo, Parksville, Qualicum Beach, Ladysmith, Duncan, Victoria. Call 604-729-0317 or send a message. 한국어로도 편하게.",
    alternates: { canonical: `${BASE_URL}/${locale}/contact` },
    openGraph: {
      title: "Contact Hacey Jeong — Vancouver Island REALTOR®",
      description: "Reach Hacey Jeong, REALTOR® with Royal LePage Nanaimo Realty. Bilingual EN/KO.",
      url: `${BASE_URL}/${locale}/contact`,
      type: "website",
      images: [
        {
          url: "/images/editorial/ambient-footer.jpg",
          width: 1536,
          height: 1024,
          alt: "Late afternoon sun on a cedar deck rail, Vancouver Island.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Contact Hacey Jeong — Vancouver Island REALTOR®",
      description: "Reach Hacey Jeong, REALTOR® with Royal LePage Nanaimo Realty. Bilingual EN/KO.",
      images: ["/images/editorial/ambient-footer.jpg"],
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      {/* 01 — Full-bleed hero (vs Chloe pattern's pt-32 + eyebrow + headline). Shorter than home/about/playbook. */}
      <section className="relative h-[55vh] min-h-[420px] w-full overflow-hidden bg-[var(--color-ink)]">
        <Image
          src="/images/editorial/ambient-footer.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="container-wide relative h-full flex flex-col justify-end pb-12 md:pb-16">
          <p
            className="text-xs uppercase mb-4"
            style={{
              letterSpacing: "0.28em",
              color: "rgba(255,255,255,0.7)",
              fontWeight: 500,
            }}
          >
            Contact
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "clamp(36px, 5vw, 64px)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "#ffffff",
            }}
          >
            Let me help you settle in.
          </h1>
        </div>
      </section>

      {/* 02 — Contact lines as wide horizontal row (vs sidebar). 3 columns, hairline rules between. */}
      <section className="bg-white border-b border-[var(--color-line)] py-10 md:py-14">
        <div className="container-wide max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--color-line)]">
            <div className="py-6 md:py-0 md:px-8 text-center md:text-left">
              <div className="text-xs uppercase mb-2" style={{ letterSpacing: "0.18em", color: "var(--color-graphite)" }}>
                Cell
              </div>
              <a
                href="tel:+16047290317"
                className="block hover:text-[var(--color-accent-700)] transition-colors"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(22px, 2vw, 28px)",
                  color: "var(--color-ink)",
                }}
              >
                604-729-0317
              </a>
            </div>
            <div className="py-6 md:py-0 md:px-8 text-center md:text-left">
              <div className="text-xs uppercase mb-2" style={{ letterSpacing: "0.18em", color: "var(--color-graphite)" }}>
                Instagram
              </div>
              <a
                href="https://www.instagram.com/haceyjeong/"
                target="_blank"
                rel="noreferrer"
                className="block hover:text-[var(--color-accent-700)] transition-colors"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(22px, 2vw, 28px)",
                  color: "var(--color-ink)",
                }}
              >
                @haceyjeong
              </a>
            </div>
            <div className="py-6 md:py-0 md:px-8 text-center md:text-left">
              <div className="text-xs uppercase mb-2" style={{ letterSpacing: "0.18em", color: "var(--color-graphite)" }}>
                Brokerage
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(20px, 1.6vw, 24px)",
                  color: "var(--color-ink)",
                  lineHeight: 1.3,
                }}
              >
                Royal LePage Nanaimo
                <span className="block text-sm text-[var(--color-graphite)] font-sans mt-1">
                  BCFSA RE604910
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — Form, single full-width column (vs sidebar). Centered. */}
      <section className="bg-[var(--color-canvas)] py-20 md:py-28">
        <div className="container-wide max-w-2xl">
          <p
            className="mb-12 text-center"
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(20px, 2vw, 26px)",
              lineHeight: 1.45,
              color: "var(--color-graphite)",
            }}
          >
            Most replies within a few hours. For anything urgent, call or text directly.
            <br />
            <span style={{ color: "var(--color-accent-700)" }}>한국어로 편하게 연락하셔도 됩니다.</span>
          </p>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
