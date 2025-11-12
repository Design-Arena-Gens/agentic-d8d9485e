import Image from "next/image";
import Link from "next/link";

import { Video } from "@/data/videos";
import { formatViewCount } from "@/lib/format";

interface VideoCardProps {
  video: Video;
  layout?: "grid" | "list";
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, layout = "grid" }) => {
  const isList = layout === "list";

  return (
    <Link
      href={`/watch/${video.id}`}
      className={`group flex w-full gap-3 ${isList ? "flex-col md:flex-row" : "flex-col"}`}
    >
      <div
        className={`relative overflow-hidden rounded-2xl bg-zinc-200 transition group-hover:scale-[1.01] ${
          isList ? "aspect-video w-full md:w-56" : "aspect-video w-full"
        }`}
      >
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          sizes={isList ? "(max-width: 768px) 100vw, 224px" : "(max-width: 768px) 100vw, 33vw"}
          className="object-cover"
        />
        <span className="absolute bottom-2 right-2 rounded bg-black/75 px-2 py-0.5 text-xs font-semibold text-white">
          {video.stats.duration}
        </span>
      </div>
      <div className="flex w-full gap-3">
        {!isList && (
          <div className="mt-1 h-10 w-10 shrink-0 overflow-hidden rounded-full">
            <Image
              src={video.channel.avatar}
              alt={video.channel.name}
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover"
            />
          </div>
        )}
        <div className="flex flex-col">
          <h3 className="line-clamp-2 text-sm font-semibold text-zinc-900 transition group-hover:text-red-500 dark:text-zinc-100 dark:group-hover:text-red-400">
            {video.title}
          </h3>
          <span className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{video.channel.name}</span>
          <span className="text-xs text-zinc-500 dark:text-zinc-500">
            {formatViewCount(video.stats.views)} · {video.stats.uploadedAt}
          </span>
        </div>
      </div>
    </Link>
  );
};
