import type { Buyer } from "../utils/buyerInterface";

const BASE = "https://localhost:7011/api/buyers";

export async function getBuyers(): Promise<Buyer[]> {
  const res = await fetch(BASE);

  if (!res.ok) {
    let msg = "Failed to fetch buyer list";
    try {
      const body = await res.json();
      if (body?.message) msg = body.message;
    } catch { /* empty */ }
    throw new Error(msg);
  }

  return res.json();
}

export async function createBuyer(data: Omit<Buyer, "id">): Promise<Buyer> {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    let msg = "Failed to create buyer";
    try {
      const body = await res.json();
      if (body?.message) msg = body.message;
    } catch { /* empty */ }
    throw new Error(msg);
  }
  
  return res.json();
}

export async function updateBuyer(
  id: number,
  data: Omit<Buyer, "id">
): Promise<Buyer> {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    let msg = "Failed to update buyer";
    try {
      const body = await res.json();
      if (body?.message) msg = body.message;
    } catch { /* empty */ }
    throw new Error(msg);
  }

  if (res.status === 204) {
    return { id, ...data };
  }

  return res.json();
}

export async function deleteBuyer(id: number): Promise<void> {
  const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });

  if (!res.ok) {
    let msg = "Error deleting buyer";
    try {
      const body = await res.json();
      if (body?.message) msg = body.message;
    } catch { /* empty */ }
    throw new Error(msg);
  }
  
}