import Link from "next/link";
import Image from "next/image";
import Icon from "../Icon/Icon";
import styles from "./HeroSection.module.css";

const stars = [
  "icon-star",
  "icon-star",
  "icon-star",
  "icon-star",
  "icon-star-half",
];

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <span className={styles.blur} />

      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.badge}>
            <Icon name="icon-badge-check" width={17} height={16} />
            Practice-based learning
          </p>

          <h1 className={styles.title}>
            Skills you <span className={styles.accentOrange}>actually</span>{" "}
            <br className={styles.br1} />
            need. <br className={styles.br2} />
            From people <br className={styles.br3} />
            who <br className={styles.br4} />
            <span className={styles.accentGreen}>actually</span> do.
          </h1>

          <p className={styles.description}>
            Short, practical courses taught by working professionals.{" "}
            <br className={styles.brDesc} />
            Learn niche skills you won&apos;t find on mass platforms.
          </p>

          <div className={styles.actions}>
            <Link href="/courses" className={styles.ctaButton}>
              Browse courses
            </Link>

            <div className={styles.rating}>
              <span className={styles.stars}>
                {stars.map((star, index) => (
                  <Icon key={index} name={star} width={20} height={19} />
                ))}
              </span>
              <span className={styles.ratingCaption}>
                Rated 4.8 by 12,000+ learners
              </span>
            </div>
          </div>
        </div>

        <div className={styles.imageWrapper}>
          <Image
            src="/hero-illustration.png"
            alt="Online learning"
            width={592}
            height={444}
            priority
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
}
