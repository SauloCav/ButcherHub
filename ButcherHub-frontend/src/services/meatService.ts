import type { Meat, MeatOrigin } from "../types/meat";
import { originMap } from "../utils/originMap";

const BASE = "https://localhost:7011/api/meats";

export async function getMeats(): Promise<Meat[]> {
  const res = await fetch(BASE);

  if (!res.ok) {
    let msg = "Failed to fetch meat list";
    try {
      const body = await res.json();
      if (body?.message) msg = body.message;
    } catch { /* empty */ }
    throw new Error(msg);
  }

  return res.json();
}

export async function createMeat(data: {
  description: string;
  origin: MeatOrigin;
}): Promise<Meat> {
  const payload = {
    description: data.description,
    origin: originMap[data.origin],
  };
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  
  if (!res.ok) {
    let msg = "Failed to create meat";
    try {
      const body = await res.json();
      if (body?.message) msg = body.message;
    } catch { /* empty */ }
    throw new Error(msg);
  }

  return res.json();
}

export async function updateMeat(
  id: number,
  data: { description: string; origin: MeatOrigin }
): Promise<Meat> {
  const payload = {
    description: data.description,
    origin:      originMap[data.origin],
  };
  const res = await fetch(`${BASE}/${id}`, {
    method:  "PUT",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(payload),
  });

  if (!res.ok) {
    let msg = "Failed to update meat";
    try {
      const body = await res.json();
      if (body?.message) msg = body.message;
    } catch { /* empty */ }
    throw new Error(msg);
  }

  if (res.status === 204) {
    return { id, description: data.description, origin: data.origin };
  }

  return res.json();
}

export async function deleteMeat(id: number): Promise<void> {
  const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
  
  if (!res.ok) {
    let msg = "Error deleting meat";
    try {
      const body = await res.json();
      if (body?.message) msg = body.message;
    } catch { /* empty */ }
    throw new Error(msg);
  }
}