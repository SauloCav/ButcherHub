import styles from "./Loader.module.css";

type LoaderProps = {
  rows?: number;
  columns?: number;
};

export function Loader({ rows = 5, columns = 4 }: LoaderProps) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {Array.from({ length: columns }).map((_, i) => (
            <th key={i} className={styles.header}></th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: rows }).map((_, r) => (
          <tr key={r}>
            {Array.from({ length: columns }).map((_, c) => (
              <td key={c}>
                <div className={styles.skeleton} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}