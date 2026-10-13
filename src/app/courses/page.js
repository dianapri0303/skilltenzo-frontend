import CoursesCatalog from "../../components/CoursesCatalog/CoursesCatalog";

export const metadata = {
  title: "Courses | Skilltenzo",
  description: "Practical skills, taught by people who use them daily.",
};

export default async function Courses({ searchParams }) {
  const params = await searchParams;

  const category = params.category || "";
  const search = params.search || "";
  const sort = params.sort || "studentsCount";
  const page = params.page || "1";

  const query = new URLSearchParams({ sort, page, limit: "12" });

  if (category) {
    query.set("category", category);
  }
  if (search) {
    query.set("search", search);
  }

  const [coursesResponse, categoriesResponse] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses?${query.toString()}`, {
      next: { revalidate: 60 },
    }),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
      next: { revalidate: 3600 },
    }),
  ]);

  const data = await coursesResponse.json();
  const categories = await categoriesResponse.json();

  return (
    <CoursesCatalog
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
