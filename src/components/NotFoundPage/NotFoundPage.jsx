import Image from "next/image";
import Link from "next/link";
import Icon from "../Icon/Icon";
import styles from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <section className={styles.page}>
      <div className={styles.inner}>
        <Image
          src="/not-found.jpg"
          alt=""
          width={256}
          height={256}
          className={styles.illustration}
        />

        <div className={styles.headings}>
          <h1 className={styles.title}>
            Page not <br className={styles.breakMobile} />
            found
          </h1>
          <p className={styles.subtitle}>
            The page you&apos;re looking for doesn&apos;t{" "}
            <br className={styles.breakMobile} />
            exist <br className={styles.breakTablet} />
            or has moved.
          </p>
        </div>

        <div className={styles.buttonWrap}>
          <Link href="/" className={styles.button}>
            Go to homepage
            <Icon name="icon-arrow-right-lg" className={styles.buttonArrow} />
          </Link>
        </div>

        <div className={styles.links}>
          <Link href="/courses" className={styles.link}>
            Browse Courses
          </Link>
          <span className={styles.link}>Help Center</span>
          <span className={styles.link}>Community Forum</span>
        </div>
      </div>
    </section>
  );
}
