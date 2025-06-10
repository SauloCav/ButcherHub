import { useState, useEffect, useMemo } from "react";
import type { Order } from "../../types/order";
import type { Buyer } from "../../utils/buyerInterface";
import type { Meat } from "../../types/meat";
import { OrderList } from "../../components/OrderManagement/OrderList/OrderList";
import { OrderFormDialog } from "../../components/OrderManagement/OrderFormDialog/OrderFormDialog";
import { ConfirmDeleteDialog } from "../../components/OrderManagement/ConfirmDeleteDialog/ConfirmDeleteDialog";
import * as orderService from "../../services/orderService";
import * as buyerService from "../../services/buyerService";
import * as meatService from "../../services/meatService";
import { GlobalAlert } from "../../components/Global/GlobalAlert/GlobalAlert";
import { Loader } from "../../components/Global/Loader/Loader";
import styles from "./OrderManagementPage.module.css";
import { OrderFilter, type OrderFilterValues } from "../../components/OrderManagement/OrderFilter/OrderFilter";

export default function OrderManagementPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [meats, setMeats] = useState<Meat[]>([]);
  const [editing, setEditing] = useState<Order | null>(null);
  const [toDelete, setToDelete] = useState<Order | null>(null);
  const [openForm, setOpenForm] = useState(false);
  const [filter, setFilter] = useState<OrderFilterValues>({ buyerId: "", date: "" });

  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

  useEffect(() => {
    loadAll();
  }, []);

  const filtered = useMemo(() => {
    return orders.filter((o) => {
    const byBuyer = filter.buyerId === "" || o.buyerId === filter.buyerId;
    const byDate =
        !filter.date ||
        o.orderDate.slice(0, 10) === filter.date;
      return byBuyer && byDate;
    });
  }, [orders, filter]);

  async function loadAll() {
    setLoading(true);
    try {
      const [os, bs, ms] = await Promise.all([
        orderService.getOrders(),
        buyerService.getBuyers(),
        meatService.getMeats(),
      ]);
      setOrders(os);
      setBuyers(bs);
      setMeats(ms);
    } catch (err) {
      console.error(err);
      setAlert({ message: "Failed to load data", type: "error" });
    } finally {
      setLoading(false);
    }
  }

  const onAdd = () => {
    setEditing(null);
    setOpenForm(true);
  };
  const onEdit = (o: Order) => {
    setEditing(o);
    setOpenForm(true);
  };

  const handleSubmit = async (o: Order) => {
    try {
      if (editing) {
        const upd = await orderService.updateOrder(o);
        setOrders((prev) => prev.map((x) => (x.id === upd.id ? upd : x)));
        setAlert({ message: "Order updated!", type: "success" });
      } else {
        const { ...rest } = o;
        const created = await orderService.createOrder(rest);
        setOrders((prev) => [...prev, created]);
        setAlert({ message: "Order created!", type: "success" });
      }
      setOpenForm(false);
    } catch (err) {
      console.error(err);
      setOpenForm(false);
      setAlert({
        message: err instanceof Error ? err.message : "Error saving order",
        type: "error",
      });
    }
  };

  const handleDelete = async () => {
    if (!toDelete) return;
    try {
      await orderService.deleteOrder(toDelete.id);
      setOrders((prev) => prev.filter((x) => x.id !== toDelete.id));
      setToDelete(null);
      setAlert({ message: "Order deleted!", type: "success" });
    } catch (err) {
      console.error(err);
      setAlert({
        message: "Error deleting order",
        type: "error",
      });
    }
  };

  return (
    <>
      <div className={styles.container}>
        {alert && (
          <GlobalAlert
            message={alert.message}
            type={alert.type}
            onDone={() => setAlert(null)}
          />
        )}
        <header className={styles.header}>
          <div>
            <h1>Order Management</h1>
            <p>Create, edit and manage your orders.</p>
          </div>
          <button onClick={onAdd} className={styles.addButton}>
            Add Order
          </button>
        </header>


        <div className={styles.card}>
          <OrderFilter
            buyers={buyers}
            values={filter}
            onChange={setFilter}
          />

          {loading ? (
            <Loader rows={6} columns={5} />
          ) : (
            <OrderList
              orders={filtered}
              onEdit={onEdit}
              onDelete={setToDelete}
            />
          )}
        </div>

        <ConfirmDeleteDialog
          open={!!toDelete}
          text={`Delete order #${toDelete?.id}?`}
          onCancel={() => setToDelete(null)}
          onConfirm={handleDelete}
          disabled={false}
        />

        <OrderFormDialog
          open={openForm}
          buyers={buyers}
          meats={meats}
          defaultValues={editing}
          isEditing={!!editing}
          onClose={() => setOpenForm(false)}
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
}