import Link from "next/link";
import Icon from "../Icon/Icon";
import styles from "./Footer.module.css";

const socialLinks = [
  { name: "icon-twitter", label: "Twitter", href: "https://twitter.com" },
  { name: "icon-linkedin", label: "LinkedIn", href: "https://linkedin.com" },
  { name: "icon-youtube", label: "YouTube", href: "https://youtube.com" },
  { name: "icon-instagram", label: "Instagram", href: "https://instagram.com" },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <Link href="/" className={styles.logo}>
          Skilltenzo
        </Link>

        <p className={styles.slogan}>
          – Skills you actually need. From people who actually do.
        </p>

        <ul className={styles.socials}>
          {socialLinks.map((social) => (
            <li key={social.name}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className={styles.socialLink}
              >
                <Icon name={social.name} width={24} height={24} />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.bottom}>
        <p className={styles.copyright}>
          © 2025 Skilltenzo. All rights reserved.
        </p>
        <Link href="/privacy" className={styles.legalLink}>
          Privacy Policy
        </Link>
        <Link href="/cookies" className={styles.legalLink}>
          Cookies
        </Link>
      </div>
    </footer>
  );
}
