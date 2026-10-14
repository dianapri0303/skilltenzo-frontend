import type { Metadata } from "next";
import NotFoundPage from "../components/NotFoundPage/NotFoundPage";

export const metadata: Metadata = {
  title: "Page not found | Skilltenzo",
  description: "The page you're looking for doesn't exist or has moved.",
};

export default function NotFound() {
  return <NotFoundPage />;
}
