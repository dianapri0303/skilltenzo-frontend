"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import Icon from "../Icon/Icon";
import instance from "../../lib/axios";
import { useAuth } from "../../context/AuthContext";
import { formatPrice } from "../../lib/format";
import styles from "./CartPage.module.css";

const schema = yup.object({
  name: yup.string().trim().required("Enter your name"),
  email: yup
    .string()
    .trim()
    .email("Enter a valid email")
    .required("Enter a valid email"),
  cardNumber: yup
    .string()
    .trim()
    .matches(/^\d{4} ?\d{4} ?\d{4} ?\d{4}$/, "Enter a valid card number")
    .required("Enter a valid card number"),
  expiry: yup
    .string()
    .trim()
    .matches(/^(0[1-9]|1[0-2]) ?\/ ?\d{2}$/, "Invalid expiry date")
    .required("Invalid expiry date"),
  cvc: yup
    .string()
    .trim()
    .matches(/^\d{3}$/, "3 digits required")
    .required("3 digits required"),
});

export default function CartPage() {
  const router = useRouter();
  const { isLoggedIn, isLoading, setCartCount } = useAuth();

  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isFetching, setIsFetching] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema), mode: "onTouched" });

  useEffect(() => {
    let ignore = false;

    async function loadCart() {
      if (isLoading) {
        return;
      }

      if (!isLoggedIn) {
        router.replace("/login");
        return;
      }

      try {
        const { data } = await instance.get("/cart");

        if (ignore) {
          return;
        }

        setCart(data.cart);
        setTotalAmount(data.totalAmount);
        setCartCount(data.cart.length);
        setIsFetching(false);
      } catch {
        if (!ignore) {
          setIsFetching(false);
        }
      }
    }

    loadCart();

    return () => {
      ignore = true;
    };
  }, [isLoading, isLoggedIn, router, setCartCount]);

  async function handleRemove(courseId) {
    try {
      await instance.delete(`/cart/${courseId}`);
      const { data } = await instance.get("/cart");

      setCart(data.cart);
      setTotalAmount(data.totalAmount);
      setCartCount(data.cart.length);
      toast.success("Course removed from cart");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    }
  }

  async function onSubmit(values) {
    try {
      await instance.post("/orders", values);

      setCartCount(0);
      toast.success("Payment successful. Your courses are ready.");
      router.push("/my-learning");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Payment failed. Please try again",
      );
    }
  }

  if (isFetching) {
    return null;
  }

  if (cart.length === 0) {
    return (
      <section className={`${styles.page} ${styles.pageEmpty}`}>
        <div className={`${styles.heading} ${styles.headingEmpty}`}>
          <h1 className={styles.title}>Checkout</h1>
          <p className={styles.subtitle}>
            Courses are digital. They appear in your learning area immediately
            after payment.
          </p>
        </div>

        <div className={styles.emptyBlock}>
          <h2 className={styles.sectionTitle}>Your order</h2>

          <div className={styles.emptyOuter}>
            <div className={styles.emptyCard}>
              <span className={styles.emptyIconBox}>
                <Icon name="icon-empty-cart" className={styles.emptyIcon} />
              </span>
              <p className={styles.emptyTitle}>Your cart is empty</p>
              <p className={styles.emptyText}>Pick something to learn.</p>
              <Link href="/courses" className={styles.emptyButton}>
                Browse courses
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.page}>
      <div className={styles.heading}>
        <h1 className={styles.title}>Checkout</h1>
        <p className={styles.subtitle}>
          Courses are digital. They appear in your learning area immediately
          after payment.
        </p>
      </div>

      <div className={styles.order}>
        <h2 className={styles.sectionTitle}>Your order</h2>

        <ul className={styles.list}>
          {cart.map((course) => (
            <li key={course._id} className={styles.item}>
              <Image
                src={course.coverImageUrl}
                alt={course.title}
                width={128}
                height={72}
                className={styles.itemImage}
              />

              <div className={styles.itemBody}>
                <div className={styles.itemInfo}>
                  <p className={styles.itemTitle}>{course.title}</p>
                  <p className={styles.itemAuthor}>
                    By {course.instructor.name}
                  </p>
                </div>

                <div className={styles.itemAside}>
                  <span className={styles.itemPrice}>
                    {formatPrice(course.price)}
                  </span>
                  <button
                    type="button"
                    className={styles.removeButton}
                    onClick={() => handleRemove(course._id)}
                    aria-label="Remove course"
                  >
                    <Icon name="icon-remove" className={styles.removeIcon} />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <form
        className={styles.checkout}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <h2 className={styles.sectionTitle}>Complete your purchase</h2>

        <div className={styles.fields}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="name">
              Name (Full name on receipt)
            </label>
            <input
              id="name"
              type="text"
              className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
              placeholder="Jane Doe"
              {...register("name")}
            />
            {errors.name && (
              <p className={styles.error}>{errors.name.message}</p>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
              placeholder="you@email.com"
              {...register("email")}
            />
            {errors.email && (
              <p className={styles.error}>{errors.email.message}</p>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="cardNumber">
              Card number
            </label>
            <div className={styles.inputWrapper}>
              <input
                id="cardNumber"
                type="text"
                inputMode="numeric"
                className={`${styles.input} ${styles.inputCard} ${
                  errors.cardNumber ? styles.inputError : ""
                }`}
                placeholder="1234 5678 9012 3456"
                {...register("cardNumber")}
              />
              <Icon name="icon-card" className={styles.cardIcon} />
            </div>
            {errors.cardNumber && (
              <p className={styles.error}>{errors.cardNumber.message}</p>
            )}
          </div>

          <div className={styles.row}>
            <div className={`${styles.field} ${styles.fieldHalf}`}>
              <label className={styles.label} htmlFor="expiry">
                Expiry (MM / YY)
              </label>
              <input
                id="expiry"
                type="text"
                inputMode="numeric"
                className={`${styles.input} ${errors.expiry ? styles.inputError : ""}`}
                placeholder="MM / YY"
                {...register("expiry")}
              />
              {errors.expiry && (
                <p className={styles.error}>{errors.expiry.message}</p>
              )}
            </div>

            <div className={`${styles.field} ${styles.fieldHalf}`}>
              <span className={styles.labelRow}>
                <label className={styles.label} htmlFor="cvc">
                  CVC
                </label>
                <Icon name="icon-help" className={styles.helpIcon} />
              </span>
              <input
                id="cvc"
                type="text"
                inputMode="numeric"
                className={`${styles.input} ${errors.cvc ? styles.inputError : ""}`}
                placeholder="123"
                {...register("cvc")}
              />
              {errors.cvc && (
                <p className={styles.error}>{errors.cvc.message}</p>
              )}
            </div>
          </div>

          <p className={styles.secured}>
            <Icon name="icon-lock" className={styles.lockIcon} />
            Your payment is secured with TLS encryption.
          </p>
        </div>

        <div className={styles.totalBlock}>
          <div className={styles.totalRow}>
            <h2 className={styles.sectionTitle}>Total + Submit</h2>
            <span className={styles.totalAmount}>
              ${totalAmount.toFixed(2)}
            </span>
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            Complete purchase
          </button>

          <p className={styles.terms}>
            By completing the purchase you agree to our Terms of Service.
          </p>
        </div>
      </form>
    </section>
  );
}
