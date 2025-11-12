import Link from "next/link";

import { Video } from "@/data/videos";
import { formatLikeCount, formatViewCount } from "@/lib/format";

interface VideoMetaProps {
  video: Video;
}

export const VideoMeta: React.FC<VideoMetaProps> = ({ video }) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h1 className="text-xl font-semibold text-zinc-900 dark:text-white">
          {video.title}
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
          <span>{formatViewCount(video.stats.views)}</span>
          <span>•</span>
          <span>{video.stats.uploadedAt}</span>
          <span>•</span>
          <span>{formatLikeCount(video.stats.likes)}</span>
        </div>
      </div>
      <div className="flex flex-col gap-4 rounded-2xl bg-zinc-100 p-4 text-sm text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-zinc-900 dark:text-white">
              {video.channel.name}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {video.channel.subscribers}
            </p>
          </div>
          <Link
            href="#"
            className="rounded-full bg-zinc-900 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Subscribe
          </Link>
        </div>
        <p className="whitespace-pre-line text-sm leading-relaxed">
          {video.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {video.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-zinc-200 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
