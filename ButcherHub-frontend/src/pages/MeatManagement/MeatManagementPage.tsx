import { useState, useEffect } from "react";
import type { Meat } from "../../types/meat";
import { MeatList } from "../../components/MeatManagement/MeatList/MeatList";
import { ConfirmDeleteDialog } from "../../components/MeatManagement/ConfirmDeleteDialog/ConfirmDeleteDialog";
import { MeatFormDialog } from "../../components/MeatManagement/MeatFormDialog/MeatFormDialog";
import styles from "./MeatManagementPage.module.css";
import { getMeats, createMeat, updateMeat, deleteMeat } from "../../services/meatService";
import { GlobalAlert } from "../../components/Global/GlobalAlert/GlobalAlert";
import { Loader } from "../../components/Global/Loader/Loader";

export default function MeatManagementPage() {
  const [meats, setMeats] = useState<Meat[]>([]);
  const [editing, setEditing] = useState<Meat | null>(null);
  const [toDelete, setToDelete] = useState<Meat | null>(null);
  const [isFormOpen, setFormOpen] = useState(false);
  const [alert, setAlert] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    try {
      const list = await getMeats();
      setMeats(list);
    } catch (err) {
      console.error(err);
      setAlert({ message: "Failed to load data", type: "error" });
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (m: Meat) => {
    try {
      const saved = m.id
        ? await updateMeat(m.id, { description: m.description, origin: m.origin })
        : await createMeat({ description: m.description, origin: m.origin });
      setMeats((prev) => {
        if (m.id) return prev.map((x) => (x.id === saved.id ? saved : x));
        return [...prev, saved];
      });
      setEditing(null);
      setFormOpen(false);
      setAlert({
        message: m.id ? "Meat updated!" : "Meat added!",
        type: "success"
      });
    } catch (err) {
      console.error(err);
      setAlert({
        message: m.id ? "Failed to update meat" : "Failed to add meat",
        type: "error"
      });
    }
  };

  const handleDelete = async () => {
    if (!toDelete) return;
    try {
      await deleteMeat(toDelete.id);
      setMeats((prev) => prev.filter((x) => x.id !== toDelete.id));
      setToDelete(null);
      setAlert({ message: "Meat deleted!", type: "success" });
    } catch (err) {
      setToDelete(null);
      setAlert({
         message: err instanceof Error
           ? err.message
           : String(err) || "Error deleting meat",
         type: "error",
       });    
      }
  };

  return (
    <>
       {alert && (
         <GlobalAlert
           message={alert.message}
           type={alert.type}
           onDone={() => setAlert(null)}
         />
       )}
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1>Meat Management</h1>
          <p>Create, edit and manage your meat</p>
        </div>
        <button onClick={() => setFormOpen(true)} className={styles.addButton}>
          Add Meat
        </button>
      </header>

      <div className={styles.card}>
        {loading ? (
          <Loader rows={7} columns={4} />
        ) : (
          <MeatList
            meats={meats}
            onEdit={(m) => { setEditing(m); setFormOpen(true); }}
            onDelete={setToDelete}
          />
        )}
      </div>

      <ConfirmDeleteDialog
        open={!!toDelete}
        text={`Delete meat "${toDelete?.description}"?`}
        onCancel={() => setToDelete(null)}
        onConfirm={handleDelete}
        disabled={false}
      />

      <MeatFormDialog
        open={isFormOpen}
        defaultValues={editing || undefined}
        isEditing={!!editing}
        onClose={() => { setFormOpen(false); setEditing(null); }}
        onSubmit={handleSubmit}
      />
    </div>
    </>
  );
}