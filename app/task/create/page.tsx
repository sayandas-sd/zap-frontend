"use client";

import AllTask from "@/components/AllTask";
import Appbar from "@/components/Appbar";
import HardButton from "@/components/button/HardButton";
import { useState } from "react";

export default function() {
    const [trigger, setTrigger] = useState("");
    const [action, setAction] = useState<{
        availablActionId: string;
        availablActionName: string;
    }[]>([]);

    return <div>
        <Appbar />
        <div className="w-full flex flex-col justify-center items-center w-full min-h-screen bg-slate-300">
            <div className="flex justify-center w-full">
                <AllTask type={trigger ? trigger : "Trigger"} index={1}/>
            </div>
            <div className="pt-2">
               {action.map((a, index) => 
               <div key={index} className="flex justify-center pt-2">
                    <AllTask key={index} type={a.availablActionName ? a.availablActionName : "Action"} index={2 + index}/>
               </div>
               )}
  
            </div>

            <HardButton onClick={()=>{
                setAction(a => [...a, {
                    availablActionId: "",
                    availablActionName: ""
                }])
            }}><div className="text-2xl">+</div>
            </HardButton>
        </div>
    </div>
}

