import { useEffect, useRef } from "react";

type CardProps = {
    title: string;
    link: string;
    type: "youtube" | "twitter" | "doc" | null;
};

function getYouTubeId(url: string): string | null {
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
        /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
    ];
    
    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
            return match[1];
        }
    }
    return null;
}

function getTwitterUrl(url: string): string | null {
    const patterns = [
        /(?:twitter\.com|x\.com)\/(\w+)\/status\/(\d+)/,
    ];
    
    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1] && match[2]) {
            return `https://twitter.com/${match[1]}/status/${match[2]}`;
        }
    }
    return null;
}
declare global {
    interface Window {
        twttr?: {
            widgets: {
                load: (element?: HTMLElement | null) => Promise<void>;
            };
        };
    }
}

export function Card({ title, link, type }: CardProps) {
    const twitterRef = useRef<HTMLDivElement>(null);
    
    const youtubeId = type === "youtube" ? getYouTubeId(link) : null;
    const twitterUrl = type === "twitter" ? getTwitterUrl(link) : null;
    
    useEffect(() => {
        if (type === "twitter" && twitterUrl && twitterRef.current) {
            const loadTwitterWidget = () => {
                const twttr = (window as any).twttr;
                if (twttr && twttr.widgets) {
                    if (twttr.ready) {
                        twttr.ready(() => {
                            if (twitterRef.current) {
                                twttr.widgets.load(twitterRef.current).catch((err: any) => {
                                    console.error('Error loading Twitter widget:', err);
                                });
                            }
                        });
                    } else if (twttr.widgets.load && twitterRef.current) {
                        twttr.widgets.load(twitterRef.current).catch((err: any) => {
                            console.error('Error loading Twitter widget:', err);
                        });
                    }
                }
            };

            // Check if script is already loaded
            if ((window as any).twttr && (window as any).twttr.widgets) {
                // Script is loaded, wait a bit for DOM to be ready
                setTimeout(loadTwitterWidget, 300);
            } else {
                // Wait for script to load
                let checkCount = 0;
                const maxChecks = 100; // 10 seconds max
                const checkTwitter = setInterval(() => {
                    checkCount++;
                    const twttr = (window as any).twttr;
                    if (twttr && twttr.widgets) {
                        clearInterval(checkTwitter);
                        setTimeout(loadTwitterWidget, 300);
                    } else if (checkCount >= maxChecks) {
                        // Stop checking after max attempts
                        clearInterval(checkTwitter);
                        console.warn('Twitter widgets script did not load in time');
                    }
                }, 100);
                
                return () => {
                    clearInterval(checkTwitter);
                };
            }
        }
    }, [type, twitterUrl]);

    const handleClick = () => {
        if (link && type !== "youtube" && type !== "twitter") {
            window.open(link, '_blank', 'noopener,noreferrer');
        }
    };

    const getTypeIcon = () => {
        switch (type) {
            case "youtube":
                return (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                );
            case "twitter":
                return (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                );
            case "doc":
                return (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                    </svg>
                );
            default:
                return (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z" />
                    </svg>
                );
        }
    };

    const getTypeColor = () => {
        switch (type) {
            case "youtube":
                return "bg-red-500/20 border-red-500/30";
            case "twitter":
                return "bg-blue-500/20 border-blue-500/30";
            case "doc":
                return "bg-green-500/20 border-green-500/30";
            default:
                return "bg-gray-500/20 border-gray-500/30";
        }
    };

    return (
        <div
            onClick={handleClick}
            className={`
                card-container
                bg-[#EFCB68]/10 border-2 rounded-xl
                ${type !== "youtube" && type !== "twitter" ? "cursor-pointer" : ""}
                transition-all duration-300
                hover:bg-[#EFCB68]/20 hover:border-[#EFCB68]/50 hover:shadow-lg
                active:scale-[0.98]
                ${getTypeColor()}
                flex flex-col
                overflow-hidden
                w-full
                break-inside-avoid
                mb-4
            `}
        >
            {/* Type Badge / Tag - Compact at top */}
            <div className="flex items-center justify-between flex-shrink-0 px-3 pt-2 pb-1">
                <div className={`
                    flex items-center gap-1.5 px-2 py-1 rounded-md
                    bg-[#EFCB68]/30 text-[#EFCB68]
                    text-xs font-semibold
                    border border-[#EFCB68]/50
                `}>
                    {getTypeIcon()}
                    <span className="capitalize">{type || "Link"}</span>
                </div>
            </div>

            {/* Embedded Content - Takes most of the space */}
            <div className="w-full px-3 pb-2 flex flex-col gap-2">
                {type === "youtube" && youtubeId ? (
                    <div className="w-full rounded-lg overflow-hidden bg-black/20">
                        <div className="relative" style={{ paddingTop: "56.25%" }}>
                            <iframe
                                src={`https://www.youtube.com/embed/${youtubeId}`}
                                className="absolute top-0 left-0 w-full h-full border-0 rounded-lg"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title={title || "YouTube video"}
                            />
                        </div>
                    </div>
                ) : type === "twitter" && twitterUrl ? (
                    <div ref={twitterRef} className="w-full overflow-hidden">
                        <div className="flex items-center justify-center">
                            <blockquote 
                                key={twitterUrl}
                                className="twitter-tweet" 
                                data-theme="dark" 
                                data-dnt="true"
                                data-lang="en"
                                data-conversation="none"
                            >
                                <a href={twitterUrl}></a>
                            </blockquote>
                        </div>
                    </div>
                ) : type === "doc" ? (
                    <div className="w-full rounded-lg overflow-hidden bg-white/5 h-[200px]">
                        <iframe
                            src={link}
                            className="w-full h-full border-0 rounded-lg"
                            title={title}
                            allow="fullscreen"
                        />
                    </div>
                ) : (
                    <div className="flex flex-col justify-center gap-2 py-2">
                        {/* Title */}
                        <div className="flex items-center">
                            <h3 className="
                                text-[#EFCB68] font-semibold text-base
                                line-clamp-3
                                leading-tight
                            ">
                                {title || "Untitled Content"}
                            </h3>
                        </div>

                        {/* Link Preview */}
                        <div className="mt-auto">
                            <p className="
                                text-[#EFCB68]/60 text-xs
                                truncate
                                flex items-center gap-1
                            ">
                                <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                </svg>
                                <span className="truncate">{link}</span>
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Title for embedded content - Compact at bottom */}
            {(type === "youtube" || type === "twitter" || type === "doc") && (
                <div className="flex-shrink-0 px-3 pb-2">
                    <h3 className="
                        text-[#EFCB68] font-semibold text-xs
                        line-clamp-1
                        leading-tight
                    ">
                        {title || "Untitled Content"}
                    </h3>
                </div>
            )}
        </div>
    );
}