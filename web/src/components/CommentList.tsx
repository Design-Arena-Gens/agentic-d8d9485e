import Image from "next/image";

import { Comment } from "@/data/videos";
import { formatCompactNumber } from "@/lib/format";

interface CommentListProps {
  comments: Comment[];
}

export const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <section className="space-y-6">
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
        {comments.length} Comments
      </h3>
      <div className="space-y-6">
        {comments.map((comment) => (
          <article key={comment.id} className="flex gap-4">
            <Image
              src={comment.avatar}
              alt={comment.author}
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold text-zinc-900 dark:text-white">
                  {comment.author}
                </span>
                <span className="text-zinc-500 dark:text-zinc-400">
                  {comment.publishedAt}
                </span>
              </div>
              <p className="text-sm text-zinc-700 dark:text-zinc-300">
                {comment.text}
              </p>
              <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
                <span>👍 {formatCompactNumber(comment.likes)}</span>
                <button className="font-medium text-blue-500 hover:underline">
                  Reply
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
