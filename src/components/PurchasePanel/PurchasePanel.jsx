"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import Icon from "../Icon/Icon";
import SignInModal from "../SignInModal/SignInModal";
import instance from "../../lib/axios";
import { useAuth } from "../../context/AuthContext";
import { formatPurchaseDate } from "../../lib/format";
import styles from "./PurchasePanel.module.css";

export default function PurchasePanel({ course }) {
  const { isLoggedIn, isLoading, setCartCount } = useAuth();

  const [status, setStatus] = useState("default");
  const [purchasedAt, setPurchasedAt] = useState("");
  const [isChecking, setIsChecking] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function checkStatus() {
      if (isLoading) {
        return;
      }

      if (!isLoggedIn) {
        if (!ignore) {
          setStatus("default");
          setIsChecking(false);
        }
        return;
      }

      try {
        const [cartResponse, learningResponse] = await Promise.all([
          instance.get("/cart"),
          instance.get("/my-learning"),
        ]);

        if (ignore) {
          return;
        }

        const enrollment = learningResponse.data.enrollments.find(
          (item) => item.course && item.course._id === course._id,
        );

        const isInCart = cartResponse.data.cart.some(
          (item) => item._id === course._id,
        );

        if (enrollment) {
          setStatus("owned");
          setPurchasedAt(formatPurchaseDate(enrollment._id));
        } else if (isInCart) {
          setStatus("inCart");
        } else {
          setStatus("default");
        }

        setIsChecking(false);
      } catch {
        if (!ignore) {
          setStatus("default");
          setIsChecking(false);
        }
      }
    }

    checkStatus();

    return () => {
      ignore = true;
    };
  }, [isLoading, isLoggedIn, course._id]);

  async function handleAddToCart() {
    if (!isLoggedIn) {
      setIsSignInOpen(true);
      return;
    }

    setIsAdding(true);

    try {
      const { data } = await instance.post(`/cart/${course._id}`);
      setCartCount(data.cartCount);
      setStatus("inCart");
      toast.success("Course added to cart");
    } catch (error) {
      const message = error.response?.data?.message;

      if (message === "Course already in cart") {
        setStatus("inCart");
      }
      if (message === "Course already purchased") {
        setStatus("owned");
      }

      toast.error(message || "Something went wrong. Please try again.");
    }

    setIsAdding(false);
  }

  if (status === "owned") {
    return (
      <aside className={`${styles.panel} ${styles.panelOwned}`}>
        <div className={styles.ownedInner}>
          <span className={styles.ownedIconBox}>
            <Icon name="icon-owned" className={styles.ownedIcon} />
          </span>

          <div className={styles.ownedText}>
            <p className={styles.ownedTitle}>You own this course</p>
            {purchasedAt && (
              <p className={styles.ownedDate}>Purchased on {purchasedAt}</p>
            )}
          </div>

          <Link href="/my-learning" className={styles.ownedButton}>
            Go to My Learning
            <Icon name="icon-arrow-right-sm" className={styles.buttonArrow} />
          </Link>
        </div>
      </aside>
    );
  }

  if (status === "inCart") {
    return (
      <aside className={`${styles.panel} ${styles.panelInCart}`}>
        <div className={styles.priceBlock}>
          <p className={styles.price}>${course.price.toFixed(2)}</p>
          <div>
            <p className={styles.priceNote}>One-time payment</p>
            <p className={styles.priceNote}>No subscription</p>
          </div>
        </div>

        <p className={styles.inCartPill}>
          <Icon name="icon-in-cart" className={styles.inCartIcon} />
          Course added to cart
        </p>

        <Link href="/cart" className={styles.cartButton}>
          Go to cart
          <Icon name="icon-arrow-right-sm" className={styles.buttonArrow} />
        </Link>

        <p className={styles.guarantee}>30-day money-back guarantee</p>
      </aside>
    );
  }

  return (
    <>
      <aside className={styles.panel}>
        <div className={styles.priceBlock}>
          <p className={styles.price}>${course.price.toFixed(2)}</p>
          <div>
            <p className={styles.priceNote}>One-time payment</p>
            <p className={styles.priceNote}>No subscription</p>
          </div>
        </div>

        <button
          type="button"
          className={styles.addButton}
          onClick={handleAddToCart}
          disabled={isChecking || isAdding}
        >
          Add to cart
        </button>

        <ul className={styles.benefits}>
          <li className={styles.benefit}>
            <Icon name="icon-lifetime" className={styles.benefitIconLifetime} />
            Full lifetime access
          </li>
          <li className={styles.benefit}>
            <Icon
              name="icon-devices-tv"
              className={styles.benefitIconDevices}
            />
            Access on mobile and TV
          </li>
          <li className={styles.benefit}>
            <Icon
              name="icon-certificate"
              className={styles.benefitIconCertificate}
            />
            Certificate of completion
          </li>
        </ul>
      </aside>

      {isSignInOpen && <SignInModal onClose={() => setIsSignInOpen(false)} />}
    </>
  );
}
