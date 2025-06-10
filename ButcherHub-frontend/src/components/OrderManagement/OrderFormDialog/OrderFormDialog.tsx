import { OrderForm } from "../OrderForm/OrderForm";
import styles from "./OrderFormDialog.module.css";
import type { Order } from "../../../types/order";
import type { Buyer } from "../../../utils/buyerInterface";
import type { Meat } from "../../../types/meat";
import { useEffect, useState } from "react";

type Props = {
  open: boolean;
  buyers: Buyer[];
  meats: Meat[];
  defaultValues?: Order | null;
  isEditing: boolean;
  onClose: () => void;
  onSubmit: (o: Order) => void;
};

export function OrderFormDialog({
  open,
  buyers,
  meats,
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
        <h2>{isEditing ? "Edit Order" : "Add Order"}</h2>
        <OrderForm
          buyers={buyers}
          meats={meats}
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          onValidChange={setIsValid}
        />
        <div className={styles.actions}>
          <button onClick={onClose} className={styles.cancelButton}>
            Cancel
          </button>
          <button
            type="submit"
            form="order-form"
            className={styles.confirmButton}
            disabled={!isValid}
          >            
          {isEditing ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}