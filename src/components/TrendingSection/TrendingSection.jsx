import Link from "next/link";
import Icon from "../Icon/Icon";
import CourseCard from "../CourseCard/CourseCard";
import styles from "./TrendingSection.module.css";

async function getTrendingCourses() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/courses/trending`,
      { next: { revalidate: 300 } },
    );

    if (!res.ok) return [];

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export default async function TrendingSection() {
  const courses = await getTrendingCourses();

  if (courses.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headingBlock}>
            <h2 className={styles.heading}>Trending this week</h2>
            <p className={styles.subheading}>
              Courses our learners are loving right now.
            </p>
          </div>

          <Link href="/courses" className={styles.link}>
            See all courses
            <Icon name="icon-arrow-right" width={12} height={12} />
          </Link>
        </div>

        <div className={styles.grid}>
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>

        <Link href="/courses" className={styles.allButton}>
          See all courses
        </Link>
      </div>
    </section>
  );
}
