"use client";

import { ReactNode } from "react";

export default function LinkButton({
    children,
    onClick
}:{
    children: ReactNode,
    onClick: () => void
}) {
    return <div className="flex justify-center px-1 py-2 cursor-pointer hover:bg-slate-300 font-light text-sm rounded"
    onClick={onClick}>
        {children}
    </div>
}