import { Ref } from "react"

type inputProps={
    type: string,
    placeholder: string,
    reference: Ref<HTMLInputElement>,
    overRidingStyles?: string,
    size: "sm"|"md"|"lg";
}

const sizeStyles = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-5 text-base",
  lg: "h-12 px-6 text-lg"
};

export function Input(props: inputProps){
    return  <input 
        ref={props.reference} 
        className={`
            w-full border border-gray-300 rounded-lg px-4 py-2 
            bg-white text-gray-900 placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-[#EFCB68] focus:border-transparent
            transition-all duration-200
            ${props.overRidingStyles} ${sizeStyles[props.size]}
        `} 
        type={props.type} 
        placeholder={props.placeholder} 
    />
    
}