"use client";

import { toast } from "react-toastify";
import ToastBody from "../components/ToastBody/ToastBody";

const messages = {
  courseAdded: {
    variant: "success",
    icon: "icon-toast-cart",
    iconWidth: 20,
    iconHeight: 20,
    title: "Course added to cart",
    text: "The course is now in your cart.",
  },
  welcomeCourses: {
    variant: "success",
    icon: "icon-toast-courses",
    iconWidth: 22,
    iconHeight: 18,
    title: "Welcome to your new courses!",
    text: "Explore the curriculum and start learning.",
  },
  accountCreated: {
    variant: "success",
    icon: "icon-toast-account",
    iconWidth: 22,
    iconHeight: 16,
    title: "Account created. Welcome to Skilltenzo!",
    text: "Your learning journey begins today.",
  },
  courseCompleted: {
    variant: "success",
    icon: "icon-toast-completed",
    iconWidth: 21,
    iconHeight: 16,
    title: "Course marked as completed",
    text: "You've finished 100% of the lessons.",
  },
  loggedIn: {
    variant: "success",
    icon: "icon-toast-login",
    iconWidth: 18,
    iconHeight: 18,
    title: "Logged in successfully",
    text: "Welcome back to your workspace.",
  },
  certificateSent: {
    variant: "success",
    icon: "icon-toast-certificate",
    iconWidth: 22,
    iconHeight: 21,
    title: "Certificate sent to your email",
    text: "A PDF copy is waiting in your inbox.",
  },
  courseRemoved: {
    variant: "success",
    icon: "icon-toast-cart",
    iconWidth: 20,
    iconHeight: 20,
    title: "Course removed from cart",
    text: "",
  },
  emailRegistered: {
    variant: "error",
    icon: "icon-toast-email",
    iconWidth: 20,
    iconHeight: 16,
    title: "Email is already registered",
    text: "",
  },
  invalidCredentials: {
    variant: "error",
    icon: "icon-toast-password",
    iconWidth: 20,
    iconHeight: 20,
    title: "Invalid email or password",
    text: "",
  },
  paymentFailed: {
    variant: "error",
    icon: "icon-toast-payment",
    iconWidth: 22,
    iconHeight: 22,
    title: "Payment failed. Please check your card details",
    text: "",
  },
  somethingWrong: {
    variant: "error",
    icon: "icon-toast-warning",
    iconWidth: 22,
    iconHeight: 19,
    title: "Something went wrong. Please try again",
    text: "",
  },
  alreadyOwned: {
    variant: "info",
    icon: "icon-toast-clock",
    iconWidth: 18,
    iconHeight: 18,
    title: "You already own this course",
    text: "Check your 'My Learning' tab to start watching.",
  },
  alreadyInCart: {
    variant: "info",
    icon: "icon-toast-incart",
    iconWidth: 22,
    iconHeight: 19,
    title: "This course is already in your cart",
    text: "Visit checkout to complete your purchase.",
  },
};

export function showToast(key, textOverride) {
  const message = messages[key];

  if (!message) {
    return;
  }

  toast(
    ({ closeToast }) => (
      <ToastBody
        variant={message.variant}
        icon={message.icon}
        iconWidth={message.iconWidth}
        iconHeight={message.iconHeight}
        title={message.title}
        text={textOverride || message.text}
        onClose={closeToast}
      />
    ),
    { icon: false, closeButton: false },
  );
}

export function showApiError(message) {
  if (message === "Email is already registered") {
    showToast("emailRegistered");
    return;
  }
  if (message === "Invalid email or password") {
    showToast("invalidCredentials");
    return;
  }
  if (message === "Course already in cart") {
    showToast("alreadyInCart");
    return;
  }
  if (message === "Course already purchased") {
    showToast("alreadyOwned");
    return;
  }
  if (message && message.startsWith("Payment failed")) {
    showToast("paymentFailed");
    return;
  }

  showToast("somethingWrong");
}
