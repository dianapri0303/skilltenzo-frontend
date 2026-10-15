"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import Icon from "../Icon/Icon";
import CatalogCourseCard from "../CatalogCourseCard/CatalogCourseCard";
import FetchError from "../FetchError/FetchError";
import LoadError from "../LoadError/LoadError";
import SignInModal from "../SignInModal/SignInModal";
import Pagination from "../Pagination/Pagination";
import styles from "./CoursesCatalog.module.css";
import instance from "../../lib/axios";
import { useAuth } from "../../context/AuthContext";
import { showToast, showApiError } from "../../lib/notify";
import { getErrorMessage } from "../../lib/getErrorMessage";
import type {
  CartResponse,
  Category,
  Course,
  MyLearningResponse,
} from "../../types";

const sortOptions = [
  { value: "studentsCount", label: "Most popular" },
  { value: "ratingAverage", label: "Highest rated" },
  { value: "price_asc", label: "Price: low to high" },
  { value: "price_desc", label: "Price: high to low" },
];

interface QueryValues {
  category?: string;
  search?: string;
  sort?: string;
  page?: number;
}

interface CoursesCatalogProps {
  courses: Course[];
  total: number;
  page: number;
  totalPages: number;
  categories: Category[];
  activeCategory: string;
  activeSearch: string;
  activeSort: string;
  hasError: boolean;
}

export default function CoursesCatalog({
  courses,
  total,
  page,
  totalPages,
  categories,
  activeCategory,
  activeSearch,
  activeSort,
  hasError,
}: CoursesCatalogProps) {
  const router = useRouter();

  const { isLoggedIn, isLoading, setCartCount } = useAuth();

  const [cartIds, setCartIds] = useState<string[]>([]);
  const [ownedIds, setOwnedIds] = useState<string[]>([]);
  const [pendingId, setPendingId] = useState("");
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  const [category, setCategory] = useState(activeCategory);
  const [search, setSearch] = useState(activeSearch);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const categoryRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      if (categoryRef.current && !categoryRef.current.contains(target)) {
        setIsCategoryOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(target)) {
        setIsSortOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    let ignore = false;

    async function loadPurchaseStatus() {
      if (isLoading) {
        return;
      }

      if (!isLoggedIn) {
        if (!ignore) {
          setCartIds([]);
          setOwnedIds([]);
        }
        return;
      }

      try {
        const [cartResponse, learningResponse] = await Promise.all([
          instance.get<CartResponse>("/cart"),
          instance.get<MyLearningResponse>("/my-learning"),
        ]);

        if (ignore) {
          return;
        }

        setCartIds(cartResponse.data.cart.map((item) => item._id));
        setOwnedIds(
          learningResponse.data.enrollments
            .filter((item) => item.course)
            .map((item) => item.course._id),
        );
        setCartCount(cartResponse.data.cart.length);
      } catch {
        if (!ignore) {
          setCartIds([]);
          setOwnedIds([]);
        }
      }
    }

    loadPurchaseStatus();

    return () => {
      ignore = true;
    };
  }, [isLoading, isLoggedIn, setCartCount]);

  async function handleAddToCart(course: Course) {
    if (!isLoggedIn) {
      setIsSignInOpen(true);
      return;
    }

    setPendingId(course._id);

    try {
      const { data } = await instance.post<{ cartCount: number }>(
        `/cart/${course._id}`,
      );
      setCartCount(data.cartCount);
      setCartIds((ids) => [...ids, course._id]);
      showToast(
        "courseAdded",
        `The ${course.title} course is now in your cart.`,
      );
    } catch (error) {
      const message = getErrorMessage(error);

      if (message === "Course already in cart") {
        setCartIds((ids) => [...ids, course._id]);
      }
      if (message === "Course already purchased") {
        setOwnedIds((ids) => [...ids, course._id]);
      }

      showApiError(message);
    }

    setPendingId("");
  }

  function pushQuery(values: QueryValues) {
    const query = new URLSearchParams();

    if (values.category) {
      query.set("category", values.category);
    }
    if (values.search) {
      query.set("search", values.search);
    }
    if (values.sort && values.sort !== "studentsCount") {
      query.set("sort", values.sort);
    }
    if (values.page && values.page > 1) {
      query.set("page", String(values.page));
    }

    const queryString = query.toString();
    router.push(queryString ? `/courses?${queryString}` : "/courses");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    pushQuery({ category, search, sort: activeSort, page: 1 });
  }

  function handleClear() {
    setCategory("");
    setSearch("");
    setIsCategoryOpen(false);
    pushQuery({});
  }

  function handleSelectCategory(slug: string) {
    setCategory(slug);
    setIsCategoryOpen(false);
  }

  function handleSelectSort(value: string) {
    setIsSortOpen(false);
    pushQuery({
      category: activeCategory,
      search: activeSearch,
      sort: value,
      page: 1,
    });
  }

  function handleChangePage(value: number) {
    pushQuery({
      category: activeCategory,
      search: activeSearch,
      sort: activeSort,
      page: value,
    });
  }

  const categoryLabel =
    categories.find((item) => item.slug === category)?.name || "All categories";

  const sortLabel =
    sortOptions.find((item) => item.value === activeSort)?.label ||
    "Most popular";

  if (hasError) {
    return (
      <section className={`${styles.page} ${styles.pageEmpty}`}>
        <div className={styles.heading}>
          <h1 className={styles.title}>Courses</h1>
          <p className={styles.subtitle}>
            Practical skills, taught by people who use them daily.
          </p>
        </div>

        <div className={styles.emptyState}>
          <FetchError
            titleLines={[
              "We couldn't load the courses.",
              "Please refresh the page.",
            ]}
            buttonLabel="Try again"
          />
        </div>
      </section>
    );
  }

  if (total === 0) {
    return (
      <section className={`${styles.page} ${styles.pageEmpty}`}>
        <div className={styles.heading}>
          <h1 className={styles.title}>Courses</h1>
          <p className={styles.subtitle}>
            Practical skills, taught by people who use them daily.
          </p>
        </div>

        <div className={styles.emptyState}>
          <LoadError
            titleLines={["Nothing was found for", "your request"]}
            textLines={[
              "Try a different keyword",
              "or clear your filters to",
              "see all courses.",
            ]}
            buttonLabel="Clear filters"
            onButtonClick={handleClear}
          />
        </div>
      </section>
    );
  }

  return (
    <section className={styles.page}>
      <div className={styles.heading}>
        <h1 className={styles.title}>Courses</h1>
        <p className={styles.subtitle}>
          Practical skills, taught by people who use them daily.
        </p>
      </div>

      <form className={styles.filters} onSubmit={handleSubmit}>
        <div className={styles.filtersRow}>
          <div
            className={`${styles.filterGroup} ${styles.categoryGroup}`}
            ref={categoryRef}
          >
            <span className={styles.filterLabel}>Category</span>
            <button
              type="button"
              className={styles.select}
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            >
              <span>{categoryLabel}</span>
              <Icon
                name="icon-chevron-down"
                className={`${styles.selectArrow} ${
                  isCategoryOpen ? styles.selectArrowOpen : ""
                }`}
              />
            </button>

            {isCategoryOpen && (
              <ul className={styles.dropdown}>
                <li>
                  <button
                    type="button"
                    className={
                      category === "" ? styles.optionActive : styles.option
                    }
                    onClick={() => handleSelectCategory("")}
                  >
                    <span>All categories</span>
                    {category === "" && (
                      <Icon name="icon-check" className={styles.optionCheck} />
                    )}
                  </button>
                </li>

                {categories.map((item) => (
                  <li key={item._id}>
                    <button
                      type="button"
                      className={
                        category === item.slug
                          ? styles.optionActive
                          : styles.option
                      }
                      onClick={() => handleSelectCategory(item.slug)}
                    >
                      <span>{item.name}</span>
                      {category === item.slug && (
                        <Icon
                          name="icon-check"
                          className={styles.optionCheck}
                        />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className={`${styles.filterGroup} ${styles.searchGroup}`}>
            <span className={styles.filterLabel}>Search</span>
            <div className={styles.searchWrapper}>
              <Icon name="icon-search" className={styles.searchIcon} />
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Search courses..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <button type="submit" className={styles.filterButton}>
            Filter
          </button>
          <button
            type="button"
            className={styles.clearButton}
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </form>

      <div className={styles.sortRow} ref={sortRef}>
        <span className={styles.sortLabel}>Sort by:</span>
        <div className={styles.sortWrapper}>
          <button
            type="button"
            className={styles.sortSelect}
            onClick={() => setIsSortOpen(!isSortOpen)}
          >
            <span>{sortLabel}</span>
            <Icon
              name="icon-chevron-down"
              className={`${styles.selectArrow} ${
                isSortOpen ? styles.selectArrowOpen : ""
              }`}
            />
          </button>

          {isSortOpen && (
            <ul className={styles.sortDropdown}>
              {sortOptions.map((item) => (
                <li key={item.value}>
                  <button
                    type="button"
                    className={
                      activeSort === item.value
                        ? styles.sortOptionActive
                        : styles.sortOption
                    }
                    onClick={() => handleSelectSort(item.value)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className={styles.results}>
        <h2 className={styles.resultsTitle}>
          Showing {total} <br className={styles.resultsBreak} />
          courses
          {activeSearch ? ` matching "${activeSearch}"` : ""}
        </h2>
        <div className={styles.grid}>
          {courses.map((course) => (
            <CatalogCourseCard
              key={course._id}
              course={course}
              status={
                ownedIds.includes(course._id)
                  ? "owned"
                  : cartIds.includes(course._id)
                    ? "inCart"
                    : "default"
              }
              isPending={pendingId === course._id}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>

      <div className={styles.paginationWrapper}>
        <Pagination
          page={page}
          totalPages={totalPages}
          onChange={handleChangePage}
        />
      </div>

      {isSignInOpen && <SignInModal onClose={() => setIsSignInOpen(false)} />}
    </section>
  );
}
