import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/blog', destination: '/blog/page/1', permanent: true },
    ]
  },
  output: 'export',
  images: {
    unoptimized: true,
    domains: ['tailwindcss.com', 'honeydew-cassowary-327775.hostingersite.com', 'cms.tiken.com.br'],
  },
  env: {
    GOOGLE_TRANSLATION_CONFIG: JSON.stringify({
      languages: [
        { title: "English", name: "en", flag: "🇺🇸" },
        { title: "Português", name: "pt", flag: "🇧🇷" },
        { title: "Spanish", name: "es", flag: "🇪🇸" },
      ],
      defaultLanguage: "pt",
    }),
  },
  /* config options here */
};

export default nextConfig;
