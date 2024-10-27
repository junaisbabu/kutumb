"use client";

import Image from "next/image";
import { format } from "date-fns";
import { Card, CardContent, CardFooter } from "../ui/card";
import { User } from "lucide-react";

function QuoteCard({ data }: { data: QuoteData }) {
  const createdAt = format(new Date(data.createdAt), "MMM dd, yyyy");

  const isImageValid = data.mediaUrl?.startsWith("http");

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative h-full min-h-64 overflow-y-auto">
          {data.mediaUrl && isImageValid && (
            <Image
              className="object-cover"
              src={data.mediaUrl}
              alt={data.mediaUrl}
              fill
            />
          )}
          <p className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform whitespace-pre-wrap rounded-sm bg-primary/80 px-1 text-center text-primary-foreground">
            {data.text}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex items-center gap-3 px-4 py-2.5">
        <span className="flex items-center gap-1 font-semibold">
          <User className="max-h-6 min-h-6 min-w-6 max-w-6 rounded-full border p-1 shadow-sm" />
          {data.username}
        </span>
        <span className="text-right text-sm">{createdAt}</span>
      </CardFooter>
    </Card>
  );
}

export default QuoteCard;
