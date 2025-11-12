import Image from "next/image";
import Link from "next/link";

import { Video } from "@/data/videos";
import { formatLikeCount, formatViewCount } from "@/lib/format";

interface VideoHighlightProps {
  video: Video;
}

export const VideoHighlight: React.FC<VideoHighlightProps> = ({ video }) => {
  return (
    <section className="grid gap-6 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 md:grid-cols-2 md:gap-8 md:p-8">
      <div className="relative aspect-video overflow-hidden rounded-2xl">
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col justify-between">
        <div className="space-y-3">
          <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-red-500">
            Trending now
          </span>
          <h2 className="text-2xl font-semibold leading-tight text-zinc-900 dark:text-white">
            {video.title}
          </h2>
          <p className="line-clamp-4 text-sm text-zinc-600 dark:text-zinc-400">
            {video.description}
          </p>
          <div className="flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
            <span>{video.channel.name}</span>
            <span>•</span>
            <span>{formatViewCount(video.stats.views)}</span>
            <span>•</span>
            <span>{formatLikeCount(video.stats.likes)}</span>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Link
            href={`/watch/${video.id}`}
            className="flex items-center justify-center rounded-full bg-red-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
          >
            Watch now
          </Link>
          <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span>Up next from {video.channel.name}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
