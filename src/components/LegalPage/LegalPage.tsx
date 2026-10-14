import styles from "./LegalPage.module.css";

interface LegalPageProps {
  title: string;
}

export default function LegalPage({ title }: LegalPageProps) {
  return (
    <section className={styles.page}>
      <h1 className={styles.title}>{title}</h1>
    </section>
  );
}
