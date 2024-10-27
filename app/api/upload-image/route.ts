import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const reqBlob = await req.blob();

  const formData = new FormData();
  formData.append("file", reqBlob);

  const file = formData.get("file");

  if (file) {
    const res = await fetch(
      `https://crafto.app/crafto/v1.0/media/assignment/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await res.json();

    return new Response(JSON.stringify(data), {
      status: 200,
    });
  }
}
