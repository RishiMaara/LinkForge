import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://linkforge.app",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1
    },
    {
      url: "https://linkforge.app/pricing",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8
    },
    {
      url: "https://linkforge.app/showcase",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5
    }
  ];
}
