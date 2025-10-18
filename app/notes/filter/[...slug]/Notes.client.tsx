"use client";

import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Toaster } from "react-hot-toast";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import css from "./NotesPage.module.css";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import Link from "next/link";

interface NotesProps {
  tag?: string;
}

export default function Notes({ tag }: NotesProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page, search, tag],
    queryFn: () => fetchNotes({ page, search, tag }),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 300);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearchChange={handleSearch} />
        {data && data.totalPages > 1 && (
          <Pagination
            pageCount={data.totalPages}
            currentPage={page}
            onPageChange={handlePageChange}
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
