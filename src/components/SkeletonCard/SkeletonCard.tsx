import styles from "./SkeletonCard.module.css";

export default function SkeletonCard() {
  return (
    <article className={styles.card}>
      <div className={`${styles.cover} ${styles.pulse}`} />

      <div className={styles.body}>
        <span className={`${styles.lineTitle} ${styles.pulse}`} />
        <span className={`${styles.lineSubtitle} ${styles.pulse}`} />
        <span className={`${styles.lineMeta} ${styles.pulse}`} />
        <span className={`${styles.linePrice} ${styles.pulse}`} />
      </div>
    </article>
  );
}
