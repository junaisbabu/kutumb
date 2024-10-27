import QuoteGallery from "@/components/quote/quote-gallery";
import { Pencil } from "lucide-react";
import Link from "next/link";

async function Page() {
  return (
    <div>
      <QuoteGallery />
      <Link href="/create-quote">
        <div className="fixed bottom-14 right-4 z-20 rounded-full bg-blue-700 p-4 text-primary-foreground transition-transform ease-out hover:scale-110 hover:ease-in dark:bg-yellow-400 sm:bottom-7 sm:right-7">
          <Pencil className="h-6 w-6 md:h-8 md:w-8" />
        </div>
      </Link>
    </div>
  );
}

export default Page;
