import Link from "next/link";
import Image from "next/image";
import Icon from "../Icon/Icon";
import {
  formatHours,
  formatPrice,
  formatStudents,
  getStarIcons,
} from "../../lib/format";
import type { Course } from "../../types";
import styles from "./CourseCard.module.css";

const badgeClassByLevel: Record<string, string> = {
  Beginner: "badgeBeginner",
  Intermediate: "badgeIntermediate",
};

interface CourseCardProps {
  course: Course;
  variant?: "home" | "catalog";
}

export default function CourseCard({
  course,
  variant = "home",
}: CourseCardProps) {
  const badgeClass = badgeClassByLevel[course.level] || "badgeAdvanced";
  const starIcons = getStarIcons(course.ratingAverage);

  return (
    <article
      className={`${styles.card} ${
        variant === "catalog" ? styles.cardCatalog : ""
      }`}
    >
      <div className={styles.cover}>
        <Image
          src={course.coverImageUrl}
          alt={course.title}
          fill
          sizes="(min-width: 1440px) 394px, (min-width: 768px) 348px, 342px"
          className={styles.coverImage}
        />
        <span className={`${styles.badge} ${styles[badgeClass]}`}>
          {course.level}
        </span>
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{course.title}</h3>

        <div className={styles.author}>
          <Image
            src={course.instructor.avatarUrl}
            alt=""
            width={32}
            height={32}
            className={styles.avatar}
          />
          <span className={styles.authorName}>By {course.instructor.name}</span>
        </div>

        <div className={styles.rating}>
          <span className={styles.stars}>
            {starIcons.map((icon, index) => (
              <Icon key={index} name={icon} width={15} height={15} />
            ))}
          </span>
          <span className={styles.ratingValue}>{course.ratingAverage}</span>
        </div>

        <div className={styles.meta}>
          <span className={styles.metaItem}>
            <Icon name="icon-clock" width={15} height={15} />
            {formatHours(course.durationMinutes)}
          </span>
          <span className={styles.metaItem}>
            <Icon name="icon-users" width={17} height={12} />
            {formatStudents(course.studentsCount)}
          </span>
        </div>

        <div className={styles.footer}>
          <span className={styles.price}>{formatPrice(course.price)}</span>
          <Link
            href={`/course/${course.slug}`}
            className={styles.detailsButton}
          >
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}
