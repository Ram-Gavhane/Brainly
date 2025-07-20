export function Card(){
    return (
        <div className="h-80 w-72 flex flex-col p-2.5 bg-amber-50 rounded-xl">

            <iframe className="rounded-xl " width="268" height="200" src="https://www.youtube.com/embed/1EaSKSlK2to?si=V-KaROj3_PzdKMo4" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            <div className="text-black flex flex-col border-t-2 mt-2">
                <span className="font-semibold mt-1">Title of Content</span>
                <span>Title of Content</span>
                <span>Title of Content</span>
            </div>
        </div>
    )
}