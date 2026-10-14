import type { Metadata } from "next";
import LegalPage from "../../components/LegalPage/LegalPage";

export const metadata: Metadata = {
  title: "Settings | Skilltenzo",
  description: "Your Skilltenzo account settings.",
};

export default function Settings() {
  return <LegalPage title="Skilltenzo - Settings" />;
}
