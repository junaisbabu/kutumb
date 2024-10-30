"use server";

import { cookies } from "next/headers";

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
}

export async function hasSession() {
  const cookieStore = await cookies();
  return cookieStore.has("token");
}
