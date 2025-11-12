"use client";

import { categories } from "@/data/videos";

interface CategoryFilterProps {
  active: string;
  onSelect: (category: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ active, onSelect }) => {
  return (
    <div className="no-scrollbar flex gap-2 overflow-x-auto pb-2">
      {categories.map((category) => {
        const isActive = active === category || (active === "All" && category === "All");
        return (
          <button
            key={category}
            onClick={() => onSelect(category)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
              isActive
                ? "border-transparent bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                : "border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:border-zinc-700"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};
