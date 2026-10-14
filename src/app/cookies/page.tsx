import type { Metadata } from "next";
import LegalPage from "../../components/LegalPage/LegalPage";

export const metadata: Metadata = {
  title: "Cookies Policy | Skilltenzo",
  description: "How Skilltenzo uses cookies.",
};

export default function Cookies() {
  return <LegalPage title="Skilltenzo - Cookies policy" />;
}
