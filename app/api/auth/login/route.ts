import { type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const userData = await req.json();

    const res = await fetch("https://assignment.stage.crafto.app/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      const errorData = await res.text();
      return new Response(
        JSON.stringify({ message: "Login failed", error: errorData }),
        {
          status: res.status,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const data = await res.json();

    return new Response("Logged In Successfully!", {
      status: 201,
      headers: {
        "Set-Cookie": `token=${data.token}; path=/; samesite=lax; httponly=true;`,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error during login:", error);

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
