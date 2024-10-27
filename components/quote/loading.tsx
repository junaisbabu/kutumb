import React from "react";
import { SkeletonCard } from "./skeleton-card";

function Loading() {
  return (
    <div className="mx-auto grid max-w-screen-xl grid-cols-[repeat(auto-fit,minmax(256px,1fr))] gap-6">
      {Array(8)
        .fill("")
        .map((_: unknown, index: number) => (
          <SkeletonCard key={index} />
        ))}
    </div>
  );
}

export default Loading;
