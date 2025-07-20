import { useRecoilValue } from "recoil"
import { modal } from "../utils/modalState"
import { Modal } from "../components/modal";
import { Card } from "../components/card";


export function Dashboard(){
    
    

    const modalValue = useRecoilValue(modal);

    return <div className="bg-[#160C28] text-[#EFCB68] h-[96vh]">
        <div className=" grid grid-cols-4 pt-6 gap-12 place-items-center">
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
        </div>
        
        {modalValue && <Modal></Modal>}
        
    </div>
}