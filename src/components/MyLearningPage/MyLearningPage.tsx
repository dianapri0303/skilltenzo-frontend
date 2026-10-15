"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Icon from "../Icon/Icon";
import SkeletonGrid from "../SkeletonCard/SkeletonGrid";
import instance from "../../lib/axios";
import { formatCompletedDate } from "../../lib/format";
import { useAuth } from "../../context/AuthContext";
import { showToast, showApiError } from "../../lib/notify";
import { getErrorMessage } from "../../lib/getErrorMessage";
import type { Enrollment, MyLearningResponse } from "../../types";
import styles from "./MyLearningPage.module.css";

type LearningTab = "in_progress" | "completed";

export default function MyLearningPage() {
  const router = useRouter();
  const { user, isLoggedIn, isLoading } = useAuth();

  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [inProgressCount, setInProgressCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [activeTab, setActiveTab] = useState<LearningTab>("in_progress");
  const [isFetching, setIsFetching] = useState(true);
  const [pendingId, setPendingId] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadLearning() {
      if (isLoading) {
        return;
      }

      if (!isLoggedIn) {
        router.replace("/login");
        return;
      }

      try {
        const { data } = await instance.get<MyLearningResponse>("/my-learning");

        if (ignore) {
          return;
        }

        setEnrollments(data.enrollments);
        setInProgressCount(data.inProgressCount);
        setCompletedCount(data.completedCount);
        setIsFetching(false);
      } catch {
        if (!ignore) {
          setIsFetching(false);
        }
      }
    }

    loadLearning();

    return () => {
      ignore = true;
    };
  }, [isLoading, isLoggedIn, router]);

  async function handleComplete(courseId: string) {
    setPendingId(courseId);

    try {
      await instance.patch(`/my-learning/${courseId}/complete`);
      const { data } = await instance.get<MyLearningResponse>("/my-learning");

      setEnrollments(data.enrollments);
      setInProgressCount(data.inProgressCount);
      setCompletedCount(data.completedCount);
      showToast("courseCompleted");
    } catch (error) {
      showApiError(getErrorMessage(error));
    }

    setPendingId("");
  }

  if (isFetching) {
    return <SkeletonGrid count={3} />;
  }

  const firstName = user?.name ? user.name.trim().split(/\s+/)[0] : "there";

  const visible = enrollments.filter(
    (item) => item.course && item.status === activeTab,
  );

  return (
    <section className={styles.page}>
      <div className={styles.intro}>
        <div className={styles.introText}>
          <h1 className={styles.title}>Hi, {firstName} — keep learning.</h1>
          <p className={styles.subtitle}>
            Mark courses as completed once you&apos;ve finished all lessons to
            track your progress and earn your certificates.
          </p>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span
              className={`${styles.statIconBox} ${styles.statIconProgress}`}
            >
              <Icon
                name="icon-stat-progress"
                className={styles.statIconInProgress}
              />
            </span>
            <span className={styles.statText}>
              <span className={styles.statNumber}>{inProgressCount}</span>
              <span className={styles.statLabel}>courses in progress</span>
            </span>
          </div>

          <div className={styles.stat}>
            <span className={`${styles.statIconBox} ${styles.statIconDone}`}>
              <Icon
                name="icon-stat-completed"
                className={styles.statIconCompleted}
              />
            </span>
            <span className={styles.statText}>
              <span className={styles.statNumber}>{completedCount}</span>
              <span className={styles.statLabel}>courses completed</span>
            </span>
          </div>
        </div>
      </div>

      <div className={styles.tabs}>
        <button
          type="button"
          className={
            activeTab === "in_progress" ? styles.tabActive : styles.tab
          }
          onClick={() => setActiveTab("in_progress")}
        >
          In progress
        </button>
        <button
          type="button"
          className={activeTab === "completed" ? styles.tabActive : styles.tab}
          onClick={() => setActiveTab("completed")}
        >
          Completed
        </button>
      </div>

      {visible.length === 0 && activeTab === "in_progress" && (
        <div className={styles.empty}>
          <span className={styles.emptyIconBox}>
            <Icon name="icon-empty-learning" className={styles.emptyIconOne} />
          </span>
          <p className={styles.emptyTitle}>
            You haven&apos;t started any courses yet
          </p>
          <p className={styles.emptyText}>Discover what to learn next.</p>
          <Link href="/courses" className={styles.emptyButton}>
            Browse courses
          </Link>
        </div>
      )}

      {visible.length === 0 && activeTab === "completed" && (
        <div className={styles.empty}>
          <span className={styles.emptyIconBox}>
            <Icon name="icon-empty-completed" className={styles.emptyIconTwo} />
          </span>
          <p className={styles.emptyTitle}>No completed courses yet</p>
          <p className={styles.emptyText}>
            Mark a course as completed to earn your first certificate.
          </p>
          <button
            type="button"
            className={styles.emptyButton}
            onClick={() => setActiveTab("in_progress")}
          >
            Go to In progress
          </button>
        </div>
      )}

      {visible.length > 0 && (
        <div className={styles.grid}>
          {visible.map((item) => (
            <article key={item._id} className={styles.card}>
              <Link
                href={`/course/${item.course.slug}`}
                className={styles.cover}
              >
                <Image
                  src={item.course.coverImageUrl}
                  alt={item.course.title}
                  fill
                  sizes="(min-width: 1440px) 394px, (min-width: 768px) 348px, 342px"
                  className={styles.coverImage}
                />
                <span className={styles.cardBadge}>
                  {activeTab === "completed" ? "Completed" : "In progress"}
                </span>
              </Link>

              <div className={styles.cardBody}>
                <div className={styles.cardInfo}>
                  <h2 className={styles.cardTitle}>{item.course.title}</h2>
                  <p className={styles.cardInstructor}>
                    Instructor: {item.course.instructor.name}
                  </p>
                </div>

                {activeTab === "completed" ? (
                  <span className={styles.cardDone}>
                    {item.completedAt
                      ? `Completed on ${formatCompletedDate(item.completedAt)}`
                      : "Completed"}
                  </span>
                ) : (
                  <button
                    type="button"
                    className={styles.cardButton}
                    onClick={() => handleComplete(item.course._id)}
                    disabled={pendingId === item.course._id}
                  >
                    Mark as completed
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
