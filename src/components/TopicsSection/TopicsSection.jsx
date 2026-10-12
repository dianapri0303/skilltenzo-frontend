import Link from "next/link";
import Icon from "../Icon/Icon";
import styles from "./TopicsSection.module.css";

const topicConfig = {
  "creative-writing": {
    icon: "icon-topic-writing",
    circle: "circleOrange",
    width: 18,
    height: 16,
  },
  "audio-production": {
    icon: "icon-topic-audio",
    circle: "circleGreen",
    width: 14,
    height: 19,
  },
  crafts: {
    icon: "icon-topic-crafts",
    circle: "circleGrey",
    width: 20,
    height: 20,
  },
  "home-gardening": {
    icon: "icon-topic-gardening",
    circle: "circleGreen",
    width: 18,
    height: 20,
  },
  "personal-finance": {
    icon: "icon-topic-finance",
    circle: "circleOrange",
    width: 20,
    height: 20,
  },
};

const fallbackConfig = {
  icon: "icon-topic-crafts",
  circle: "circleGrey",
  width: 20,
  height: 20,
};

const topicOrder = Object.keys(topicConfig);

function getOrderIndex(slug) {
  const index = topicOrder.indexOf(slug);
  return index === -1 ? topicOrder.length : index;
}

async function getCategories() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) return [];

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export default async function TopicsSection() {
  const categories = await getCategories();

  if (categories.length === 0) return null;

  const orderedCategories = [...categories].sort(
    (a, b) => getOrderIndex(a.slug) - getOrderIndex(b.slug),
  );

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.headingBlock}>
          <h2 className={styles.heading}>Browse by topic</h2>
          <p className={styles.subheading}>
            Pick a niche, find your next skill.
          </p>
        </div>

        <div className={styles.grid}>
          {orderedCategories.map((category) => {
            const config = topicConfig[category.slug] || fallbackConfig;

            return (
              <Link
                key={category._id}
                href={`/courses?category=${category.slug}`}
                className={styles.card}
              >
                <span className={`${styles.circle} ${styles[config.circle]}`}>
                  <Icon
                    name={config.icon}
                    width={config.width}
                    height={config.height}
                  />
                </span>

                <span className={styles.cardText}>
                  <span className={styles.cardTitle}>{category.name}</span>
                  <span className={styles.cardSubtitle}>
                    {category.subtitle}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
