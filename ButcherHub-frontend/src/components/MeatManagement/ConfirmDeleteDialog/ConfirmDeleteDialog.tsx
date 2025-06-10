import styles from "./ConfirmDeleteDialog.module.css"

type ConfirmDeleteDialogProps = {
  open: boolean
  text: string
  onCancel: () => void
  onConfirm: () => void
  disabled: boolean
}

export function ConfirmDeleteDialog({
  open,
  text,
  onCancel,
  onConfirm,
  disabled,
}: ConfirmDeleteDialogProps) {
  if (!open) return null
  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <p>{text}</p>
        <div className={styles.actions}>
          <button
            type="button"
            onClick={onCancel}
            className={styles.cancelButton}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={styles.confirmButton}
            disabled={disabled}
          >
            {disabled ? "Cannot Delete" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  )
}