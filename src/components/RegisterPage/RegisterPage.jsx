"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Icon from "../Icon/Icon";
import { useAuth } from "../../context/AuthContext";
import { showToast, showApiError } from "../../lib/notify";
import styles from "./RegisterPage.module.css";

const schema = yup.object({
  name: yup
    .string()
    .trim()
    .required("Please enter your full name")
    .min(2, "Please enter your full name")
    .max(60, "Please enter your full name"),
  email: yup
    .string()
    .trim()
    .required("Please enter a valid email address")
    .email("Please enter a valid email address"),
  password: yup
    .string()
    .trim()
    .required("Password must be at least 8 characters long")
    .min(8, "Password must be at least 8 characters long"),
});

export default function RegisterPage() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { register: registerUser, isLoggedIn, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isLoggedIn) {
      router.replace("/");
    }
  }, [isLoading, isLoggedIn, router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const onSubmit = async (values) => {
    try {
      await registerUser(values);
      showToast("accountCreated");
      router.push("/");
    } catch (error) {
      showApiError(error.response?.data?.message);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.cover}>
        <Image
          src="/auth-cover.jpg"
          alt=""
          fill
          priority
          sizes="(min-width: 1440px) 720px, 100vw"
          className={styles.coverImage}
        />

        <div className={styles.coverOverlay}>
          <p className={styles.coverTitle}>Skills you actually need.</p>
          <span className={styles.coverBar} />
          <p className={styles.coverSubtitle}>Start learning today.</p>
        </div>
      </div>

      <div className={styles.formSide}>
        <div className={styles.formInner}>
          <div className={styles.heading}>
            <h1 className={styles.title}>Create your account</h1>
            <p className={styles.subtitle}>
              Free to join. Pay only for courses you take.
            </p>
          </div>

          <form
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div className={styles.field}>
              <label className={styles.label} htmlFor="name">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                className={`${styles.input} ${
                  errors.name ? styles.inputError : ""
                }`}
                {...register("name")}
              />
              {errors.name && (
                <span className={styles.error}>
                  <Icon
                    name="icon-alert"
                    width={14}
                    height={14}
                    className={styles.errorIcon}
                  />
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className={`${styles.input} ${
                  errors.email ? styles.inputError : ""
                }`}
                {...register("email")}
              />
              {errors.email && (
                <span className={styles.error}>
                  <Icon
                    name="icon-alert"
                    width={14}
                    height={14}
                    className={styles.errorIcon}
                  />
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="password">
                Password
              </label>
              <div className={styles.inputWrapper}>
                <input
                  id="password"
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  className={`${styles.input} ${styles.inputPassword} ${
                    errors.password ? styles.inputError : ""
                  }`}
                  {...register("password")}
                />
                <button
                  type="button"
                  className={styles.eyeButton}
                  onClick={() => setIsPasswordVisible((prev) => !prev)}
                  aria-label={
                    isPasswordVisible ? "Hide password" : "Show password"
                  }
                >
                  <Icon name="icon-eye" width={22} height={15} />
                </button>
              </div>
              {errors.password && (
                <span className={styles.error}>
                  <Icon
                    name="icon-alert"
                    width={14}
                    height={14}
                    className={styles.errorIcon}
                  />
                  {errors.password.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              Sign Up
            </button>

            <p className={styles.switch}>
              Already have an account?{" "}
              <Link href="/login" className={styles.switchLink}>
                Log in
              </Link>
            </p>
          </form>

          <p className={styles.legal}>
            By signing up, you agree to Skilltenzo&apos;s{" "}
            <Link href="/terms" className={styles.legalLink}>
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className={styles.legalLink}>
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
