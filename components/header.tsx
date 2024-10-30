"use client";

import Link from "next/link";
import ThemeToggler from "./theme-toggler";
import { Button } from "./ui/button";
import { logout } from "@/app/actions/auth";
import { usePathname } from "next/navigation";

function Header() {
  const path = usePathname();

  return (
    <header className="px-6 shadow-md dark:border-b">
      <div className="mx-auto flex h-16 w-full max-w-[1350px] items-center justify-between gap-4">
        <h1 className="text-lg font-bold sm:text-xl">
          Quote App by{" "}
          <Link
            className="whitespace-nowrap text-blue-700 dark:text-yellow-400"
            href="https://junaisbabu.vercel.app"
          >
            Junais Babu
          </Link>
        </h1>
        <div className="flex items-center gap-4">
          <ThemeToggler />
          {path.includes("/login") ? null : (
            <Button
              variant="destructive"
              onClick={async () => {
                await logout();
              }}
            >
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
