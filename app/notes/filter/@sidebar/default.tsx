import css from "./SidebarNotes.module.css";
import { tagsList } from "@/types/note";
import Link from "next/link";

export default async function SidebarNotes() {
  return (
    <ul className={css.menuList}>
      {tagsList.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}
