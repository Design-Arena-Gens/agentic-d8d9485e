"use client";

import { useRouter } from "next/navigation";

import { CommentList } from "@/components/CommentList";
import { Header } from "@/components/Header";
import { UpNextList } from "@/components/UpNextList";
import { VideoMeta } from "@/components/VideoMeta";
import { VideoPlayer } from "@/components/VideoPlayer";
import type { Video } from "@/data/videos";

interface WatchViewProps {
  video: Video;
  relatedVideos: Video[];
}

export const WatchView: React.FC<WatchViewProps> = ({ video, relatedVideos }) => {
  const router = useRouter();

  const handleSearch = (value: string) => {
    const query = value.trim();
    if (query.length > 0) {
      router.push(`/?q=${encodeURIComponent(query)}`);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-zinc-950">
      <Header onSearch={handleSearch} initialQuery="" />
      <main className="flex-1 px-4 pb-16 pt-6 md:px-8">
        <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-6">
            <VideoPlayer videoUrl={video.videoUrl} title={video.title} />
            <VideoMeta video={video} />
            <CommentList comments={video.comments} />
          </div>
          <div className="space-y-6">
            {relatedVideos.length > 0 ? (
              <UpNextList videos={relatedVideos} />
            ) : (
              <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-6 text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
                No more videos in this category. Discover something new on the home page.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
