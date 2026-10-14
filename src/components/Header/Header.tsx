"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Icon from "../Icon/Icon";
import { useAuth } from "../../context/AuthContext";
import styles from "./Header.module.css";

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
];

const privateLinks = [{ href: "/my-learning", label: "My Learning" }];

function getInitials(name?: string): string {
  if (!name) return "";
  return name
    .trim()
    .split(/\s+/)
    .map((part) => `${part[0].toUpperCase()}.`)
    .join("");
}

export default function Header() {
  const { user, cartCount, setCartCount, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  const links = user ? [...publicLinks, ...privateLinks] : publicLinks;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    if (!isAccountOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (accountRef.current && !accountRef.current.contains(target)) {
        setIsAccountOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isAccountOpen]);

  const handleLogout = () => {
    logout();
    setCartCount(0);
    setIsAccountOpen(false);
    setIsMenuOpen(false);
    router.push("/");
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.left}>
            <Link href="/" className={styles.logo}>
              Skilltenzo
            </Link>

            <nav className={styles.nav}>
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${styles.navLink} ${
                    isActive(link.href) ? styles.navLinkActive : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className={styles.right}>
            <Link href="/cart" className={styles.cart} aria-label="Cart">
              <Icon name="icon-cart" width={20} height={20} />
              {cartCount > 0 && (
                <span className={styles.cartDot}>{cartCount}</span>
              )}{" "}
            </Link>

            {user ? (
              <div className={styles.account} ref={accountRef}>
                <button
                  type="button"
                  className={styles.accountBtn}
                  onClick={() => setIsAccountOpen((prev) => !prev)}
                  aria-expanded={isAccountOpen}
                  aria-label="Account menu"
                >
                  {user.avatarUrl ? (
                    <Image
                      src={user.avatarUrl}
                      alt=""
                      width={40}
                      height={40}
                      className={styles.avatar}
                    />
                  ) : (
                    <span className={styles.avatarPlaceholder} />
                  )}
                  <span className={styles.initials}>
                    {getInitials(user.name)}
                  </span>
                </button>

                {isAccountOpen && (
                  <div className={styles.accountMenu}>
                    <button
                      type="button"
                      className={styles.logoutBtn}
                      onClick={handleLogout}
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className={styles.authButtons}>
                <Link href="/login" className={styles.loginBtn}>
                  Log In
                </Link>
                <Link href="/register" className={styles.signupBtn}>
                  Sign Up
                </Link>
              </div>
            )}

            <button
              type="button"
              className={`${styles.burger} ${
                isMenuOpen ? styles.burgerOpen : ""
              }`}
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <Icon
                name={isMenuOpen ? "icon-close" : "icon-burger"}
                width={16}
                height={16}
              />
            </button>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <nav className={styles.mobileNav}>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={`${styles.mobileNavLink} ${isActive(link.href) ? styles.mobileNavLinkActive : ""}`}
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <button
                type="button"
                onClick={handleLogout}
                className={styles.mobileLogout}
              >
                Log out
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className={`${styles.mobileNavLink} ${
                    isActive("/login") ? styles.mobileNavLinkActive : ""
                  }`}
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  onClick={closeMenu}
                  className={`${styles.mobileNavLink} ${
                    isActive("/register") ? styles.mobileNavLinkActive : ""
                  }`}
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </>
  );
}
