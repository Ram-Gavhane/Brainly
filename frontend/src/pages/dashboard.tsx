import { useRecoilValue } from "recoil"
import { modal } from "../utils/state"
import { Modal } from "../components/modal";


export function Dashboard(){
    
    const modalValue = useRecoilValue(modal);

    return <div className="bg-[#160C28] text-[#EFCB68] h-[96vh]">
        
        <div className="h-[96vh] flex justify-center items-center">
            {modalValue && <Modal></Modal>}
        </div>
        
    </div>
}