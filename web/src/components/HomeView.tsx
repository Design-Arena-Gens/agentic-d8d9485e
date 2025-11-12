"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { CategoryFilter } from "@/components/CategoryFilter";
import { Header } from "@/components/Header";
import { VideoCard } from "@/components/VideoCard";
import { VideoHighlight } from "@/components/VideoHighlight";
import { categories, videos } from "@/data/videos";

interface HomeViewProps {
  initialQuery?: string;
  initialCategory?: string;
}

const buildSearchParams = (query: string, category: string) => {
  const params = new URLSearchParams();
  const trimmedQuery = query.trim();
  const normalizedCategory = categories.includes(category) ? category : "All";
  if (trimmedQuery.length > 0) {
    params.set("q", trimmedQuery);
  }
  if (normalizedCategory !== "All") {
    params.set("category", normalizedCategory);
  }
  return params;
};

export const HomeView: React.FC<HomeViewProps> = ({ initialQuery = "", initialCategory = "All" }) => {
  const normalizedCategory = categories.includes(initialCategory) ? initialCategory : "All";
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState(normalizedCategory);
  const router = useRouter();

  const hasFiltersApplied = searchQuery.trim().length > 0 || activeCategory !== "All";

  const filteredVideos = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return videos.filter((video) => {
      const matchesCategory = activeCategory === "All" || video.category === activeCategory;
      const matchesQuery =
        !query ||
        video.title.toLowerCase().includes(query) ||
        video.description.toLowerCase().includes(query) ||
        video.channel.name.toLowerCase().includes(query) ||
        video.tags.some((tag) => tag.toLowerCase().includes(query));
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  const highlightedVideo = useMemo(() => {
    if (filteredVideos.length > 0) {
      return filteredVideos[0];
    }
    if (!hasFiltersApplied) {
      return videos[0];
    }
    return undefined;
  }, [filteredVideos, hasFiltersApplied]);

  const restVideos = useMemo(() => {
    if (filteredVideos.length > 0) {
      return filteredVideos.slice(highlightedVideo ? 1 : 0);
    }
    if (!hasFiltersApplied) {
      return videos.slice(highlightedVideo ? 1 : 0);
    }
    return [];
  }, [filteredVideos, hasFiltersApplied, highlightedVideo]);

  const pushRoute = (query: string, category: string) => {
    const params = buildSearchParams(query, category);
    const queryString = params.toString();
    router.push(queryString.length ? `/?${queryString}` : "/", { scroll: false });
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    pushRoute(value, activeCategory);
  };

  const handleCategorySelect = (category: string) => {
    setActiveCategory(category);
    pushRoute(searchQuery, category);
  };

  const handleMobileSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const value = formData.get("search");
    handleSearch(typeof value === "string" ? value : "");
  };

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans text-zinc-900 dark:bg-zinc-950 dark:text-white">
      <Header onSearch={handleSearch} initialQuery={searchQuery} />
      <main className="flex-1 px-4 pb-16 pt-6 md:px-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
          <div className="md:hidden">
            <form
              onSubmit={handleMobileSearch}
              className="flex w-full items-center overflow-hidden rounded-full border border-zinc-200 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-200 dark:border-zinc-800 dark:bg-zinc-900 dark:focus-within:ring-blue-500"
            >
              <input
                name="search"
                defaultValue={searchQuery}
                placeholder="Search"
                className="flex-1 bg-transparent px-4 py-2 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-white"
              />
              <button type="submit" className="h-full px-4 text-sm font-semibold text-blue-500">
                Go
              </button>
            </form>
          </div>

          <CategoryFilter active={activeCategory} onSelect={handleCategorySelect} />

          {highlightedVideo && <VideoHighlight video={highlightedVideo} />}

          <section className="space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                {hasFiltersApplied ? "Results" : "Recommended for you"}
              </h2>
              {searchQuery.trim() && (
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Showing {filteredVideos.length} video{filteredVideos.length === 1 ? "" : "s"} for &ldquo;
                  {searchQuery.trim()}
                  &rdquo;
                </p>
              )}
            </div>

            {restVideos.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {restVideos.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-zinc-300 bg-white p-10 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
                No videos found. Try adjusting your search or switching categories.
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};
