import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/area-do-cliente", "/api/", "/proposta/"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
