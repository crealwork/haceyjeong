"use client";

import { useState } from "react";

type FormData = {
  propertyType: string;
  neighborhood: string;
  beds: string;
  baths: string;
  sqft: string;
  yearBuilt: string;
  condition: string;
  reason: string;
  name: string;
  email: string;
  phone: string;
};

type Status = "idle" | "submitting" | "submitted" | "error";

export default function EstimatorForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(
      new FormData(e.currentTarget).entries(),
    ) as unknown as FormData;
    // Optimistic UI: show success immediately. Webhook fires in background.
    setStatus("submitted");
    fetch("/api/estimate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).catch((err) => console.error("estimate submit failed:", err));
  }

  if (status === "submitted") {
    return (
      <div className="bg-[var(--color-canvas)] p-10 md:p-16 text-center border-l-2 border-[var(--color-accent-500)]">
        <p
          className="text-xs uppercase mb-6"
          style={{ letterSpacing: "0.28em", color: "var(--color-graphite)", fontWeight: 500 }}
        >
          Got it
        </p>
        <p
          className="mb-6"
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(24px, 2.4vw, 32px)",
            lineHeight: 1.4,
            color: "var(--color-ink)",
          }}
        >
          Thanks — Hacey will personally review your property and email you within 24 hours with a refined value range and recent comparable sales.
        </p>
        <p className="text-sm text-[var(--color-graphite)]">
          Most replies arrive same-day. For anything urgent, call or text{" "}
          <a href="tel:+16047290317" className="hover:text-[var(--color-accent-700)] underline">
            604-729-0317
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-10">
      <fieldset className="space-y-6">
        <legend
          className="text-xs uppercase mb-4"
          style={{ letterSpacing: "0.28em", color: "var(--color-graphite)", fontWeight: 500 }}
        >
          About the property
        </legend>

        <Field label="Property type" required>
          <select name="propertyType" required defaultValue="" className="field-input">
            <option value="" disabled>Choose…</option>
            <option value="condo">Condo / Apartment</option>
            <option value="townhome">Townhome</option>
            <option value="detached">Detached / Single-family</option>
          </select>
        </Field>

        <Field label="Neighborhood" required>
          <select name="neighborhood" required defaultValue="" className="field-input">
            <option value="" disabled>Choose…</option>
            <option value="nanaimo">Nanaimo</option>
            <option value="parksville">Parksville</option>
            <option value="qualicum">Qualicum Beach</option>
            <option value="ladysmith">Ladysmith</option>
            <option value="duncan">Duncan / Cowichan</option>
            <option value="victoria">Victoria</option>
            <option value="other">Elsewhere on the Island</option>
          </select>
        </Field>

        <div className="grid sm:grid-cols-3 gap-6">
          <Field label="Bedrooms">
            <input name="beds" type="number" min={0} max={10} placeholder="2" className="field-input" />
          </Field>
          <Field label="Bathrooms">
            <input name="baths" type="number" step="0.5" min={1} max={10} placeholder="2" className="field-input" />
          </Field>
          <Field label="Square feet">
            <input name="sqft" type="number" min={300} max={20000} placeholder="850" className="field-input" />
          </Field>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <Field label="Year built">
            <input name="yearBuilt" type="number" min={1900} max={2030} placeholder="2010" className="field-input" />
          </Field>
          <Field label="Condition">
            <select name="condition" defaultValue="" className="field-input">
              <option value="">Not sure / skip</option>
              <option value="move-in-ready">Move-in ready</option>
              <option value="some-updates">Some updates needed</option>
              <option value="major-reno">Major renovation needed</option>
            </select>
          </Field>
        </div>

        <Field label="Why are you checking?">
          <select name="reason" defaultValue="curious" className="field-input">
            <option value="curious">Just curious</option>
            <option value="selling">Considering selling</option>
            <option value="buying-similar">Buying something similar</option>
            <option value="refinancing">Refinancing</option>
            <option value="other">Other</option>
          </select>
        </Field>
      </fieldset>

      <fieldset className="space-y-6 pt-8 border-t border-[var(--color-line)]">
        <legend
          className="text-xs uppercase mb-4"
          style={{ letterSpacing: "0.28em", color: "var(--color-graphite)", fontWeight: 500 }}
        >
          Where to send Hacey&rsquo;s reply
        </legend>
        <div className="grid sm:grid-cols-2 gap-6">
          <Field label="Your name" required>
            <input name="name" type="text" required className="field-input" />
          </Field>
          <Field label="Phone" required>
            <input name="phone" type="tel" required className="field-input" />
          </Field>
        </div>
        <Field label="Email" required>
          <input name="email" type="email" required className="field-input" />
        </Field>
      </fieldset>

      <div className="pt-4">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "submitting" ? "Sending…" : "Request a personal review"}
        </button>
        {status === "error" && (
          <p className="mt-4 text-red-700">
            Something went wrong sending your request. Please call or text 604-729-0317 directly.
          </p>
        )}
        <p className="mt-4 text-xs text-[var(--color-graphite)] max-w-md">
          Your details go to Hacey directly. No automated estimate, no newsletter, no third-party data sales — just a personal review by email within 24 hours.
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  required = false,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium mb-2 text-[var(--color-ink)]">
        {label}
        {required && <span className="text-[var(--color-accent-700)]"> *</span>}
      </span>
      {children}
    </label>
  );
}
