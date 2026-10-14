"use client";

import { useEffect } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "../Icon/Icon";
import styles from "./SignInModal.module.css";

interface SignInModalProps {
  onClose: () => void;
}

export default function SignInModal({ onClose }: SignInModalProps) {
  const pathname = usePathname();

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  function handleOverlayClick(event: ReactMouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close"
        >
          <Icon name="icon-modal-close" className={styles.closeIcon} />
        </button>

        <span className={styles.iconBox}>
          <Icon name="icon-lock-big" className={styles.lockIcon} />
        </span>

        <div className={styles.texts}>
          <p className={styles.title}>
            Sign in to <br className={styles.titleBreak} />
            continue
          </p>
          <p className={styles.text}>
            Create an account or log in to add courses to your cart and start
            learning.
          </p>
        </div>

        <div className={styles.actions}>
          <Link href={`/login?from=${pathname}`} className={styles.loginButton}>
            Log in
          </Link>
          <Link href="/register" className={styles.signupButton}>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
