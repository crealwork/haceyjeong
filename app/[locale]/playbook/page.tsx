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
    title: "The Playbook — Buying and selling on Vancouver Island | Hacey Jeong",
    description:
      "An 8-point review for Vancouver Island buyers, sellers, and movers. Plain-language guidance from a bilingual REALTOR® with Royal LePage Nanaimo Realty.",
    alternates: { canonical: `${BASE_URL}/${locale}/playbook` },
    openGraph: {
      title: "The Playbook — Buying and selling on Vancouver Island",
      description: "An 8-point review for Vancouver Island buyers, sellers, and movers.",
      url: `${BASE_URL}/${locale}/playbook`,
      type: "article",
      images: [
        {
          url: "/images/editorial/presale-tower.jpg",
          width: 1536,
          height: 1024,
          alt: "Vancouver Island coastline at golden hour.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "The Playbook — Buying and selling on Vancouver Island",
      description: "An 8-point review for Vancouver Island buyers, sellers, and movers.",
      images: ["/images/editorial/presale-tower.jpg"],
    },
  };
}

export default async function PresalesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const items = t.raw("presalesPage.checklist.items") as { title: string; body: string }[];

  const faqSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.title,
      acceptedAnswer: { "@type": "Answer", text: it.body },
    })),
  });

  return (
    <>
      {/* 01 — Full-bleed hero (vs Chloe pattern's pt-32 + eyebrow + headline) */}
      <section className="relative h-[80vh] min-h-[560px] w-full overflow-hidden bg-[var(--color-ink)]">
        <Image
          src="/images/editorial/presale-tower.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
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
            The Playbook
          </p>
          <h1
            className="max-w-3xl"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "clamp(40px, 6vw, 76px)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "#ffffff",
            }}
          >
            Buying and selling on the Island.
          </h1>
          <p
            className="mt-4 max-w-xl"
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(18px, 1.6vw, 22px)",
              lineHeight: 1.4,
              color: "rgba(255,255,255,0.92)",
            }}
          >
            A working notebook for Vancouver Island buyers, sellers, and movers.
          </p>
        </div>
      </section>

      {/* 02 — Big intro statement (single big italic). No DropCap. No 4-up image collage. */}
      <section className="bg-[var(--color-canvas)] py-24 md:py-36">
        <div className="container-wide max-w-3xl text-center">
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(22px, 2.4vw, 32px)",
              lineHeight: 1.4,
              color: "var(--color-ink)",
              letterSpacing: "-0.005em",
            }}
          >
            Vancouver Island runs on its own rhythm. Inventory is tighter than the
            mainland, the buyer pool changes by season, and the same neighbourhood
            can feel very different depending on whether you&rsquo;re commuting to
            the harbour, raising kids near a beach, or retiring near a vineyard.
          </p>
          <p className="type-body-essay max-w-2xl mx-auto mt-10">
            Below is the working set of questions I walk every client through —
            first-time buyer, relocation, or seller.
          </p>
        </div>
      </section>

      {/* 03 — 8-point review as alternating image+text rows (vs Chloe 2x4 grid). */}
      <section className="bg-white border-t border-[var(--color-line)]">
        <div className="container-wide max-w-6xl py-16 md:py-24">
          <p
            className="text-xs uppercase text-center mb-16"
            style={{
              letterSpacing: "0.28em",
              color: "var(--color-graphite)",
              fontWeight: 500,
            }}
          >
            The 8-point review
          </p>
          <ol className="space-y-12 md:space-y-16">
            {items.map((it, i) => (
              <li
                key={it.title}
                className="grid grid-cols-[60px_1fr] md:grid-cols-[100px_1fr] gap-6 md:gap-12 items-start border-t border-[var(--color-line)] pt-12 md:pt-16"
              >
                <span
                  className="italic"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 400,
                    fontSize: "clamp(36px, 4vw, 56px)",
                    color: "var(--color-accent-700)",
                    lineHeight: 1,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 500,
                      fontSize: "clamp(24px, 2.2vw, 30px)",
                      lineHeight: 1.2,
                      color: "var(--color-ink)",
                      marginBottom: "12px",
                    }}
                  >
                    {it.title}
                  </h3>
                  <p className="type-body-essay max-w-2xl">{it.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 04 — Image-only break (full-bleed). Replaces FigureWithCaption pattern. */}
      <section className="relative w-full aspect-[16/7] md:aspect-[16/6] overflow-hidden bg-[var(--color-canvas)]">
        <Image
          src="/images/editorial/object-doorknob.jpg"
          alt="A house key on weathered cedar."
          fill
          sizes="100vw"
          className="object-cover"
        />
      </section>

      {/* 05 — Method (centered statement, not section header + body). */}
      <section className="bg-[var(--color-canvas)] py-24 md:py-32 border-t border-[var(--color-line)]">
        <div className="container-wide max-w-3xl text-center">
          <p
            className="text-xs uppercase mb-8"
            style={{
              letterSpacing: "0.28em",
              color: "var(--color-graphite)",
              fontWeight: 500,
            }}
          >
            On method
          </p>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(22px, 2.2vw, 28px)",
              lineHeight: 1.5,
              color: "var(--color-ink)",
            }}
          >
            I don&rsquo;t push, I read carefully and write back honestly. If a
            property isn&rsquo;t right for you, I&rsquo;ll say so — even if that
            means waiting a few months for the right one. The brokerage compensation
            comes from the transaction; the trust comes from being straight with
            you.
          </p>
        </div>
      </section>

      {/* 06 — Full-bleed bottom CTA (mirror of homepage). */}
      <section className="relative h-[60vh] min-h-[440px] w-full overflow-hidden bg-[var(--color-ink)]">
        <Image
          src="/images/editorial/arch-break.jpg"
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
            Looking at a specific listing? Let&rsquo;s review it together.
          </p>
          <Link
            href="/contact"
            className="inline-block text-sm font-medium border-b border-white pb-1 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
            style={{ letterSpacing: "0.18em", textTransform: "uppercase", color: "#ffffff" }}
          >
            Send the listing →
          </Link>
        </div>
      </section>

      <JsonLd schema={faqSchema} />
    </>
  );
}
