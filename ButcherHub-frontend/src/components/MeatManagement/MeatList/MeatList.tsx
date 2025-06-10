import { useState } from "react";
import styles from "./MeatList.module.css";
import type { Meat } from "../../../types/meat";

type MeatListProps = {
  meats: Meat[];
  onEdit: (meat: Meat) => void;
  onDelete: (meat: Meat) => void;
};

const originLabels = ["Beef", "Pork", "Poultry", "Fish"];
const PAGE_SIZE = 7;

export function MeatList({ meats, onEdit, onDelete }: MeatListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(meats.length / PAGE_SIZE);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const currentMeats = meats.slice(startIndex, startIndex + PAGE_SIZE);

  return (
    <div className={styles.tableContainer}>
      {meats.length === 0 ? (
        <p className={styles.emptyMessage}>No meat available.</p>
      ) : (
        <>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Description</th>
                <th>Origin</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentMeats.map((meat) => (
                <tr key={meat.id} className={styles.tableRow}>
                  <td>{meat.id}</td>
                  <td>{meat.description}</td>
                  <td>
                    {
                      originLabels[meat.origin as unknown as number] ?? "Unknown"
                    }
                  </td>
                  <td className={styles.actions}>
                    <button
                      type="button"
                      aria-label="Edit meat"
                      onClick={() => onEdit(meat)}
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
                      onClick={() => onDelete(meat)}
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
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={styles.pageButton}
              aria-label="Previous page"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
              </svg>
            </button>
            <span className={styles.pageInfo}>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={styles.pageButton}
              aria-label="Next page"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
              </svg>
            </button>
          </div>
        </>
      )}
    </div>
  );
}