import type { Metadata } from "next";
import CourseNotFound from "../../../components/CourseNotFound/CourseNotFound";
import CourseDetails from "../../../components/CourseDetails/CourseDetails";
import type { CourseDetails as CourseDetailsData } from "../../../types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getCourse(slug: string): Promise<CourseDetailsData | null> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/courses/${slug}`,
    { next: { revalidate: 60 } },
  );

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as CourseDetailsData;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
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

export default async function CoursePage({ params }: PageProps) {
  const { slug } = await params;
  const course = await getCourse(slug);

  if (!course) {
    return <CourseNotFound />;
  }

  return <CourseDetails course={course} />;
}
