import { Video } from "@/data/videos";
import { VideoCard } from "./VideoCard";

interface UpNextListProps {
  videos: Video[];
  heading?: string;
}

export const UpNextList: React.FC<UpNextListProps> = ({ videos, heading = "Up next" }) => {
  return (
    <aside className="space-y-4">
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">{heading}</h3>
      <div className="space-y-6">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} layout="list" />
        ))}
      </div>
    </aside>
  );
};
