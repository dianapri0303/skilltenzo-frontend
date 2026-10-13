import { notFound } from "next/navigation";
import CourseDetails from "../../../components/CourseDetails/CourseDetails";

async function getCourse(slug) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/courses/${slug}`,
    { next: { revalidate: 60 } },
  );

  if (!response.ok) {
    return null;
  }

  return response.json();
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const course = await getCourse(slug);

  if (!course) {
    return { title: "Course not found | Skilltenzo" };
  }

  return {
    title: `${course.title} | Skilltenzo`,
    description: course.shortDescription,
  };
}

export default async function CoursePage({ params }) {
  const { slug } = await params;
  const course = await getCourse(slug);

  if (!course) {
    notFound();
  }

  return <CourseDetails course={course} />;
}
