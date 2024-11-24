import { ReactNode } from "react"


export default function PriamryButton({
    children,
    onClick,
    size
}:{
    children: ReactNode,
    onClick: () => void,
    size?: "big" | "small",
}) {
    return <div onClick={onClick} 
            className={`
                ${size === "small" ? "text-sm" : "text-xl"}
                ${size === "small" ? "px-4 pt-2" : "px-8 py-10"}
            bg-amber-600 `}>
            

    </div>
}