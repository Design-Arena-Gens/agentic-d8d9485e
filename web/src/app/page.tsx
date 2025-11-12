import { HomeView } from "@/components/HomeView";

interface PageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

const resolveParam = (param?: string | string[]) => {
  if (!param) return "";
  if (Array.isArray(param)) return param[0] ?? "";
  return param;
};

export default function Page({ searchParams }: PageProps) {
  const query = resolveParam(searchParams?.q);
  const category = resolveParam(searchParams?.category);

  return <HomeView key={`${query}-${category}`} initialQuery={query} initialCategory={category} />;
}
