import { logout } from "@/app/actions/auth";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const quoteData = await req.json();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (token) {
      const res = await fetch(`https://assignment.stage.crafto.app/postQuote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(quoteData),
      });

      if (res.status === 401) {
        return logout();
      }

      const data = await res.json();

      return new Response(JSON.stringify(data), {
        status: res.status,
      });
    }
  } catch (error) {
    console.error("Error while submitting quote:", error);

    return new Response(
      JSON.stringify({
        message: "An error occurred",
        error: (error as Error).message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
