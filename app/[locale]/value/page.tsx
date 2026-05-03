import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
import type { Locale } from "@/i18n/routing";
import EstimatorForm from "@/components/EstimatorForm";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://haceyjeong.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Home Value Review — Vancouver Island | Hacey Jeong",
    description:
      "Personal home value review from Hacey Jeong, REALTOR®. Send a few details about your Vancouver Island property — Hacey emails you a refined value range within 24 hours. No automated estimate.",
    alternates: { canonical: `${BASE_URL}/${locale}/value` },
    openGraph: {
      title: "Home Value Review — Vancouver Island",
      description:
        "Personal home value review from Hacey Jeong, REALTOR® — emailed within 24 hours. No automated estimate.",
      url: `${BASE_URL}/${locale}/value`,
      type: "website",
      images: [
        {
          url: "/images/editorial/arch-break.jpg",
          width: 1536,
          height: 1024,
          alt: "A warm corner of a Pacific Northwest interior.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Home Value Review — Vancouver Island",
      description:
        "Personal review from Hacey Jeong, REALTOR® — emailed within 24 hours. No automated estimate.",
      images: ["/images/editorial/arch-break.jpg"],
    },
  };
}

export default async function ValuePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      {/* 01 — Full-bleed hero (vs Chloe pattern's pt-32 + eyebrow + headline). Short version. */}
      <section className="relative h-[55vh] min-h-[420px] w-full overflow-hidden bg-[var(--color-ink)]">
        <Image
          src="/images/editorial/arch-break.jpg"
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
            Home Value
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
            What&rsquo;s your home worth?
          </h1>
          <p
            className="mt-4 max-w-2xl"
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: "clamp(18px, 1.6vw, 22px)",
              lineHeight: 1.4,
              color: "rgba(255,255,255,0.9)",
            }}
          >
            Send a few details about your property — Hacey reviews it personally and emails you a refined value within 24 hours.
          </p>
        </div>
      </section>

      {/* 02 — Form, single full-width column on warm canvas (vs sidebar pattern). */}
      <section className="bg-[var(--color-canvas)] py-20 md:py-28">
        <div className="container-wide max-w-2xl">
          <EstimatorForm />
        </div>
      </section>
    </>
  );
}
