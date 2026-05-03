import { NextResponse } from "next/server";

// Manual-review-only home value pattern: no algorithmic estimate is computed
// or shown to the user. We capture lead details and forward to a Sheets/Brevo
// webhook so Hacey can personally review and reply within 24 hours.

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }

  const { name, email, propertyType, neighborhood } = body as Record<string, string>;
  if (!name || !email || !propertyType || !neighborhood) {
    return NextResponse.json({ error: "missing fields" }, { status: 400 });
  }

  const webhookUrl = process.env.ESTIMATE_SHEETS_WEBHOOK_URL ?? process.env.CONTACT_SHEETS_WEBHOOK_URL;
  const payload = {
    timestamp: new Date().toISOString(),
    source: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://haceyjeong.com"}/value`,
    formType: "value-review-request",
    ...body,
  };

  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error("estimate webhook failed:", err);
    }
  } else {
    console.log("estimate submission (no webhook configured):", payload);
  }

  return NextResponse.json({ ok: true });
}
