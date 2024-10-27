import React from "react";
import QuoteCard from "./quote-card";

function QuoteList({ data }: { data: QuoteData[] }) {
  return (
    <ul className="mx-auto grid max-w-screen-xl grid-cols-[repeat(auto-fit,minmax(256px,1fr))] gap-6">
      {data.map((quote) => {
        return (
          <li key={quote.id}>
            <QuoteCard data={quote} />
          </li>
        );
      })}
    </ul>
  );
}

export default QuoteList;
