import styles from "./ConfirmDeleteDialog.module.css";

type Props = {
  open: boolean;
  text: string;
  onCancel: () => void;
  onConfirm: () => void;
  disabled: boolean;
};

export function ConfirmDeleteDialog({
  open,
  text,
  onCancel,
  onConfirm,
  disabled,
}: Props) {
  if (!open) return null;
  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <p>{text}</p>
        <div className={styles.actions}>
          <button onClick={onCancel} className={styles.cancelButton}>
            Cancel
          </button>
          <button onClick={onConfirm} className={styles.confirmButton} disabled={disabled}>
            {disabled ? "Cannot Delete" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}