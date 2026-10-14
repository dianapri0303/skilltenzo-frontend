import type { Metadata } from "next";
import LoginPage from "../../components/LoginPage/LoginPage";

export const metadata: Metadata = {
  title: "Log In | Skilltenzo",
  description: "Log in to your Skilltenzo account.",
};

export default function Login() {
  return <LoginPage />;
}
