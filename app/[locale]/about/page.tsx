import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";
import { JsonLd } from "@/components/JsonLd";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://haceyjeong.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "About Hacey Jeong — REALTOR® with Royal LePage Nanaimo Realty",
    description:
      "Bilingual REALTOR® serving Vancouver Island. Background in chemical engineering, global oil & gas, and small-business ownership — applied to real estate.",
    alternates: { canonical: `${BASE_URL}/${locale}/about` },
    openGraph: {
      title: "About Hacey Jeong — REALTOR® with Royal LePage Nanaimo Realty",
      description:
        "Vancouver Island REALTOR®. Korea-born, English-Korean bilingual, with a background that runs from chemical engineering to global oil & gas to entrepreneurship.",
      url: `${BASE_URL}/${locale}/about`,
      type: "profile",
      images: [
        {
          url: "/images/editorial/realtor-portrait-bw.jpg",
          width: 1024,
          height: 1024,
          alt: "Hacey Jeong, REALTOR® — portrait photograph",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "About Hacey Jeong — REALTOR® with Royal LePage Nanaimo Realty",
      description:
        "Vancouver Island REALTOR®. Korea-born, English-Korean bilingual, with a background that runs from chemical engineering to global oil & gas to entrepreneurship.",
      images: ["/images/editorial/realtor-portrait-bw.jpg"],
    },
  };
}

const personSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Hacey Jeong",
  jobTitle: "REALTOR®, Real Estate Consultant",
  worksFor: { "@type": "Organization", name: "Royal LePage Nanaimo Realty" },
  alumniOf: [{ "@type": "Organization", name: "Korea University" }],
  knowsLanguage: ["en", "ko"],
  url: `${BASE_URL}/en/about`,
  image: `${BASE_URL}/images/editorial/realtor-portrait-bw.jpg`,
  sameAs: ["https://www.instagram.com/haceyjeong/"],
});

const backgroundRows: { label: string; value: string }[] = [
  { label: "Brokerage", value: "Royal LePage Nanaimo Realty" },
  { label: "License", value: "BCFSA RE604910" },
  { label: "Education", value: "Korea University, Chemical Engineering" },
  { label: "Previous", value: "Global oil & gas · entrepreneurship" },
  { label: "Languages", value: "English · 한국어" },
  { label: "Service Area", value: "Vancouver Island, BC" },
];

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <>
      {/* 01 — Full-bleed portrait hero (Aritzia "Editor" / Evernew "About" pattern). */}
      <section className="relative h-[88vh] min-h-[640px] w-full overflow-hidden bg-[var(--color-ink)]">
        <Image
          src="/images/editorial/realtor-portrait-bw.jpg"
          alt="Hacey Jeong, portrait."
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "center 30%" }}
        />
        <div className="absolute inset-0 bg-black/15" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/65 via-black/25 to-transparent" />
        <div className="container-wide relative h-full flex flex-col justify-end pb-16 md:pb-24">
          <p
            className="text-xs uppercase mb-6"
            style={{
              letterSpacing: "0.28em",
              color: "rgba(255,255,255,0.7)",
              fontWeight: 500,
            }}
          >
            About
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "clamp(44px, 7vw, 96px)",
              lineHeight: 1.0,
              letterSpacing: "-0.015em",
              color: "#ffffff",
              maxWidth: "60ch",
            }}
          >
            Hacey Jeong
          </h1>
          <p
            className="mt-4 max-w-2xl"
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: "clamp(20px, 1.8vw, 26px)",
              lineHeight: 1.4,
              color: "rgba(255,255,255,0.92)",
            }}
          >
            REALTOR<sup>®</sup> · Royal LePage Nanaimo Realty
          </p>
        </div>
      </section>

      {/* 02 — Long-form essay. Single column, no DropCap, no PullQuote. Generous breathing room. */}
      <section className="bg-white py-24 md:py-36">
        <div className="container-wide max-w-2xl">
          <p
            className="mb-10"
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(22px, 2.2vw, 32px)",
              lineHeight: 1.4,
              color: "var(--color-accent-700)",
              letterSpacing: "-0.005em",
            }}
          >
            Bilingual REALTOR<sup>®</sup> serving Vancouver Island. Background in
            chemical engineering, global oil &amp; gas, and small-business ownership.
          </p>

          <p className="type-body-essay editorial-paragraph">
            Having travelled to over thirty countries and lived through the full
            relocation journey myself, I chose Vancouver Island as my home with
            clarity and intention. Originally from South Korea and a graduate of
            Korea University in Chemical Engineering, my career has taken me from
            the global oil &amp; gas industry into entrepreneurship, and now to real
            estate. Each chapter taught me how to read complex situations, ask the
            right questions, and stay calm when the stakes are high.
          </p>

          <p className="type-body-essay editorial-paragraph">
            Because I personally navigated immigration, housing, settlement, career
            transitions, and cultural adjustment, I understand what clients truly
            care about — finding the right community, making confident buying and
            selling decisions, and managing both the emotional and practical sides
            of a move. With a background in engineering, corporate strategy, and
            business ownership, I bring a blend of analytical thinking,
            organization, data-driven strategy, marketing, and calm problem-solving
            to every transaction.
          </p>

          <p className="type-body-essay editorial-paragraph text-[var(--color-graphite)]">
            한국어로 편하게 상담받고 싶으신 분들도 환영합니다.
          </p>
        </div>
      </section>

      {/* 03 — Inset image break (full-bleed strip). Cabin interior. */}
      <section className="relative w-full aspect-[16/7] md:aspect-[16/6] overflow-hidden bg-[var(--color-canvas)]">
        <Image
          src="/images/editorial/arch-break.jpg"
          alt="A warm corner of a Pacific Northwest cabin interior."
          fill
          sizes="100vw"
          className="object-cover"
        />
      </section>

      {/* 04 — Background as typography list (vs Chloe's <dl> with eyebrows). */}
      <section className="bg-[var(--color-canvas)] py-24 md:py-32 border-t border-[var(--color-line)]">
        <div className="container-wide max-w-3xl">
          <p
            className="text-xs uppercase mb-12 text-center"
            style={{
              letterSpacing: "0.28em",
              color: "var(--color-graphite)",
              fontWeight: 500,
            }}
          >
            Background
          </p>
          <ul>
            {backgroundRows.map((row, i) => (
              <li
                key={row.label}
                className={`grid grid-cols-[140px_1fr] gap-6 py-5 ${
                  i === 0 ? "border-y" : "border-b"
                } border-[var(--color-line)]`}
              >
                <span
                  className="text-xs uppercase"
                  style={{
                    letterSpacing: "0.18em",
                    color: "var(--color-graphite)",
                    paddingTop: "6px",
                  }}
                >
                  {row.label}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(20px, 1.6vw, 24px)",
                    color: "var(--color-ink)",
                    lineHeight: 1.4,
                  }}
                >
                  {row.value}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 05 — Full-bleed bottom CTA (mirror of homepage bottom). */}
      <section className="relative h-[60vh] min-h-[440px] w-full overflow-hidden bg-[var(--color-ink)]">
        <Image
          src="/images/editorial/ambient-footer.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="container-wide relative h-full flex flex-col justify-center items-center text-center text-white">
          <p
            className="mb-8 max-w-xl"
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(22px, 2.6vw, 32px)",
              lineHeight: 1.4,
              color: "#ffffff",
            }}
          >
            Have a question I should add to the playbook?
          </p>
          <Link
            href="/contact"
            className="inline-block text-sm font-medium border-b border-white pb-1 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
            style={{ letterSpacing: "0.18em", textTransform: "uppercase", color: "#ffffff" }}
          >
            Get in touch →
          </Link>
        </div>
      </section>

      <JsonLd schema={personSchema} />
    </>
  );
}
