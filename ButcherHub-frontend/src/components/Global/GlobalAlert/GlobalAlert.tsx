import { useEffect, useState } from "react";
import styles from "./GlobalAlert.module.css";

type GlobalAlertProps = {
  message: string;
  type?: "success" | "error" | "info";
  onDone?: () => void;
};

export function GlobalAlert({
  message,
  type = "info",
  onDone,
}: GlobalAlertProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!message) return;
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      onDone?.();
    }, 4000);
    return () => clearTimeout(timer);
  }, [message, onDone]);

  if (!visible) return null;

  return (
    <div className={`${styles.alert} ${styles[type]}`}>
      {message}
    </div>
  );
}