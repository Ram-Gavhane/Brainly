import { useEffect, useRef } from "react";

export default function TweetCard({ tweetUrl }: { tweetUrl: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ((window as any).twttr && ref.current) {
      (window as any).twttr.widgets.load(ref.current);
    }
  }, [tweetUrl]);

  return (
    <div className="bg-white p-2 rounded-xl shadow-lg w-full max-w-[380px] max-h-[400px] overflow-hidden">
      <div ref={ref} className="max-w-full max-h-[400px] overflow-hidden" style={{ maxHeight: '400px', overflow: 'hidden' }}>
        <blockquote className="twitter-tweet" data-width="380" data-dnt="true">
          <a href={tweetUrl}></a>
        </blockquote>
      </div>
    </div>
  );
}
