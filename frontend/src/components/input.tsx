import { Ref } from "react"

interface inputProps{
    type: string,
    placeholder: string,
    reference: Ref<HTMLInputElement>
}
export function Input(props: inputProps){
    return <div className="border w-60 h-9 mt-3 rounded-md ml-2">
        <input ref={props.reference} className="w-60 h-9 rounded-md px-2" type={props.type} placeholder={props.placeholder} />
    </div>
}