import { useState, useEffect } from "react";
import type { Buyer } from "../../utils/buyerInterface";
import {
  getBuyers,
  createBuyer,
  updateBuyer,
  deleteBuyer,
} from "../../services/buyerService";
import { BuyerList } from "../../components/BuyerManagement/BuyerList/BuyerList";
import { BuyerFormDialog } from "../../components/BuyerManagement/BuyerFormDialog/BuyerFormDialog";
import { ConfirmDeleteDialog } from "../../components/BuyerManagement/ConfirmDeleteDialog/ConfirmDeleteDialog";
import { GlobalAlert } from "../../components/Global/GlobalAlert/GlobalAlert";
import { Loader } from "../../components/Global/Loader/Loader";
import styles from "./BuyerManagementPage.module.css";

export default function BuyerManagementPage() {
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [editingBuyer, setEditingBuyer] = useState<Buyer | null>(null);
  const [buyerToDelete, setBuyerToDelete] = useState<Buyer | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [alert, setAlert] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    try {
      const list = await getBuyers();
      setBuyers(list);
    } catch (err) {
      console.error(err);
      setAlert({ message: "Failed to load data", type: "error" });
    } finally {
      setLoading(false);
    }
  }

  const handleFormSubmit = async (data: Buyer) => {
    try {
      let saved: Buyer;
      if (editingBuyer) {
        saved = await updateBuyer(editingBuyer.id, {
          name: data.name,
          documentType: data.documentType,
          documentNumber: data.documentNumber,
          city: data.city,
          state: data.state,
        });
        setBuyers((prev) =>
          prev.map((b) => (b.id === saved.id ? saved : b))
        );
        setAlert({ message: "Buyer updated!", type: "success" });
      } else {
        saved = await createBuyer({
          name: data.name,
          documentType: data.documentType,
          documentNumber: data.documentNumber,
          city: data.city,
          state: data.state,
        });
        setBuyers((prev) => [...prev, saved]);
        setAlert({ message: "Buyer added!", type: "success" });
      }
    } catch (err) {
      console.error(err);
      setAlert({
        message: err instanceof Error ? err.message : "Failed to save buyer",
        type: "error",
      });
    } finally {
      setIsFormOpen(false);
      setEditingBuyer(null);
    }
  };

  const handleDelete = async () => {
    if (!buyerToDelete) return;
    try {
      await deleteBuyer(buyerToDelete.id);
      setBuyers((prev) =>
        prev.filter((b) => b.id !== buyerToDelete.id)
      );
      setAlert({ message: "Buyer deleted!", type: "success" });
    } catch (err) {
      console.error(err);
      setAlert({
        message: err instanceof Error ? err.message : "Error deleting buyer",
        type: "error",
      });
    } finally {
      setBuyerToDelete(null);
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
            <h1>Buyer Management</h1>
            <p>Create, edit and manage your buyers</p>
          </div>
          <button
            onClick={() => {
              setEditingBuyer(null);
              setIsFormOpen(true);
            }}
            className={styles.addButton}
          >
            Add Buyer
          </button>
        </header>

        <div className={styles.card}>
          {loading ? (
            <Loader rows={7} columns={4} />
          ) : (
            <BuyerList
              buyers={buyers}
              onEdit={(b) => {
                setEditingBuyer(b);
                setIsFormOpen(true);
              }}
              onDelete={setBuyerToDelete}
            />
          )}
        </div>

        <ConfirmDeleteDialog
          open={!!buyerToDelete}
          buyerName={buyerToDelete?.name ?? ""}
          onCancel={() => setBuyerToDelete(null)}
          onConfirm={handleDelete}
          disabled={false}
        />

        <BuyerFormDialog
          open={isFormOpen}
          defaultValues={editingBuyer ?? undefined}
          isEditing={!!editingBuyer}
          onClose={() => {
            setIsFormOpen(false);
            setEditingBuyer(null);
          }}
          onSubmit={handleFormSubmit}
        />
      </div>
    </>
  );
}