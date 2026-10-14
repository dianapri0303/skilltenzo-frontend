"use client";

import Icon from "../Icon/Icon";
import styles from "./ServerErrorPage.module.css";

export default function ServerErrorPage({ onReset }) {
  return (
    <section className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.illustration}>
          <Icon name="icon-server-error" className={styles.image} />
        </div>

        <h1 className={styles.title}>
          Something broke on <br className={styles.breakMobile} />
          our side.
        </h1>

        <p className={styles.subtitle}>
          We&apos;re working on it. Try refreshing in a{" "}
          <br className={styles.breakMobile} />
          few <br className={styles.breakDesktop} />
          seconds.
        </p>

        <button type="button" className={styles.button} onClick={onReset}>
          <Icon name="icon-reload" className={styles.buttonIcon} />
          Reload
        </button>
      </div>
    </section>
  );
}
