import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://haceyjeong.com";
  const lastModified = new Date();
  const routes = ["", "/about", "/playbook", "/value", "/contact"];
  return routes.map((route) => ({
    url: `${base}/en${route}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));
}
