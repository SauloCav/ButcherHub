import { useEffect, useState } from "react";
import { MeatForm } from "../MeatForm/MeatForm";
import type { Meat } from "../../../types/meat";
import styles from "./MeatFormDialog.module.css";

type MeatFormDialogProps = {
  open: boolean;
  defaultValues?: Meat;
  isEditing: boolean;
  onClose: () => void;
  onSubmit: (m: Meat) => void;
};

export function MeatFormDialog({
  open,
  defaultValues,
  isEditing,
  onClose,
  onSubmit,
}: MeatFormDialogProps) {
  const [desc, setDesc] = useState<string>(defaultValues?.description ?? "");

  useEffect(() => {
    setDesc(defaultValues?.description ?? "");
  }, [defaultValues]);

  if (!open) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <header className={styles.header}>
          <h2>{isEditing ? "Edit Meat" : "Add Meat"}</h2>
        </header>

        <MeatForm
          onSubmit={onSubmit}
          defaultValues={defaultValues}
          isEditing={isEditing}
          onDescriptionChange={setDesc}
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
            form="meat-form"
            className={styles.confirmButton}
            disabled={desc.length < 3}
          >
            {isEditing ? "Update" : "Add"}
          </button>
        </footer>
      </div>
    </div>
  );
}