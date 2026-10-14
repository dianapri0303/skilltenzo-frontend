"use client";

import Icon from "../Icon/Icon";
import styles from "./FetchError.module.css";

export default function FetchError({ titleLines, buttonLabel, onButtonClick }) {
  function handleClick() {
    if (onButtonClick) {
      onButtonClick();
      return;
    }

    window.location.reload();
  }

  return (
    <div className={styles.frame}>
      <Icon name="icon-error-circle" className={styles.icon} />

      <p className={styles.title}>
        {titleLines.map((line, index) => (
          <span key={line}>
            {index > 0 && (
              <>
                {" "}
                <br className={styles.lineBreak} />
              </>
            )}
            {line}
          </span>
        ))}
      </p>

      <button type="button" className={styles.button} onClick={handleClick}>
        <Icon name="icon-retry" className={styles.buttonIcon} />
        {buttonLabel}
      </button>
    </div>
  );
}
