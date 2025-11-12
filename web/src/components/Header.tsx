"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Search, Menu, Bell, Video, UserCircle } from "lucide-react";

interface HeaderProps {
  onSearch: (value: string) => void;
  initialQuery?: string;
}

export const Header: React.FC<HeaderProps> = ({ onSearch, initialQuery = "" }) => {
  const [value, setValue] = useState(initialQuery);

  useEffect(() => {
    setValue(initialQuery);
  }, [initialQuery]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(value.trim());
  };

  return (
    <header className="sticky top-0 z-40 flex items-center gap-4 border-b border-zinc-200 bg-white/90 px-4 py-3 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
      <div className="flex items-center gap-3">
        <button className="rounded-full p-2 text-zinc-500 transition hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900">
          <Menu className="h-5 w-5" />
        </button>
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-sm font-semibold text-white">
            ▶
          </div>
          <span className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">
            Streamline
          </span>
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mx-auto hidden w-full max-w-2xl items-center overflow-hidden rounded-full border border-zinc-200 bg-zinc-50 shadow-sm ring-0 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 dark:border-zinc-800 dark:bg-zinc-900 dark:focus-within:ring-blue-500 md:flex"
      >
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Search"
          className="flex-1 bg-transparent px-5 py-2.5 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-white"
        />
        <button
          type="submit"
          className="flex h-full items-center justify-center border-l border-zinc-200 bg-zinc-100 px-4 text-zinc-600 transition hover:bg-zinc-200 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          <Search className="h-5 w-5" />
        </button>
      </form>

      <div className="ml-auto flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
        <button className="rounded-full p-2 transition hover:bg-zinc-100 dark:hover:bg-zinc-900">
          <Video className="h-5 w-5" />
        </button>
        <button className="rounded-full p-2 transition hover:bg-zinc-100 dark:hover:bg-zinc-900">
          <Bell className="h-5 w-5" />
        </button>
        <button className="hidden items-center gap-2 rounded-full border border-zinc-200 px-3 py-1.5 text-sm font-medium text-zinc-800 transition hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-900 md:flex">
          <UserCircle className="h-5 w-5" />
          Sign in
        </button>
      </div>
    </header>
  );
};
