import { useEffect, useState } from "react";
import type { Order } from "../../../types/order";
import { format } from "date-fns";
import styles from "./OrderList.module.css";
import { getBRLRates } from "../../../utils/currencyService";

type Props = {
  orders: Order[];
  onEdit: (o: Order) => void;
  onDelete: (o: Order) => void;
};

const PAGE_SIZE = 6;

export function OrderList({ orders, onEdit, onDelete }: Props) {
  const [page, setPage] = useState(1);
  const [rates, setRates] = useState<{[k:string]:number}>({ BRL:1, USD:1, EUR:1 });
  const totalPages = Math.ceil(orders.length / PAGE_SIZE);
  const current = orders.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    getBRLRates().then(setRates).catch(console.error);
  }, []);

  return (
    <div className={styles.tableContainer}>
      {orders.length === 0 ? (
        <p className={styles.emptyMessage}>No orders available.</p>
      ) : (
        <>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Buyer</th>
                <th>Total (BRL)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {current.map((o) => {
                const total = o.items
                  .reduce((sum, it) => sum + it.price * (rates[it.currency] || 1), 0)
                  .toFixed(2);

                return (
                  <tr key={o.id}>
                    <td>{o.id}</td>
                    <td>{format(new Date(o.orderDate), "yyyy-MM-dd")}</td>
                    <td>{o.buyer.name}</td>
                    <td>{total}</td>
                    <td className={styles.actions}>
                    <button
                      type="button"
                      aria-label="Edit meat"
                      onClick={() => onEdit(o)}
                      className={`${styles.iconButton} ${styles.editButton}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 20h9" />
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 21l-4 1 1-4L16.5 3.5z" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      aria-label="Delete meat"
                      onClick={() => onDelete(o)}
                      className={`${styles.iconButton} ${styles.deleteButton}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                        <path d="M10 11v6" />
                        <path d="M14 11v6" />
                      </svg>
                    </button>
                  </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className={styles.pagination}>
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className={styles.pageButton}
              aria-label="Previous page"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
              </svg>
            </button>

            <span className={styles.pageInfo}>
              Page {page} of {totalPages}
            </span>

            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className={styles.pageButton}
              aria-label="Next page"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/>
              </svg>
            </button>
          </div>
        </>
      )}
    </div>
  );
}