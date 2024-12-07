"use client";

import { BACKEND_URL } from "@/app/config";
import AllTask from "@/components/AllTask";
import Appbar from "@/components/Appbar";
import HardButton from "@/components/button/HardButton";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function useAvailableActionsAndTriggers() {
    const [availableActions, setAvailableActions] = useState([]);
    const [availableTriggers, setAvailableTriggers] = useState([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/trigger/details`)
            .then(x => setAvailableTriggers(x.data.availableTriggers))

        axios.get(`${BACKEND_URL}/api/v1/action/details`)
            .then(x => setAvailableActions(x.data.availableActions))
    }, [])

    return {
        availableActions,
        availableTriggers
    }
}

export default function() {
    const router = useRouter();
    const { availableActions, availableTriggers } = useAvailableActionsAndTriggers();
    const [selectedTrigger, setSelectedTrigger] = useState<{
        id: string;
        name: string;
    }>();

    const [selectedActions, setSelectedActions] = useState<{
        index: number;
        availableActionId: string;
        availableActionName: string;
        metadata: any;
    }[]>([]);
    const [selectedModalIndex, setSelectedModalIndex] = useState<null | number>(null);

    return <div>
        <Appbar />
        <div className="flex justify-end bg-slate-200 p-4">
            <HardButton onClick={async () => {
                if (!selectedTrigger?.id) {
                    return;
                }
                await axios.post(`${BACKEND_URL}/api/v1/task`, {
                    "availableTriggerId": selectedTrigger.id,
                    "triggerMetadata": {},
                    "action": selectedActions.map(a => ({
                        availableActionId: a.availableActionId,
                        actionMetadata: a.metadata
                    }))
                }, {
                    headers: {
                        Authorization: localStorage.getItem("token"),
                        'Content-Type': 'application/json',
                    }
                   
                });

                router.push("/dashboard");
                
            }}>Publish</HardButton>
        </div>
        <div className="w-full min-h-screen bg-slate-200 flex flex-col justify-center">
            <div className="flex justify-center w-full">
                <AllTask onClick={() => {
                    setSelectedModalIndex(1);
                }} type={selectedTrigger?.name ? selectedTrigger.name : "Trigger"} index={1} />
            </div>
            <div className="w-full pt-2 pb-2">
                {selectedActions.map((action, index) => <div key={`action-${action.index}`} className="pt-2 flex justify-center"> <AllTask onClick={() => {
                    setSelectedModalIndex(action.index);
                }} type={action.availableActionName ? action.availableActionName : "Action"} index={action.index} /> </div>)}
            </div>
            <div className="flex justify-center">
                <div>
                    <HardButton onClick={() => {
                        setSelectedActions(a => [...a, {
                            index: a.length + 2,
                            availableActionId: "",
                            availableActionName: "",
                            metadata: {}
                        }])
                    }}><div className="text-2xl">
                        +
                    </div></HardButton>
                </div>
            </div>
        </div>
        {selectedModalIndex && <Modal availableItems={selectedModalIndex === 1 ? availableTriggers : availableActions} 
        onSelect={(props: null | { name: string; id: string; metadata: any; }) => {
            if (props === null) {
                setSelectedModalIndex(null);
                return;
            }
            if (selectedModalIndex === 1) {
                setSelectedTrigger({
                    id: props.id,
                    name: props.name
                })
            } else {
                setSelectedActions(a => {
                    let newActions = [...a];
                    newActions[selectedModalIndex - 2] = {
                        index: selectedModalIndex,
                        availableActionId: props.id,
                        availableActionName: props.name,
                        metadata: props.metadata
                    }
                    return newActions
                })
            }
            setSelectedModalIndex(null);
        }} index={selectedModalIndex} />}
    </div>
}
function Modal({ index, onSelect, availableItems }: { index: number, onSelect: (props: null | { name: string; id: string; metadata: any; }) => void, availableItems: {id: string, name: string, image: string;}[] }) {
    const [step, setStep] = useState(0);
    const [selectedActions, setSelectedActions] = useState<{ id: string; name: string }[]>([]);

    const isTrigger = index === 1;

    const handleActionSelect = (action: { id: string; name: string }) => {
        setSelectedActions((prevActions) => [...prevActions, action]);
        onSelect({
            id: action.id,
            name: action.name,
            metadata: {}
        });
    };

    return (
        <div className="fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-slate-100 bg-opacity-70 flex">
            <div className="relative p-4 w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                        <div className="text-xl">
                            Select {index === 1 ? "Trigger" : "Action"}
                        </div>
                        <button
                            onClick={() => {
                                onSelect(null);
                            }}
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
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
                        {isTrigger ? (
                            <div>
                                {availableItems.map(({ id, name, image }) => (
                                    <div
                                        key={id}
                                        onClick={() => {
                                            onSelect({
                                                id,
                                                name,
                                                metadata: {}
                                            });
                                        }}
                                        className="flex border p-4 cursor-pointer hover:bg-slate-100"
                                    >
                                        <img src={image} width={30} className="rounded-full" />{' '}
                                        <div className="flex flex-col justify-center">{name}</div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div>
                                {availableItems.map(({ id, name, image }) => (
                                    <div
                                        key={id}
                                        onClick={() => {
                                            handleActionSelect({ id, name });
                                        }}
                                        className="flex border p-4 cursor-pointer hover:bg-slate-100"
                                    >
                                        <img src={image} width={30} className="rounded-full" />{' '}
                                        <div className="flex flex-col justify-center">{name}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}