import { useEffect, useState } from "react";
import { BuyerForm } from "../BuyerForm/BuyerForm";
import type { Buyer } from "../../../utils/buyerInterface";
import styles from "./BuyerFormDialog.module.css";

type Props = {
  open: boolean;
  defaultValues?: Buyer;
  isEditing: boolean;
  onClose: () => void;
  onSubmit: (b: Buyer) => void;
};

export function BuyerFormDialog({
  open,
  defaultValues,
  isEditing,
  onClose,
  onSubmit,
}: Props) {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(false);
  }, [open, defaultValues]);

  if (!open) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <header className={styles.header}>
          <h2>{isEditing ? "Edit Buyer" : "Add Buyer"}</h2>
        </header>

        <BuyerForm
          defaultValues={defaultValues}
          isEditing={isEditing}
          onSubmit={onSubmit}
          onValidChange={setIsValid}
        />

        <footer className={styles.actions}>
          <button
            type="button"
            onClick={onClose}
            className={styles.cancelButton}
          >
            Cancel
          </button>
          <button
            type="submit"
            form="buyer-form"
            className={styles.confirmButton}
            disabled={!isValid}
          >
            {isEditing ? "Update" : "Add"}
          </button>
        </footer>
      </div>
    </div>
  );
}