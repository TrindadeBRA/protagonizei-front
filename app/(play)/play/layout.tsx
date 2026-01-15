import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Protagonizei - Livro Interativo",
  description: "Explore o livro interativo personalizado",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 0.5,
  maximumScale: 2,
  userScalable: false,
  viewportFit: 'cover',
};

export default function PlayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
      {children}
    </div>
  );
}

