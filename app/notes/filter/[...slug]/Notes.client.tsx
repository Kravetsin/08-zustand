"use client";

import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { Toaster } from "react-hot-toast";
import { useFetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import css from "./NotesPage.module.css";

import Link from "next/link";

interface NotesProps {
  tag?: string;
}

export default function Notes({ tag }: NotesProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [rawSearch, setRawSearch] = useState("");
  const [debouncedSearch] = useDebounce(rawSearch, 300);

  const { data, isLoading, isError } = useFetchNotes(
    currentPage,
    debouncedSearch,
    tag
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={(e) => setRawSearch(e.target.value)} />
        {data?.totalPages && data.totalPages > 1 && (
          <Pagination
            pageCount={data.totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <Link href={"/notes/action/create"} className={css.button}>
          Create note +
        </Link>
      </header>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading notes</p>}

      {data?.notes?.length ? (
        <NoteList notes={data.notes} />
      ) : (
        <p>No notes found</p>
      )}

      <Toaster />
    </div>
  );
}
