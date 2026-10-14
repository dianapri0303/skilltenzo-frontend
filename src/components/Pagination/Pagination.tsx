import Icon from "../Icon/Icon";
import styles from "./Pagination.module.css";

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  onChange,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav className={styles.pagination}>
      <ul className={styles.list}>
        <li>
          <button
            type="button"
            className={styles.arrow}
            disabled={page === 1}
            onClick={() => onChange(page - 1)}
            aria-label="Previous page"
          >
            <Icon name="icon-chevron-left" className={styles.arrowIcon} />
          </button>
        </li>

        {pages.map((item) => (
          <li key={item}>
            <button
              type="button"
              className={item === page ? styles.pageActive : styles.pageButton}
              onClick={() => onChange(item)}
            >
              {item}
            </button>
          </li>
        ))}

        <li>
          <button
            type="button"
            className={styles.arrow}
            disabled={page === totalPages}
            onClick={() => onChange(page + 1)}
            aria-label="Next page"
          >
            <Icon name="icon-chevron-right" className={styles.arrowIcon} />
          </button>
        </li>
      </ul>

      <p className={styles.counter}>
        Page {page} of {totalPages}
      </p>
    </nav>
  );
}
