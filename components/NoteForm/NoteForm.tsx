"use client";

import css from "./NoteForm.module.css";
import { createNote, NewNoteData } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tagsList } from "@/types/note";
import { useRouter } from "next/navigation";

import { useNoteDraftStore } from "@/lib/store/noteStore";

export type NoteFormValues = {
  title: string;
  content: string;
  tag: "Work" | "Personal" | "Todo" | "Meeting" | "Shopping";
};

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

  const handleCancel = () => router.push("/notes/filter/All");

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft();
      router.push("/notes/filter/All");
    },
  });

  const handleSubmit = (formData: FormData) => {
    const values = Object.fromEntries(formData) as NewNoteData;
    mutation.mutate(values);
  };

  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          defaultValue={draft?.title}
          type="text"
          name="title"
          className={css.input}
          onChange={handleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          defaultValue={draft?.content}
          name="content"
          rows={8}
          className={css.textarea}
          onChange={handleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>

        <select
          id="tag"
          name="tag"
          defaultValue={draft?.tag}
          className={css.select}
          onChange={handleChange}
        >
          {tagsList.map(
            (tag) =>
              tag !== "All" && (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              )
          )}
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={mutation.isPending}
        >
          Create note
        </button>
      </div>
    </form>
  );
}
