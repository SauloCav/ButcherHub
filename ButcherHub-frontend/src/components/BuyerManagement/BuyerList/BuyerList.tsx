import { useState } from "react";
import type { Buyer } from "../../../utils/buyerInterface";
import styles from "./BuyerList.module.css";

type Props = {
  buyers: Buyer[];
  onEdit: (b: Buyer) => void;
  onDelete: (b: Buyer) => void;
};

const PAGE_SIZE = 7;

export function BuyerList({ buyers, onEdit, onDelete }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(buyers.length / PAGE_SIZE);
  const start = (currentPage - 1) * PAGE_SIZE;
  const currentBuyers = buyers.slice(start, start + PAGE_SIZE);

  const handlePrevious = () =>
    setCurrentPage((p) => (p > 1 ? p - 1 : p));
  const handleNext = () =>
    setCurrentPage((p) => (p < totalPages ? p + 1 : p));

  return (
    <div className={styles.tableContainer}>
      {buyers.length === 0 ? (
        <p className={styles.emptyMessage}>No buyers available.</p>
      ) : (
        <>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Document</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentBuyers.map((b) => (
                <tr key={b.id} className={styles.tableRow}>
                  <td>{b.id}</td>
                  <td>{b.name}</td>
                  <td>{b.documentNumber}</td>
                  <td className={styles.actions}>
                    <button
                      type="button"
                      aria-label="Edit buyer"
                      onClick={() => onEdit(b)}
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
                      aria-label="Delete buyer"
                      onClick={() => onDelete(b)}
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
              ))}
            </tbody>
          </table>
          <div className={styles.pagination}>
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={styles.pageButton}
              aria-label="Previous page"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
              </svg>
            </button>
            <span className={styles.pageInfo}>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={styles.pageButton}
              aria-label="Next page"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
              </svg>
            </button>
          </div>
        </>
      )}
    </div>
  );
}