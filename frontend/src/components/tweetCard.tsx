import { useEffect, useRef } from "react";

export default function TweetCard({ tweetUrl }: { tweetUrl: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ((window as any).twttr && ref.current) {
      (window as any).twttr.widgets.load(ref.current);
    }
  }, [tweetUrl]);

  return (
    <div className="bg-white p-4 rounded-xl shadow-lg w-fit">
      <div ref={ref}>
        <blockquote className="twitter-tweet">
          <a href={tweetUrl}></a>
        </blockquote>
      </div>
    </div>
  );
}
