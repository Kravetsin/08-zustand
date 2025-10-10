"use client";

import css from "./NotePreview.module.css";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getSingleNote } from "@/lib/api";
import Modal from "@/components/Modal/Modal";

export default function NotePreviewClient() {
  const { id } = useParams<{ id: string }>();
  const {
    data: note,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => getSingleNote(id),
    refetchOnMount: false,
  });
  const router = useRouter();
  const handleCloseModal = () => router.back();

  return (
    <div className={css.container}>
      <Modal onClose={handleCloseModal}>
        {note && (
          <div className={css.item}>
            <h2 className={css.header}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
            <div className={css.header}>
              <span className={css.tag}>{note.tag}</span>
              <p className={css.date}>{note.createdAt}</p>
            </div>
            <button className={css.backBtn} onClick={handleCloseModal}>
              {`< Back`}
            </button>
          </div>
        )}
        {isLoading && <p>Loading...</p>}
        {isError && <p>Ops something went wrong... {error.message}</p>}
      </Modal>
    </div>
  );
}
