import TweetCard from "./tweetCard";

export function Card({title, link, type}:{
    title: string,
    link: string,
    type: string
}){

    function getEmbedLink(url:string){
        try{
            const u = new URL(url);

            // YouTube
            if (u.hostname.includes("youtube.com") || u.hostname.includes("youtu.be")) {
                const videoId =
                u.hostname === "youtu.be"
                    ? u.pathname.slice(1)
                    : u.searchParams.get("v");
                return `https://www.youtube.com/embed/${videoId}`;
            }

            // Twitter (you may need Twitter widget SDK instead of iframe)
            if (u.hostname.includes("x.com")) {
                url = url.replace("x.com","twitter.com")
                return url; // Handle differently below
            }
        }catch{
            return null
        }
    }

    const embedUrl = getEmbedLink(link);

    return (
        <div className="flex flex-col bg-white text-[#160C28] rounded-2xl p-2 w-full max-w-[400px] max-h-[600px] overflow-hidden card-container">
            <div className="overflow-hidden rounded-xl max-h-[400px] flex-shrink-0">
                {embedUrl?.includes("youtube.com") ? (
            <iframe
              width="100%"
              height="200"
              src={embedUrl}
              title="Embedded content"
              allowFullScreen
              style={{ maxWidth: "100%", maxHeight: "200px" }}
              className="object-contain"
            />
          ) : link.includes("x.com") ? (
            <div className="max-w-full max-h-[400px] overflow-hidden">
                <TweetCard tweetUrl={embedUrl || link} />
            </div>

          ) : (
            <p className="p-4 max-h-[200px] overflow-hidden text-ellipsis">Cannot embed this URL</p>
          )}
            </div>
            <div className="border-t flex flex-col mt-2 pt-2 flex-shrink-0 min-h-0">
                <div className="font-semibold text-lg break-words line-clamp-2">{title}</div>
                <div className="bg-[#160C28] text-[#EFCB68] rounded-2xl px-2.5 w-fit mt-1">{type}</div>
            </div> 
        </div>
    )
}