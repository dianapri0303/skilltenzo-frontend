import type { Metadata } from "next";
import RegisterPage from "../../components/RegisterPage/RegisterPage";

export const metadata: Metadata = {
  title: "Sign Up | Skilltenzo",
  description: "Create your Skilltenzo account.",
};

export default function Register() {
  return <RegisterPage />;
}
