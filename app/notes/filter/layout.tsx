import css from "./Layout.module.css";

interface Props {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

const NotesLayout = ({ children, sidebar }: Props) => {
  return (
    <section className={css.section}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <div className={css.notesWrapper}>{children}</div>
    </section>
  );
};

export default NotesLayout;
