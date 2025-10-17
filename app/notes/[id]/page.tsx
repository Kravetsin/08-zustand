import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { getSingleNote } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";
import { HOME_PAGE, OG_IMAGE, SITE_NAME } from "@/config/metaData";
import { Metadata } from "next";

interface NoteDetailsProps {
  params: { id: string };
}

export async function generateMetadata({
  params,
}: NoteDetailsProps): Promise<Metadata> {
  const { id } = await params;
  const note = await getSingleNote(id);

  return {
    title: `${SITE_NAME} | ${note.title}`,
    description: note.content.slice(0, 30),
    openGraph: {
      title: `${SITE_NAME} | ${note.title}`,
      description: note.content.slice(0, 100),
      url: `${HOME_PAGE}/notes/${id}`,
      siteName: SITE_NAME,
      images: [OG_IMAGE],
      type: "article",
    },
  };
}

const NoteDetails = async ({ params }: NoteDetailsProps) => {
  const { id } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => getSingleNote(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
};

export default NoteDetails;
