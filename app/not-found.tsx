import { Metadata } from "next";
import { HOME_PAGE, OG_IMAGE, SITE_NAME } from "@/config/metaData";

export const metadata: Metadata = {
  title: `Page Not Found | ${SITE_NAME}`,
  description:
    "The page you're looking for doesn`t exist. Return to NoteHUB and keep creating and organizing your notes seamlessly.",
  openGraph: {
    title: `Page Not Found | ${SITE_NAME}`,
    description:
      "This page could not be found. Go back to NoteHUB to continue capturing and organizing your ideas.",
    url: `${HOME_PAGE}/404`,
    siteName: SITE_NAME,
    images: [OG_IMAGE],
    type: "website",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <>
      <h1>404 - Page not found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
    </>
  );
}
