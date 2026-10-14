"use client";

import Icon from "../Icon/Icon";
import styles from "./LoadError.module.css";

export default function LoadError({
  titleLines,
  textLines,
  buttonLabel,
  onButtonClick,
}) {
  function handleClick() {
    if (onButtonClick) {
      onButtonClick();
      return;
    }

    window.location.reload();
  }

  return (
    <div className={styles.frame}>
      <span className={styles.iconBox}>
        <Icon name="icon-search-failed" className={styles.icon} />
      </span>

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

      <p className={styles.text}>
        {textLines.map((line, index) => (
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
        {buttonLabel}
      </button>
    </div>
  );
}
