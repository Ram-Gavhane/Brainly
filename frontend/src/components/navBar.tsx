import { AddIcon } from "../assets/addIcon";
import { ShareIcon } from "../assets/shareIcon";
import { Button } from "./button";

export function Navbar(){
    return <div className="bg-[#EFCB68] h-13 flex justify-between shadow-[#EFCB68] shadow-2xl">
        <div className="ml-8 pt-1.5 font-medium text-3xl text-[#160C28]">
            Brainly
        </div>
        <div className="flex gap-2 p-2">
            <Button variant="primary" size="md" fun={()=>{}} title="Add" startSymbol={<AddIcon/>}/>
            <Button variant="primary" size="md" fun={()=>{}} title="Share Brain" startSymbol={<ShareIcon/>}/>        </div>
    </div>
}