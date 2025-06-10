import type { ChangeEvent } from "react";
import type { Buyer } from "../../../utils/buyerInterface";
import styles from "./OrderFilter.module.css";

export type OrderFilterValues = {
  buyerId: number | "";
  date: string;
};

type Props = {
  buyers: Buyer[];
  values: OrderFilterValues;
  onChange: (v: OrderFilterValues) => void;
};

export function OrderFilter({ buyers, values, onChange }: Props) {
  const handleBuyer = (e: ChangeEvent<HTMLSelectElement>) => {
    const v = e.target.value === "" ? "" : parseInt(e.target.value, 10);
    onChange({ ...values, buyerId: v });
  };
  const handleDate = (e: ChangeEvent<HTMLInputElement>) => {
    onChange({ ...values, date: e.target.value });
  };

  return (
    <div className={styles.filter}>
      <div className={styles.field}>
        <label>Filter by Buyer</label>
        <select value={values.buyerId} onChange={handleBuyer}>
          <option value="">All</option>
          {buyers.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.field}>
        <label>Filter by Date</label>
        <input
          type="date"
          value={values.date}
          onChange={handleDate}
        />
      </div>
    </div>
  );
}