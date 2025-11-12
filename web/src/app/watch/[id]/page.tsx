import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { WatchView } from "@/components/WatchView";
import { videos } from "@/data/videos";

const getVideo = (id: string) => videos.find((video) => video.id === id);

export const generateMetadata = ({ params }: { params: { id: string } }): Metadata => {
  const video = getVideo(params.id);
  if (!video) {
    return {
      title: "Video not found | Streamline",
    };
  }

  return {
    title: `${video.title} | Streamline`,
    description: video.description,
    openGraph: {
      title: video.title,
      description: video.description,
      images: [
        {
          url: video.thumbnail,
          width: 1280,
          height: 720,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: video.title,
      description: video.description,
      images: [video.thumbnail],
    },
  };
};

export default function WatchPage({ params }: { params: { id: string } }) {
  const video = getVideo(params.id);

  if (!video) {
    notFound();
  }

  const relatedByCategory = videos.filter((item) => item.id !== video.id && item.category === video.category);
  const relatedByAffinity = videos.filter(
    (item) =>
      item.id !== video.id &&
      item.category !== video.category &&
      item.tags.some((tag) => video.tags.includes(tag)),
  );

  const filler = videos.filter(
    (item) => item.id !== video.id && !relatedByCategory.includes(item) && !relatedByAffinity.includes(item),
  );

  const relatedVideos = [...relatedByCategory, ...relatedByAffinity, ...filler].slice(0, 8);

  return <WatchView video={video} relatedVideos={relatedVideos} />;
}
