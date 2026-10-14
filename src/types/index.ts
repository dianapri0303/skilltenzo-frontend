export interface Category {
  _id: string;
  name: string;
  slug: string;
  subtitle: string;
}

export type CategoryRef = Pick<Category, "_id" | "name" | "slug">;

export interface Instructor {
  name: string;
  avatarUrl: string;
  bio: string;
}

export interface Course {
  _id: string;
  slug: string;
  title: string;
  shortDescription: string;
  coverImageUrl: string;
  category: string;
  level: string;
  language: string;
  durationMinutes: number;
  price: number;
  instructor: Instructor;
  whatYoullLearn: string[];
  ratingAverage: number;
  studentsCount: number;
}

export interface CourseDetails extends Omit<Course, "category"> {
  category: CategoryRef;
}

export type CartCourse = Pick<
  Course,
  "_id" | "slug" | "title" | "price" | "coverImageUrl" | "instructor"
>;

export type EnrollmentCourse = Pick<
  Course,
  "_id" | "slug" | "title" | "coverImageUrl" | "instructor"
>;

export interface Enrollment {
  _id: string;
  course: EnrollmentCourse;
  status: "in_progress" | "completed";
  completedAt: string | null;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  avatarUrl: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface SessionResponse {
  token: string;
  name: string;
  avatarUrl: string;
  cartCount: number;
}

export interface CoursesResponse {
  courses: Course[];
  total: number;
  page: number;
  totalPages: number;
}

export interface CartResponse {
  cart: CartCourse[];
  totalAmount: number;
}

export interface MyLearningResponse {
  enrollments: Enrollment[];
  inProgressCount: number;
  completedCount: number;
}

export interface OrderResponse {
  orderId: string;
  enrolledCourses: string[];
}
