"use client";

import Image from "next/image";
import { Card, CardContent, CardFooter } from "../ui/card";
import { useState } from "react";
import { cn } from "@/lib/utils";

function QuoteCard({ quote }: { quote: QuoteData }) {
  const [readMore, setReadMore] = useState(false);
  const createdAt = new Date(quote.createdAt);

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
    timeZone: "Asia/Kolkata",
    timeZoneName: "short",
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    createdAt,
  );

  const isImageValid = quote.mediaUrl?.startsWith("http");

  return (
    <Card className="h-full w-full overflow-hidden p-0">
      <CardContent className="p-4">
        <div className="relative h-[440px] w-full overflow-hidden rounded-lg bg-secondary">
          {quote.mediaUrl && isImageValid && (
            <Image
              className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 transform overflow-hidden object-contain"
              src={quote.mediaUrl}
              alt={quote.mediaUrl}
              width={100}
              height={100}
              unoptimized
            />
          )}
          <div className="absolute bottom-0 z-10 flex w-full flex-col items-center bg-primary/80 px-4 py-1 text-sm text-primary-foreground">
            <small className="capitalize">by {quote.username}</small>
            <small className="text-center">on {formattedDate}</small>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex h-fit items-center gap-3 overflow-hidden px-4">
        <div
          className={cn(
            "flex max-h-[70px] min-h-fit items-start overflow-hidden",
            {
              "max-h-fit": readMore,
            },
          )}
        >
          <p className="text-primary">
            {quote.text.length > 60 && !readMore ? (
              <>{quote.text.slice(0, 60)}</>
            ) : (
              quote.text
            )}
            {quote.text.length > 60 && (
              <span
                className="ml-2 cursor-pointer font-semibold text-blue-600"
                onClick={() => setReadMore(!readMore)}
              >
                {readMore ? "Read less" : "Read more..."}
              </span>
            )}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}

export default QuoteCard;
