"use client";

import Link from "next/link";
import ThemeToggler from "./theme-toggler";

function Header() {
  return (
    <header className="px-6 shadow-md dark:border-b">
      <div className="mx-auto flex h-16 w-full max-w-screen-xl items-center justify-between gap-4">
        <h1 className="text-lg font-bold sm:text-xl">
          Quote App by{" "}
          <Link
            className="whitespace-nowrap text-blue-700 dark:text-yellow-400"
            href="https://junaisbabu.vercel.app"
          >
            Junais Babu
          </Link>
        </h1>
        <ThemeToggler />
      </div>
    </header>
  );
}

export default Header;
