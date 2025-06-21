import { Button } from "./button"
import { Input } from "./input"

export function Modal(){
    

    return (
        <div className="h-80 w-[360px] bg-[#EFCB68] rounded-2xl text-[#160C28] flex flex-col justify-between p-1.5 shadow-2xl">
            <div className="flex flex-col  m-5">
                <div className="flex justify-center">
                    <Input size="md" placeholder="Add Content" type="string" overRidingStyles="bg-amber-100" ></Input>
                </div>
                <div className="grid grid-cols-3 gap-2 justify-evenly mt-8">
                    <div className="font-semibold text-2xl">Tags:</div>
                    <Button size="sm" variant="primary" title="X (Twitter)" fun={()=>{}}></Button>
                    <Button size="sm" variant="primary" title="Docs" fun={()=>{}}></Button>
                    <Button size="sm" variant="primary" title="Youtube" fun={()=>{}}></Button>
                </div>
                <div className="flex gap-2 mt-3">
                    <Input placeholder="New Tag" type="string" overRidingStyles="bg-amber-100"></Input>
                    <Button title="Add Tag" variant="primary" size="sm" fun={()=>{}}></Button>
                </div>
                <div className="mt-14 flex justify-center">
                    <Button title="Submit" variant="primary" size="md" fun={()=>{}}></Button>
                </div>
            </div>
        </div>
    )
}