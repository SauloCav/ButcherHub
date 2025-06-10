import styles from "./ConfirmDeleteDialog.module.css";

type ConfirmDeleteDialogProps = {
  open: boolean;
  buyerName: string;
  onCancel: () => void;
  onConfirm: () => void;
  disabled: boolean;
};

export function ConfirmDeleteDialog({
  open,
  buyerName,
  onCancel,
  onConfirm,
  disabled,
}: ConfirmDeleteDialogProps) {
  if (!open) return null;
  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete "{buyerName}"?</p>
        <div className={styles.actions}>
          <button onClick={onCancel} className={styles.cancelButton}>
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={styles.confirmButton}
            disabled={disabled}
          >
            {disabled ? "Cannot Delete" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}