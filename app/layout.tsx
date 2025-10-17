import type { Metadata } from "next";
import "./globals.css";
import "modern-normalize";
import { Roboto } from "next/font/google";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import {
  HOME_PAGE,
  OG_IMAGE,
  OG_DESCRIPTION,
  SITE_NAME,
} from "@/config/metaData";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export const metadata: Metadata = {
  title: SITE_NAME,
  description: OG_DESCRIPTION,
  openGraph: {
    title: "NoteHUB — Capture Ideas, Organize Thoughts",
    description:
      "Create, edit, and organize notes with NoteHUB — your personal hub for creativity and productivity.",
    url: HOME_PAGE,
    siteName: SITE_NAME,
    images: [OG_IMAGE],
    type: "website",
  },
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable} suppressHydrationWarning>
        <TanStackProvider>
          <Header />
          {children}
          {modal}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
