import SkeletonCard from "./SkeletonCard";
import styles from "./SkeletonCard.module.css";

interface SkeletonGridProps {
  count: number;
}

export default function SkeletonGrid({ count }: SkeletonGridProps) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.grid}>
        {Array.from({ length: count }, (_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    </section>
  );
}
