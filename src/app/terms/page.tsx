import type { Metadata } from "next";
import LegalPage from "../../components/LegalPage/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service | Skilltenzo",
  description: "The terms you agree to when using Skilltenzo.",
};

export default function Terms() {
  return <LegalPage title="Skilltenzo - Terms of Service" />;
}
