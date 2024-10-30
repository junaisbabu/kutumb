"use client";

import React, { useEffect, useState } from "react";
import QuoteCard from "./quote-card";
import { getQuotes } from "@/app/actions/get-quotes";
import { useInView } from "react-intersection-observer";
import { LoaderCircle } from "lucide-react";

const NUMBER_OF_QUOTES_TO_FETCH = 10;

function QuoteList({ initialQuotes }: { initialQuotes: QuoteData[] }) {
  const [offset, setOffset] = useState(NUMBER_OF_QUOTES_TO_FETCH);
  const [quotes, setQuotes] = useState<QuoteData[]>(initialQuotes);
  const { ref, inView } = useInView();

  const loadMoreUsers = async () => {
    const newQuotes = await getQuotes(NUMBER_OF_QUOTES_TO_FETCH, offset);
    if (!newQuotes?.length) return;
    setQuotes((oldQuotes) => [...oldQuotes, ...newQuotes]);
    setOffset((offset) => offset + NUMBER_OF_QUOTES_TO_FETCH);
  };

  useEffect(() => {
    if (inView) {
      loadMoreUsers();
    }
  }, [inView]);

  return (
    <div>
      <ul className="mx-auto grid max-w-[1000px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
        {quotes.map((quote) => {
          return (
            <li key={quote.id}>
              <QuoteCard quote={quote} />
            </li>
          );
        })}
      </ul>
      <div className="py-8">
        <div className="flex flex-col gap-1 text-center text-primary" ref={ref}>
          <LoaderCircle className="mx-auto animate-spin" size={40} />
          <span>Loading more...</span>
        </div>
      </div>
    </div>
  );
}

export default QuoteList;
