import { useRef, useState } from "react"
import { Button } from "./button"
import { Input } from "./input"
import axios from "axios";
import { CrossIcon } from "../assets/crossIcon";
import { useRecoilState } from "recoil";
import { modal } from "../utils/modalState";

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
  Doc = "doc"
}

export function Modal({}){
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const tagRef = useRef<HTMLInputElement>(null);
    const [modalValue,setModalValue] = useRecoilState(modal);
    const [type, setType] = useState<ContentType | null>(null);

    async function addContent() {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;
        const response = await axios.post("http://localhost:3000/api/v1/content",{
            title,
            link,
            type
        },{headers:{
            Authorization:localStorage.getItem("token")
        }});
        setModalValue(false);
        console.log(response.data)
    }

    return (
      <div className="bg-gray-600/50 h-screen w-screen fixed top-0 flex items-center justify-center">
        <div className="h-[420px] w-[360px] bg-[#EFCB68] rounded-2xl text-[#160C28] flex flex-col p-6 shadow-2xl">
  
  <div className="border-b mb-4 flex justify-between font-semibold items-center gap-2">
    Add Content
    <Button variant="onlyIcon" size="sm" startSymbol={<CrossIcon/>} fun={()=>{setModalValue(!modalValue)}}></Button>
  </div>
  <div className="flex justify-center mb-6 gap-2">
    <Input 
      size="md" 
      placeholder="Title" 
      type="string" 
      overRidingStyles="bg-white/90 w-full rounded-xl border-0 shadow-sm" 
      reference={titleRef}
    /> 
  </div>
  <div className="flex justify-center mb-6 gap-2">
    <Input 
      size="md" 
      placeholder="Link / URL" 
      type="string" 
      overRidingStyles="bg-white/90 w-full rounded-xl border-0 shadow-sm" 
      reference={linkRef}
    /> 
  </div>

  {/* Tags Section */}
  <div className="flex-1 space-y-4">
    <div className="text-lg font-medium text-[#160C28]/80">Select Tags</div>
    
    <div className="grid grid-cols-3 gap-2">
      <Button 
        size="sm" 
        variant={type == ContentType.Twitter ? "selected" : "primary"} 
        title="Twitter" 
        fun={() => {
          setType(ContentType.Twitter);
        }}
      />
      <Button 
        size="sm" 
        variant={type == ContentType.Doc ? "selected" : "primary"} 
        title="Docs" 
        fun={() => {
          setType(ContentType.Doc);
        }}
      />
      <Button 
        size="sm" 
        variant={type == ContentType.Youtube ? "selected" : "primary"} 
        title="YouTube" 
        fun={() => {
          setType(ContentType.Youtube);
        }}
      />
    </div>

    <div className="flex gap-2">
      <Input 
        size="sm" 
        placeholder="Custom tag" 
        type="string" 
        overRidingStyles="bg-white/90 flex-1 rounded-lg border-0 shadow-sm" 
        reference={tagRef}
      />
      <Button 
        title="Add" 
        variant="primary" 
        size="sm" 
        fun={() => {}}
      />
    </div>
  </div>
  <div className="flex justify-center pt-4 border-t mt-4 border-[#160C28]/10">
    <Button 
      title="Submit Content" 
      variant="primary" 
      size="md" 
      fun={addContent}
    />
  </div>
</div>
</div>
    )
}