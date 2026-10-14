import type { Metadata } from "next";
import CartPage from "../../components/CartPage/CartPage";

export const metadata: Metadata = {
  title: "Checkout | Skilltenzo",
  description: "Complete your Skilltenzo purchase.",
};

export default function Cart() {
  return <CartPage />;
}
