"use client";

import { BACKEND_URL } from "@/app/config";
import AllTask from "@/components/AllTask";
import Appbar from "@/components/Appbar";
import HardButton from "@/components/button/HardButton";
import axios from "axios";
import { useEffect, useState } from "react";

export default function() {
    const [trigger, setTrigger] = useState<{
        id: string;
        name: string;
    }>();
    const [action, setAction] = useState<{
        index: number;
        availablActionId: string;
        availablActionName: string;
    }[]>([]);

    const [model, setModel] = useState<null | number>(null);
   

    return <div>

        <Appbar />
        <div className="w-full flex flex-col justify-center items-center w-full min-h-screen bg-slate-300">
            <div className="flex justify-center w-full cursor-pointer">
                <AllTask onClick={()=>{
                    setModel(1); 
                }} type={trigger?.name ? trigger.name : "Trigger"} index={1}/>
            </div>
            <div className="pt-2">
               {action.map((a, index) => 
               <div key={index} className="flex justify-center pt-2 cursor-pointer">
                    <AllTask onClick={()=>{
                      
                        setModel(a.index);
                    }} key={index} type={a.availablActionName ? a.availablActionName : "Action"} 
                    index={a.index}/>
               </div>
               )}
  
            </div>

            <HardButton onClick={()=>{
                setAction(a => [...a, {
                    index: a.length+ 2,
                    availablActionId: "",
                    availablActionName: ""
                }])
            }}><div className="text-2xl">+</div>
            </HardButton>

        </div>
        {model && <Model onSelect={(props: null | { name: string; id: string; })=>{
            if(props === null){
                setModel(null);
                return;
            }
            if(model === 1 ){
                setTrigger({
                    id: props.id,
                    name: props.name
                })
            } else {
                setAction(a => {
                    let newActions = [...a];
                    newActions[model - 2] = {
                        index: model,
                        availablActionId: props.id,
                        availablActionName: props.name
                    }
                    return newActions;
                })
            }
        }} index={model}/>}
    </div>
}


function availablActionAndTrigger() {
    const [availableActions, setAvailableActions] = useState([]);
    const [availableTrigger, setAvailableTrigger] = useState([]);

    useEffect(()=>{
            axios.get(`${BACKEND_URL}/api/v1/action/details`)
            .then(res => setAvailableActions(res.data.availablAction))

            axios.get(`${BACKEND_URL}/api/v1/trigger/details`)
            .then(res => setAvailableTrigger(res.data.availableTrigger))
    }, [])

    return {
        availableActions,
        availableTrigger    
    }
}

function Model({ 
    index, 
    onSelect 
}: { 
    index: number, 
    onSelect: (props: null | { name: string; id: string; })=> void 
}) {

    return (
        <div>
            <div
                
                className="flex fixed top-0 right-0 left-0 z-50 justify-center 
                items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-gray-200 bg-opacity-70"
            >
                <div className="relative p-4 w-full max-w-2xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow ">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                            
                            <button
                                onClick={()=>{
                                    onSelect(null);
                                }}

                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 
                                rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                                data-modal-hide="default-modal"
                            >
                                <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>

                        <div className="p-4 md:p-5 space-y-4">
                            sasasas
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
