import type { Metadata } from "next";
import CoursesCatalog from "../../components/CoursesCatalog/CoursesCatalog";
import type { Category, CoursesResponse } from "../../types";

export const metadata: Metadata = {
  title: "Courses | Skilltenzo",
  description: "Practical skills, taught by people who use them daily.",
};

type SearchParams = Record<string, string | string[] | undefined>;

function getParam(value: string | string[] | undefined, fallback = ""): string {
  if (typeof value === "string") {
    return value || fallback;
  }
  if (Array.isArray(value)) {
    return value[0] || fallback;
  }
  return fallback;
}

export default async function Courses({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const category = getParam(params.category);
  const search = getParam(params.search);
  const sort = getParam(params.sort, "studentsCount");
  const page = getParam(params.page, "1");

  const query = new URLSearchParams({ sort, page, limit: "12" });

  if (category) {
    query.set("category", category);
  }
  if (search) {
    query.set("search", search);
  }

  let data: CoursesResponse | null = null;
  let categories: Category[] = [];

  try {
    const [coursesResponse, categoriesResponse] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses?${query.toString()}`, {
        next: { revalidate: 60 },
      }),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
        next: { revalidate: 3600 },
      }),
    ]);

    if (coursesResponse.ok) {
      data = (await coursesResponse.json()) as CoursesResponse;
    }
    if (categoriesResponse.ok) {
      categories = (await categoriesResponse.json()) as Category[];
    }
  } catch {
    data = null;
  }

  if (!data) {
    return (
      <CoursesCatalog
        hasError
        courses={[]}
        total={0}
        page={1}
        totalPages={0}
        categories={[]}
        activeCategory=""
        activeSearch=""
        activeSort="studentsCount"
      />
    );
  }

  return (
    <CoursesCatalog
      hasError={false}
      courses={data.courses}
      total={data.total}
      page={data.page}
      totalPages={data.totalPages}
      categories={categories}
      activeCategory={category}
      activeSearch={search}
      activeSort={sort}
    />
  );
}
