import type { Metadata } from "next";
import LegalPage from "../../components/LegalPage/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | Skilltenzo",
  description: "How Skilltenzo handles your personal data.",
};

export default function Privacy() {
  return <LegalPage title="Skilltenzo - Privacy policy" />;
}
