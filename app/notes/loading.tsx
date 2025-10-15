import css from "./loading.module.css";

export default function Loading() {
  return (
    <div className={css.backdrop}>
      <div className={css.spinner}></div>
    </div>
  );
}
