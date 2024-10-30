"use server";

import { cookies } from "next/headers";
import { logout } from "./auth";

export const getQuotes = async (limit: number, offset: number) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const url = `https://assignment.stage.crafto.app/getQuotes?limit=${limit}&offset=${offset}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    if (response.status === 401) {
      return logout();
    }

    const data = (await response.json()) as GetQuotesResponse;
    return data.data;
  } catch (error: unknown) {
    console.log(error);
    throw new Error(`An error happened: ${error}`);
  }
};
