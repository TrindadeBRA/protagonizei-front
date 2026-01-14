import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Protagonizei - Livro Interativo",
  description: "Explore o livro interativo personalizado",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function PlayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

