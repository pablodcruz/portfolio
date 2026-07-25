import type { Metadata } from "next";
import "./globals.css";

const portfolioUrl = new URL("https://pablodcruz.github.io/portfolio/");
const socialImage = new URL("og.png", portfolioUrl).toString();

export const metadata: Metadata = {
  metadataBase: portfolioUrl,
  title: "Pablo De La Cruz | AI systems, data & developer education",
  description:
    "Selected work from Pablo De La Cruz across AI systems, data engineering, developer tooling, and technical education.",
  openGraph: {
    title: "Pablo De La Cruz — Build · Teach · Operate",
    description:
      "AI systems, data engineering, developer tooling, and technical education.",
    type: "website",
    url: portfolioUrl,
    images: [{ url: socialImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pablo De La Cruz — Build · Teach · Operate",
    description:
      "AI systems, data engineering, developer tooling, and technical education.",
    images: [socialImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
