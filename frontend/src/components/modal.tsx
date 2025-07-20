import { useRef } from "react"
import { Button } from "./button"
import { Input } from "./input"
import axios from "axios";
import { CrossIcon } from "../assets/crossIcon";
import { useRecoilState } from "recoil";
import { modal } from "../utils/modalState";

export function Modal({}){
    const contentRef = useRef<HTMLInputElement>(null);
    const tagRef = useRef<HTMLInputElement>(null);
    const [modalValue,setModalValue] = useRecoilState(modal);
    async function addContent() {
        const link = contentRef.current?.value;
        const response = await axios.post("http://localhost:3000/api/v1/content",{
            title:"A video that is good",
            link,
            tags:Object("67e3b6dc0acbe17ec9d452cf")
        },{headers:{
            Authorization:localStorage.getItem("token")
        }})
        setModalValue(false);
        console.log(response.data)
    }

    return (
      <div className="bg-gray-600/45 h-screen w-screen fixed top-0 flex items-center justify-center">
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
      reference={contentRef}
    /> 
  </div>
  <div className="flex justify-center mb-6 gap-2">
    <Input 
      size="md" 
      placeholder="Link / URL" 
      type="string" 
      overRidingStyles="bg-white/90 w-full rounded-xl border-0 shadow-sm" 
      reference={contentRef}
    /> 
  </div>

  {/* Tags Section */}
  <div className="flex-1 space-y-4">
    <div className="text-lg font-medium text-[#160C28]/80">Select Tags</div>
    
    <div className="grid grid-cols-3 gap-2">
      <Button 
        size="sm" 
        variant="primary" 
        title="Twitter" 
        fun={() => {}}
      />
      <Button 
        size="sm" 
        variant="primary" 
        title="Docs" 
        fun={() => {}}
      />
      <Button 
        size="sm" 
        variant="primary" 
        title="YouTube" 
        fun={() => {}}
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

  {/* Submit Section */}
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