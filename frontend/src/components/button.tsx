import { ReactElement } from "react"

interface buttopnProps{
    title?: string,
    variant: "primary" | "secondary" | "onlyIcon",
    size: "sm" | "md" | "lg",
    startSymbol?:ReactElement,
    fun: ()=>void
}

const variantStyles = {
    "primary": "bg-[#160C28] text-[#EFCB68]",
    "secondary": "text-[#160C28] bg-[#EFCB68]",
    "onlyIcon": "text-gray-600"
}

const sizeStyles = {
    "sm": "h-9 w-10",
    "md": "h-9 w-40",
    "lg": "",
}

export function Button(props: buttopnProps){
    return <div className={variantStyles[props.variant]+" rounded-xl font-medium "+sizeStyles[props.size]}>
        <button onClick={props.fun} className={sizeStyles[props.size]}>
            <div className="flex gap-3 items-center">{props.startSymbol&&<div className="pl-3 pt-0.5">{props.startSymbol} </div>} <div>{props.title}</div></div></button>
    </div>
}

