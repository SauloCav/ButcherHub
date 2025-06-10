import type { Order } from "../types/order";

const BASE = "https://localhost:7011/api/orders";

export async function getOrders(): Promise<Order[]> {
  const res = await fetch(BASE);

  if (!res.ok) {
    let msg = "Failed to fetch order list";
    try {
      const body = await res.json();
      if (body?.message) msg = body.message;
    } catch { /* empty */ }
    throw new Error(msg);
  }

  return res.json();
}

export async function createOrder(o: Omit<Order, "id">): Promise<Order> {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(o),
  });

  if (!res.ok) {
    let msg = "Failed to create order";
    try {
      const body = await res.json();
      if (body?.message) msg = body.message;
    } catch { /* empty */ }
    throw new Error(msg);
  }

  return res.json();
}

export async function updateOrder(o: Order): Promise<Order> {
  const res = await fetch(`${BASE}/${o.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(o),
  });

  if (!res.ok) {
    let msg = "Failed to update order";
    try {
      const body = await res.json();
      if (body?.message) msg = body.message;
    } catch { /* empty */ }
    throw new Error(msg);
  }

  return res.json();
}

export async function deleteOrder(id: number): Promise<void> {
  const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });

  if (!res.ok) {
    let msg = "Failed to delete order";
    try {
      const body = await res.json();
      if (body?.message) msg = body.message;
    } catch { /* empty */ }
    throw new Error(msg);
  }
}