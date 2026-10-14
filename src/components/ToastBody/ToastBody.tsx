import Icon from "../Icon/Icon";
import styles from "./ToastBody.module.css";

type ToastVariant = "success" | "error" | "info";

const variantClass: Record<ToastVariant, string> = {
  success: "toastSuccess",
  error: "toastError",
  info: "toastInfo",
};

interface ToastBodyProps {
  variant: ToastVariant;
  icon: string;
  iconWidth: number;
  iconHeight: number;
  title: string;
  text: string;
  onClose?: () => void;
}

export default function ToastBody({
  variant,
  icon,
  iconWidth,
  iconHeight,
  title,
  text,
  onClose,
}: ToastBodyProps) {
  return (
    <div className={`${styles.toast} ${styles[variantClass[variant]]}`}>
      <span className={styles.iconBox}>
        <Icon
          name={icon}
          width={iconWidth}
          height={iconHeight}
          className={styles.icon}
        />
      </span>

      <div className={styles.texts}>
        <p className={styles.title}>{title}</p>
        {text && <p className={styles.text}>{text}</p>}
      </div>

      <button
        type="button"
        className={styles.close}
        onClick={onClose}
        aria-label="Close"
      >
        <Icon name="icon-toast-close" className={styles.closeIcon} />
      </button>
    </div>
  );
}
