"use client";

import { useEffect, useState } from "react";
import QuoteList from "./quote-list";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Loading from "./loading";

enum PaginateAction {
  PREVIOUS = "PREVIOUS",
  NEXT = "NEXT",
}

function QuoteGallery() {
  const [quotes, setQuotes] = useState<QuoteData[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [stopPagination, setStopPagination] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePagination = (action: PaginateAction) => {
    switch (action) {
      case PaginateAction.PREVIOUS:
        setOffset((prevOffset) => Math.max(Number(prevOffset - 20), 0));
        break;

      case PaginateAction.NEXT:
        setOffset((prevOffset) => Number(prevOffset + 20));
        break;
    }
  };

  const getQuotes = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/quote/get-quotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          limit: 20,
          offset,
        }),
      });

      const data = await res.json();

      // data -> {error: "Invalid token"}

      if (!data.data.length) {
        handlePagination(PaginateAction.PREVIOUS);
        setStopPagination(Math.max(Number(offset - 20), 0));
      } else if (data.data.length < 20) {
        setStopPagination(offset);
        setQuotes(data.data);
      } else {
        setQuotes(data.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getQuotes();
  }, [offset]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="space-y-8">
      <QuoteList data={quotes} />
      <div className="fixed bottom-4 left-1/2 z-20 flex -translate-x-1/2 transform items-center justify-center gap-4 sm:bottom-8">
        <Button
          className="transition-all"
          variant={offset === 0 ? "destructive" : "outline"}
          disabled={offset === 0}
          onClick={() => handlePagination(PaginateAction.PREVIOUS)}
        >
          <ChevronLeft />
          Previous
        </Button>
        <Button
          className="transition-all"
          variant={offset === stopPagination ? "destructive" : "default"}
          disabled={offset === stopPagination}
          onClick={() => handlePagination(PaginateAction.NEXT)}
        >
          Next <ChevronRight />
        </Button>
      </div>
    </div>
  );
}

export default QuoteGallery;
