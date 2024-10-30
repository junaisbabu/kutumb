import { getQuotes } from "@/app/actions/get-quotes";
import QuoteList from "@/components/quote/quote-list";
import { Pencil } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import jwt from "jsonwebtoken";

const INITIAL_NUMBER_OF_QUOTES = 0;

async function Page() {
  const initialQuotes = (await getQuotes(INITIAL_NUMBER_OF_QUOTES, 0)) || [];
  const cookie = (await cookies()).get("token")?.value;

  const decoded = jwt.decode(cookie || "") as JWTTokenData;

  return (
    <div className="mx-auto max-w-[1350px]">
      <h1 className="mb-10 text-xl font-extrabold capitalize">
        Welcome {decoded.username}
      </h1>
      <QuoteList initialQuotes={initialQuotes} />
      <Link href="/create-quote">
        <div className="fixed bottom-14 right-4 z-20 rounded-full bg-blue-700 p-4 text-primary-foreground shadow-lg transition-transform ease-out hover:scale-110 hover:ease-in dark:bg-yellow-400 sm:bottom-7 sm:right-7">
          <Pencil className="h-6 w-6 md:h-8 md:w-8" />
        </div>
      </Link>
    </div>
  );
}

export default Page;
