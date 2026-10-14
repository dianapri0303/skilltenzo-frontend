import Image from "next/image";
import Link from "next/link";
import Icon from "../Icon/Icon";
import PurchasePanel from "../PurchasePanel/PurchasePanel";
import { formatHours, formatStudents } from "../../lib/format";
import type { CourseDetails as CourseDetailsData } from "../../types";
import styles from "./CourseDetails.module.css";

const features = [
  {
    icon: "icon-feature-lifetime",
    iconClass: "featureIconLifetime",
    boxClass: "featureBoxPrimary",
    lines: ["Lifetime access"],
  },
  {
    icon: "icon-feature-certificate",
    iconClass: "featureIconCertificate",
    boxClass: "featureBoxGreen",
    lines: ["Certificate of", "completion"],
  },
  {
    icon: "icon-feature-devices",
    iconClass: "featureIconDevices",
    boxClass: "featureBoxNeutral",
    lines: ["Watch on any", "device"],
  },
  {
    icon: "icon-feature-download",
    iconClass: "featureIconDownload",
    boxClass: "featureBoxGreen",
    lines: ["Downloadable", "resources"],
  },
];

interface CourseDetailsProps {
  course: CourseDetailsData;
}

export default function CourseDetails({ course }: CourseDetailsProps) {
  return (
    <section className={styles.page}>
      <nav className={styles.breadcrumbs}>
        <Link href="/" className={styles.crumb}>
          Home
        </Link>
        <Icon name="icon-crumb" className={styles.crumbArrow} />
        <Link href="/courses" className={styles.crumb}>
          Courses
        </Link>
        <Icon name="icon-crumb" className={styles.crumbArrow} />
        <Link
          href={`/courses?category=${course.category.slug}`}
          className={styles.crumb}
        >
          {course.category.name}
        </Link>
        <Icon name="icon-crumb" className={styles.crumbArrow} />
        <span className={styles.crumbCurrent}>{course.title}</span>
      </nav>

      <div className={styles.main}>
        <div className={styles.left}>
          <div className={styles.cover}>
            <Image
              src={course.coverImageUrl}
              alt={course.title}
              fill
              priority
              sizes="(min-width: 1440px) 600px, (min-width: 768px) 720px, 342px"
              className={styles.coverImage}
            />
          </div>

          <div className={styles.info}>
            <span className={styles.category}>{course.category.name}</span>
            <h1 className={styles.title}>{course.title}</h1>
            <p className={styles.description}>{course.shortDescription}</p>

            <div className={styles.instructorBlock}>
              <div className={styles.instructor}>
                <span className={styles.instructorAvatar}>
                  {course.instructor.avatarUrl ? (
                    <Image
                      src={course.instructor.avatarUrl}
                      alt={course.instructor.name}
                      fill
                      sizes="48px"
                      className={styles.instructorAvatarImage}
                    />
                  ) : null}
                </span>
                <span className={styles.instructorMeta}>
                  <span className={styles.instructorName}>
                    {course.instructor.name}
                  </span>
                  <span className={styles.instructorRole}>
                    {course.instructor.bio}
                  </span>
                </span>
              </div>

              <ul className={styles.facts}>
                <li className={styles.fact}>
                  <Icon name="icon-star-lg" className={styles.factStar} />
                  <span className={styles.factValue}>
                    {course.ratingAverage}
                  </span>
                </li>
                <li className={styles.fact}>
                  <Icon name="icon-clock-sm" className={styles.factIconClock} />
                  {formatHours(course.durationMinutes)}
                </li>
                <li className={styles.fact}>
                  <Icon name="icon-users-sm" className={styles.factIconUsers} />
                  {formatStudents(course.studentsCount)}
                </li>
                <li className={styles.fact}>
                  <Icon name="icon-globe" className={styles.factIconGlobe} />
                  {course.language}
                </li>
                <li className={styles.fact}>
                  <Icon name="icon-level" className={styles.factIconLevel} />
                  {course.level}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <PurchasePanel course={course} />
      </div>

      <div className={styles.features}>
        <ul className={styles.featuresInner}>
          {features.map((feature) => (
            <li key={feature.icon} className={styles.feature}>
              <span
                className={`${styles.featureBox} ${styles[feature.boxClass]}`}
              >
                <Icon
                  name={feature.icon}
                  className={styles[feature.iconClass]}
                />
              </span>
              <span className={styles.featureLabel}>
                {feature.lines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.about}>
        <h2 className={styles.aboutTitle}>About this course</h2>
        <h3 className={styles.learnTitle}>What you&apos;ll learn</h3>
        <ul className={styles.learnList}>
          {course.whatYoullLearn.map((item) => (
            <li key={item} className={styles.learnItem}>
              <Icon name="icon-check-list" className={styles.learnIcon} />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
