import { ReactNode } from "react"


export default function HardButton({
    children,
    onClick,
    size = "small"
}: {
    children: ReactNode,
    onClick: () => void,
    size?: "big" | "small"
}) {
    return <div onClick={onClick} 
            className={`bg-purple-800 flex flex-col justify-center cursor-pointer mt-2 px-5 py-2 rounded text-center text-white`}>
            
            {children}
    </div>
}