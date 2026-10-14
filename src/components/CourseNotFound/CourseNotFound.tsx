import Link from "next/link";
import Icon from "../Icon/Icon";
import styles from "./CourseNotFound.module.css";

export default function CourseNotFound() {
  return (
    <section className={styles.page}>
      <div className={styles.frame}>
        <div className={styles.iconBlock}>
          <div className={styles.iconWrap}>
            <Icon name="icon-lock-large" className={styles.lockIcon} />
            <span className={styles.bar} />
          </div>
        </div>

        <h1 className={styles.title}>Course not found</h1>

        <p className={styles.text}>
          This course doesn&apos;t exist or has been{" "}
          <br className={styles.breakMobile} />
          removed. Try <br className={styles.breakDesktop} />
          browsing the full catalog.
        </p>

        <Link href="/courses" className={styles.button}>
          Browse courses
        </Link>
      </div>
    </section>
  );
}
