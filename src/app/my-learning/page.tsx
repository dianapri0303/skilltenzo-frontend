import type { Metadata } from "next";
import MyLearningPage from "../../components/MyLearningPage/MyLearningPage";

export const metadata: Metadata = {
  title: "My Learning | Skilltenzo",
  description: "Your purchased Skilltenzo courses.",
};

export default function MyLearning() {
  return <MyLearningPage />;
}
