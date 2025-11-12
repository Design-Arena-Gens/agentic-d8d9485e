import React from "react";

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, title }) => {
  return (
    <div className="relative aspect-video overflow-hidden rounded-2xl bg-black shadow-lg">
      <iframe
        src={`${videoUrl}?rel=0&modestbranding=1&color=white`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="h-full w-full"
      />
    </div>
  );
};
