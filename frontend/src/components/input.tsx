import { Ref } from "react"

type inputProps={
    type: string,
    placeholder: string,
    reference: Ref<HTMLInputElement>,
    overRidingStyles?: string,
    size?: "sm"|"md"|"lg"| string
}

const sizeStyles = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-5 text-base",
  lg: "h-12 px-6 text-lg"
};

export function Input(props: inputProps){
    return  <input ref={props.reference} className={`border h-9 rounded-md px-2 ml-2 ${props.overRidingStyles} ${sizeStyles[props.size]}`} type={props.type} placeholder={props.placeholder} />
    
}