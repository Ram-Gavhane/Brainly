import { AddIcon } from "../assets/addIcon";
import { ShareIcon } from "../assets/shareIcon";
import { SideBarIcon } from "../assets/sidebarIcon";
import { Button } from "./button";

export function Navbar(){
    return <div className="bg-[#EFCB68] h-13 flex justify-between shadow-[#EFCB68] shadow-2xl">
        <div className="pl-3 pt-1 text-[26px] font-medium text-[#160C28]">
            Brainly
        </div>
        <div className="flex gap-2 p-2">
            <Button variant="primary" size="sm" fun={()=>{}} title="Add" startSymbol={<AddIcon/>}/>
            <Button variant="primary" size="md" fun={()=>{}} title="Share Brain" startSymbol={<ShareIcon/>}/>
            <Button variant="primary" size="sm" fun={()=>{}} startSymbol={<SideBarIcon/>}/>
        </div>
    </div>
}