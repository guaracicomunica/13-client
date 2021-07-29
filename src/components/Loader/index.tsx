import styles from "./styles.module.css";

export function Loader() {
  return (
    <div className={`${styles.loader} mt-5 mt-md-0`}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}