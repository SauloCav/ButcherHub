import { useEffect, useState } from "react";
import type { Order, OrderItem } from "../../../types/order";
import type { Buyer } from "../../../types/buyer";
import type { Meat } from "../../../types/meat";
import styles from "./OrderForm.module.css";

type Props = {
  buyers: Buyer[];
  meats: Meat[];
  defaultValues?: Order | null;
  onSubmit: (o: Order) => void;
  onValidChange?: (valid: boolean) => void;
};

export function OrderForm({
   buyers,
   meats,
   defaultValues,
   onSubmit,
   onValidChange,
 }: Props) {  const [orderDate, setOrderDate] = useState(
    defaultValues?.orderDate.slice(0, 10) ||
      new Date().toISOString().slice(0, 10)
  );
  const [buyerId, setBuyerId] = useState<number>(
    defaultValues?.buyerId ?? buyers[0]?.id
  );
  
  const [dateIsValid, setDateIsValid] = useState(true);

  const [items, setItems] = useState<OrderItem[]>(
    defaultValues?.items.length
      ? defaultValues.items
      : [{ meatId: meats[0].id, price: 0, currency: "BRL" }]
  );

  const updateItem = async (idx: number, field: Partial<OrderItem>) => {
    const newItems = [...items];
    newItems[idx] = { ...newItems[idx], ...field };
    setItems(newItems);
  };

  const addItem = () =>
    setItems((prev) => [
      ...prev,
      { meatId: meats[0].id, price: 0, currency: "BRL", convertedPrice: 0 },
    ]);

  useEffect(() => {
    const allPricesFilled =
      items.length > 0 &&
      items.every((it) => it.price !== null && it.price !== undefined && it.price > 0 && !Number.isNaN(it.price));

    const dateObj = new Date(orderDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    setDateIsValid(dateObj <= today);

    onValidChange?.(allPricesFilled && dateIsValid);
  }, [items, orderDate, onValidChange]);

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: defaultValues?.id ?? 0,
      orderDate,
      buyerId,
      items,
      buyer: {
        id: 0,
        name: ""
      }
    });
  };

  return (
    <form id="order-form" className={styles.form} onSubmit={handle}>
      <div className={styles.field}>
        <label>Date</label>
        <input
          type="date"
          value={orderDate}
          onChange={(e) => setOrderDate(e.target.value)}
          required
        />
         <small className={styles.hint}>
           {!dateIsValid
             ? `Enter a valid date`
             : ""}
         </small>
      </div>
      <div className={styles.field}>
        <label>Buyer</label>
        <select
          value={buyerId}
          onChange={(e) => setBuyerId(Number(e.target.value))}
          required
        >
          {buyers.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
      </div>

        <div className={styles.itemsHeader}>
          <span>Meat</span>
          <span>Price</span>
          <span>Currency</span>
          <span></span>
        </div>
        {items.map((it, i) => (
          <div key={i} className={styles.itemRow}>
            <select
              value={it.meatId}
              onChange={(e) => updateItem(i, { meatId: +e.target.value })}
            >
              {meats.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.description}
                </option>
              ))}
            </select>
            <input
              type="number"
              step="0.01"
              value={it.price}
              onChange={(e) =>
                updateItem(i, { price: parseFloat(e.target.value) })
              }
            />
            <select
              value={it.currency}
              onChange={(e) =>
                updateItem(i, { currency: e.target.value })
              }
            >
              <option value="BRL">BRL</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
          </div>
        ))}
        <button
          type="button"
          onClick={addItem}
          className={styles.addItemButton}
        >
          + Add Meat
        </button>
      </form>
    );
  }