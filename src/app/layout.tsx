import type { Metadata } from "next";
import {
  IBM_Plex_Mono,
  Instrument_Serif,
  Manrope,
  Space_Grotesk,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { GrainOverlay } from "@/components/layout/GrainOverlay";
import { Navigation } from "@/components/layout/Navigation";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Keerthanan PS — Cybersecurity Researcher & Systems Developer",
  description:
    "Monochrome portfolio of Keerthanan PS — cybersecurity researcher, systems developer, and security engineer. Independent research across malware analysis, reverse engineering, and operating systems.",
  openGraph: {
    title: "Keerthanan PS — Monochrome Digital Portfolio",
    description:
      "Cybersecurity researcher and systems developer exploring low-level programming, malware analysis, reverse engineering, and security engineering.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${manrope.variable} ${ibmPlexMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[var(--bg)] text-[var(--text)]">
        <GrainOverlay />
        <Navigation />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
