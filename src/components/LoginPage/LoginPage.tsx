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
import { getErrorMessage } from "../../lib/getErrorMessage";
import styles from "./LoginPage.module.css";

const schema = yup.object({
  email: yup
    .string()
    .trim()
    .required("Enter a valid email.")
    .email("Enter a valid email."),
  password: yup.string().trim().required("Enter your password."),
});

type LoginFormValues = yup.InferType<typeof schema>;

export default function LoginPage() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { login, isLoggedIn, isLoading } = useAuth();
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
  } = useForm<LoginFormValues>({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await login(values);
      showToast("loggedIn");
      router.push("/");
    } catch (error) {
      showApiError(getErrorMessage(error));
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
          sizes="(min-width: 1440px) 721px, 332px"
          className={styles.coverImage}
        />

        <div className={styles.coverOverlay}>
          <p className={styles.coverTitle}>Skills you actually need.</p>
          <span className={styles.coverBar} />
          <p className={styles.coverSubtitle}>
            Continue your learning journey.
          </p>
        </div>
      </div>

      <div className={styles.formSide}>
        <div className={styles.inner}>
          <div className={styles.heading}>
            <h1 className={styles.title}>Welcome back</h1>
            <p className={styles.subtitle}>
              Log in to access your courses and pick up where you left off.
            </p>
          </div>

          <form
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div className={styles.field}>
              <label className={styles.label} htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="name@example.com"
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
                  placeholder="••••••••"
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
                  <Icon name="icon-eye" width={19} height={13} />
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
              Log in
            </button>

            <p className={styles.switch}>
              Don&apos;t have an account?{" "}
              <Link href="/register" className={styles.switchLink}>
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
