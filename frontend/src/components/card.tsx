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
            if (u.hostname.includes("twitter.com")) {
                return url; // Handle differently below
            }
        }catch{
            return null
        }
    }

    const embedUrl = getEmbedLink(link);

    return (
        <div className="flex flex-col bg-white text-[#160C28] rounded-2xl p-2 ">
            {embedUrl?.includes("youtube.com") ? (
        <iframe
          width="100%"
          height="180"
          src={embedUrl}
          title="Embedded content"
          allowFullScreen
        />
      ) : link.includes("twitter.com") ? (
        <blockquote className="twitter-tweet">
          <a href={link}></a>
        </blockquote>
      ) : (
        <p>Cannot embed this URL</p>
      )}
            <div className="border-t flex flex-col">
                <div className="font-semibold text-lg">{title}</div>
                <div className="bg-[#160C28] text-[#EFCB68] rounded-2xl px-2.5 w-fit">{type}</div>
            </div> 
        </div>
    )
}