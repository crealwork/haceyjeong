import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://haceyjeong.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Hacey Jeong, REALTOR® — Notes from Vancouver Island",
    description:
      "Hacey Jeong, REALTOR® with Royal LePage Nanaimo Realty. Bilingual EN/KO. Helping buyers and sellers across Nanaimo, Parksville, Qualicum Beach, Ladysmith, Duncan, and Victoria.",
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
    },
    openGraph: {
      title: "Hacey Jeong, REALTOR® — Notes from Vancouver Island",
      description:
        "Buying, selling, and relocating across Vancouver Island, with quiet attention to every detail.",
      url: `${BASE_URL}/${locale}`,
      type: "website",
      images: [
        {
          url: "/images/editorial/hero-light.jpg",
          width: 1536,
          height: 1024,
          alt: "Soft morning light through Vancouver Island cedar.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Hacey Jeong, REALTOR® — Notes from Vancouver Island",
      description:
        "Buying, selling, and relocating across Vancouver Island, with quiet attention to every detail.",
      images: ["/images/editorial/hero-light.jpg"],
    },
  };
}

type Specialty = {
  num: string;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
};

const specialties: Specialty[] = [
  {
    num: "01",
    title: "First-time buyers",
    body: "Inspections, financing, strata documents, closing — at your pace, in plain language.",
    image: "/images/editorial/object-doorknob.jpg",
    imageAlt: "A house key on weathered cedar.",
  },
  {
    num: "02",
    title: "Resale homes",
    body: "Condos, townhomes, and detached listings across the whole island.",
    image: "/images/editorial/arch-break.jpg",
    imageAlt: "A warm corner of a Pacific Northwest cabin.",
  },
  {
    num: "03",
    title: "Investment property",
    body: "Rental yield, cycle positioning, and exit planning — practical, not promotional.",
    image: "/images/editorial/presale-detail-maquette.jpg",
    imageAlt: "Weathered cedar shingles on a Vancouver Island cabin.",
  },
  {
    num: "04",
    title: "Luxury & relocation",
    body: "Whether it's a luxury home or a full move-from-overseas, I handle it the same way: with quiet attention to every detail.",
    image: "/images/editorial/presale-detail-scaffolding.jpg",
    imageAlt: "Arbutus bark, peeling in warm rust ribbons.",
  },
  {
    num: "05",
    title: "Commercial properties & business sales",
    body: "Retail, restaurants, cafés, and business asset sales.",
    image: "/images/editorial/neighborhood-1.jpg",
    imageAlt: "A Vancouver Island streetscape.",
  },
];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const featuredTestimonial = (t.raw("testimonials.items") as {
    body: string;
    attribution: string;
    role: string;
  }[])[0];
  const areas = t.raw("territory.areas") as string[];

  return (
    <>
      {/* 01 — Full-bleed hero. Subtle full-image darkening + bottom gradient so text always reads. */}
      <section className="relative h-[92vh] min-h-[640px] w-full overflow-hidden bg-[var(--color-ink)]">
        <Image
          src="/images/editorial/hero-light.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* gentle full-image scrim + heavier bottom gradient — guarantees text contrast */}
        <div className="absolute inset-0 bg-black/15" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/65 via-black/30 to-transparent" />
        <div className="container-wide relative h-full flex flex-col justify-end pb-16 md:pb-24">
          <h1
            className="max-w-3xl"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "clamp(40px, 6vw, 76px)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              fontVariationSettings: '"opsz" 96',
              color: "#ffffff",
            }}
          >
            Hacey Jeong, REALTOR<sup className="text-[0.5em] align-super">®</sup>
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
            Notes from Vancouver Island.
          </p>
        </div>
      </section>

      {/* 02 — Intro line. Single sentence, big italic, centered, restrained. No "Editor's Note" eyebrow. */}
      <section className="bg-[var(--color-canvas)] py-24 md:py-36">
        <div className="container-wide max-w-3xl text-center">
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(24px, 3vw, 38px)",
              lineHeight: 1.35,
              letterSpacing: "-0.01em",
              color: "var(--color-ink)",
              fontVariationSettings: '"opsz" 60',
            }}
          >
            Thirty countries, three careers, and one quiet decision to call this island home.
          </p>
        </div>
      </section>

      {/* 03 — Wide split: portrait + short bio. No drop cap, no eyebrow. Aritzia "About the designer" feel. */}
      <section className="bg-white border-t border-[var(--color-line)]">
        <div className="container-wide grid md:grid-cols-[5fr_7fr] gap-0 md:gap-16 items-stretch">
          <div className="relative aspect-[4/5] md:aspect-auto md:min-h-[560px] bg-[var(--color-canvas)]">
            <Image
              src="/images/editorial/realtor-portrait-bw.jpg"
              alt="Hacey Jeong, portrait."
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
          <div className="px-6 py-16 md:px-0 md:py-24 max-w-xl">
            <p
              className="text-xs uppercase mb-6"
              style={{
                letterSpacing: "0.28em",
                color: "var(--color-graphite)",
                fontWeight: 500,
              }}
            >
              About
            </p>
            <p className="type-body-essay mb-6">
              Bilingual REALTOR<sup>®</sup> with Royal LePage Nanaimo Realty.
              Originally from South Korea, with a background that runs from chemical
              engineering to global oil &amp; gas to small-business ownership — now
              applied to real estate on Vancouver Island.
            </p>
            <p className="type-body-essay mb-10 text-[var(--color-graphite)]">
              Bilingual English &amp; 한국어. 한국어로 편하게 연락하셔도 됩니다.
            </p>
            <Link
              href="/about"
              className="inline-block text-sm font-medium border-b border-[var(--color-ink)] pb-1 hover:border-[var(--color-accent)] hover:text-[var(--color-accent-700)] transition-colors"
              style={{ letterSpacing: "0.06em" }}
            >
              Read the full story →
            </Link>
          </div>
        </div>
      </section>

      {/* 04 — Specialties as alternating image+text rows. 4 rows, no grid. Aritzia "Featured" pattern. */}
      <section className="bg-[var(--color-canvas)] border-t border-[var(--color-line)]">
        <div className="container-wide max-w-6xl py-16 md:py-24">
          <p
            className="text-xs uppercase text-center mb-16"
            style={{
              letterSpacing: "0.28em",
              color: "var(--color-graphite)",
              fontWeight: 500,
            }}
          >
            What I do
          </p>
          <div className="space-y-20 md:space-y-32">
            {specialties.map((s, i) => {
              const reverse = i % 2 === 1;
              return (
                <div
                  key={s.num}
                  className={`grid md:grid-cols-[6fr_5fr] gap-10 md:gap-16 items-center ${
                    reverse ? "md:[&>div:first-child]:order-2" : ""
                  }`}
                >
                  <div className="relative aspect-[4/3] md:aspect-[5/4]">
                    <Image
                      src={s.image}
                      alt={s.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div
                      className="mb-6 italic"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "44px",
                        color: "var(--color-accent-700)",
                        lineHeight: 1,
                        fontVariationSettings: '"opsz" 48',
                      }}
                    >
                      {s.num}
                    </div>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(26px, 2.4vw, 34px)",
                        lineHeight: 1.15,
                        letterSpacing: "-0.01em",
                        color: "var(--color-ink)",
                        marginBottom: "16px",
                        fontVariationSettings: '"opsz" 48',
                      }}
                    >
                      {s.title}
                    </h3>
                    <p className="type-body-essay max-w-md">{s.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 05 — Single big testimonial. Just ONE quote, big italic, centered. No 3-card grid. */}
      <section className="bg-white border-t border-[var(--color-line)] py-24 md:py-40">
        <div className="container-wide max-w-4xl text-center">
          <blockquote
            className="italic"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              fontSize: "clamp(28px, 3.6vw, 46px)",
              lineHeight: 1.35,
              letterSpacing: "-0.015em",
              color: "var(--color-ink)",
              fontVariationSettings: '"opsz" 72',
            }}
          >
            &ldquo;{featuredTestimonial.body}&rdquo;
          </blockquote>
          <div className="mt-10 text-sm" style={{ letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-graphite)" }}>
            {featuredTestimonial.attribution} · {featuredTestimonial.role}
          </div>
          <div className="mt-12">
            <a
              href="https://www.realtor.ca/agent/2204739/hacey-jeong-4200-island-highway-north-nanaimo-british-columbia-v9t1w6#RankMyAgent"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium border-b border-[var(--color-line)] pb-1 hover:border-[var(--color-ink)] transition-colors"
              style={{ letterSpacing: "0.18em", textTransform: "uppercase" }}
            >
              More from clients
            </a>
          </div>
        </div>
      </section>

      {/* 06 — Typography-only territory. Big city names stacked, hairline rules between. No image grid. */}
      <section className="bg-[var(--color-ink)] text-white border-t border-[var(--color-line)]">
        <div className="container-wide max-w-5xl py-20 md:py-28">
          <p
            className="text-xs uppercase mb-12 text-center"
            style={{
              letterSpacing: "0.28em",
              color: "rgba(255,255,255,0.6)",
              fontWeight: 500,
            }}
          >
            Where I work
          </p>
          <ul className="text-center">
            {areas.map((a, i) => (
              <li
                key={a}
                className={`py-6 ${
                  i === 0 ? "border-y" : "border-b"
                } border-white/15`}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 300,
                    fontSize: "clamp(28px, 4vw, 56px)",
                    letterSpacing: "-0.01em",
                    fontVariationSettings: '"opsz" 96',
                  }}
                >
                  {a}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 07 — Full-bleed bottom photo + simple CTA link. Mirrors hero structure. */}
      <section className="relative h-[80vh] min-h-[520px] w-full overflow-hidden bg-[var(--color-ink)]">
        <Image
          src="/images/editorial/presale-tower.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="container-wide relative h-full flex flex-col justify-center items-center text-center text-white">
          <p
            className="mb-8 max-w-xl"
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(24px, 3vw, 36px)",
              lineHeight: 1.35,
              fontVariationSettings: '"opsz" 60',
            }}
          >
            Looking at a specific listing or thinking about a move?
          </p>
          <Link
            href="/contact"
            className="inline-block text-sm font-medium border-b border-white pb-1 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
            style={{ letterSpacing: "0.18em", textTransform: "uppercase" }}
          >
            Start a conversation →
          </Link>
        </div>
      </section>
    </>
  );
}
