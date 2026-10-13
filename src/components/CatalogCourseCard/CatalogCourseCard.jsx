import Image from "next/image";
import Link from "next/link";
import Icon from "../Icon/Icon";
import { formatHours, formatStudents, formatPrice } from "../../lib/format";
import styles from "./CatalogCourseCard.module.css";

const badgeClassByLevel = {
  Beginner: "badgeBeginner",
  Intermediate: "badgeIntermediate",
  Advanced: "badgeAdvanced",
};

export default function CatalogCourseCard({
  course,
  status,
  isPending,
  onAddToCart,
}) {
  const badgeClass = badgeClassByLevel[course.level] || "badgeAdvanced";

  return (
    <article className={styles.card}>
      <Link href={`/courses/${course.slug}`} className={styles.cover}>
        <Image
          src={course.coverImageUrl}
          alt={course.title}
          fill
          sizes="(min-width: 1440px) 394px, (min-width: 768px) 348px, 342px"
          className={styles.coverImage}
        />
        <span className={`badge ${badgeClass} ${styles.badge}`}>
          {course.level}
        </span>
      </Link>

      <div className={styles.body}>
        <h3 className={styles.title}>
          <Link href={`/courses/${course.slug}`} className={styles.titleLink}>
            {course.title}
          </Link>
        </h3>

        <div className={styles.author}>
          <span className={styles.avatar}>
            {course.instructor.avatarUrl ? (
              <Image
                src={course.instructor.avatarUrl}
                alt={course.instructor.name}
                fill
                sizes="24px"
                className={styles.avatarImage}
              />
            ) : null}
          </span>
          <span className={styles.authorName}>{course.instructor.name}</span>
        </div>

        <div className={styles.rating}>
          <Icon name="icon-star-solid" className={styles.star} />
          <span className={styles.ratingValue}>{course.ratingAverage}</span>
        </div>

        <div className={styles.meta}>
          <div className={styles.metaInner}>
            <span className={styles.metaItem}>
              <Icon name="icon-clock" className={styles.metaIcon} />
              {formatHours(course.durationMinutes)}
            </span>
            <span className={styles.metaItem}>
              <Icon name="icon-users" className={styles.metaIconUsers} />
              {formatStudents(course.studentsCount)}
            </span>
          </div>
        </div>

        <div className={styles.footer}>
          <span className={styles.price}>{formatPrice(course.price)}</span>

          {status === "owned" && (
            <span className={styles.ownedPill}>Purchased</span>
          )}

          {status === "inCart" && (
            <span className={styles.inCartPill}>
              <Icon name="icon-in-cart" className={styles.pillIcon} />
              In cart
            </span>
          )}

          {status === "default" && (
            <button
              type="button"
              className={styles.cartButton}
              onClick={() => onAddToCart(course._id)}
              disabled={isPending}
            >
              Add to cart
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
