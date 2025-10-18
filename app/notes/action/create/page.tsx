// app/notes/action/create/page.tsx
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";
import {
  HOME_PAGE,
  OG_DESCRIPTION,
  OG_IMAGE,
  SITE_NAME,
} from "@/config/metaData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${SITE_NAME} | Create new note`,
  description: OG_DESCRIPTION,
  openGraph: {
    title: `${SITE_NAME} | Create new note`,
    description:
      "Create, edit, and organize notes with NoteHUB — your personal hub for creativity and productivity.",
    url: `${HOME_PAGE}/notes/action/create`,
    siteName: SITE_NAME,
    images: [OG_IMAGE],
    type: "website",
  },
};

const CreateNote = async () => {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
};

export default CreateNote;
