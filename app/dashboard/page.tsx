"use client";

import Appbar from "@/components/Appbar";
import HardButton from "@/components/button/HardButton";
import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL, HOOKS_URL } from "../config";
import Button from "@/components/button/Button";
import { useRouter } from "next/navigation";

interface Task {
        "id": string,
        "triggerId": string,
        "userId": number,
        "action": {
                "id": string,
                "actionId": string,
                "TaskId": string,
                "sortingOrder": number,
                "type": {
                    "id": string,
                    "name": string,
                    "image": string
                }
        }[],
            "trigger": {
                "id": string,
                "triggerId": string,
                "TaskId": string,
                "type": {
                    "id": string,
                    "name": string,
                    "image": string
                }
        }
}

function useTask() {
    const [task, setTask] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/task`, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        }).then(res => {
                setTask(res.data.task);
                setLoading(false)
                
            })
    }, []);


    return {
        task, loading
    }
}

export default function() {

    const {loading, task} = useTask();

    const router = useRouter();
    return <div>
        <Appbar />
        
        <div className="flex justify-center pt-8">
            <div className="max-w-2xl w-full">
                <div className="flex justify-between pt-8">
                    <div className="text-2xl font-bold">
                        All Task
                    </div>
                    <HardButton onClick={() => {
                        router.push("/task/create")
                    }}>Create</HardButton>
                </div>
            </div>
        </div> 
        {loading? "Loading..." : <div className="flex justify-center"> <TaskTable task={task}/> </div>}
    </div>
}


function TaskTable({task}: {task: Task[]}) {

    const router = useRouter();

    return <div className="p-8 max-w-screen-lg w-full">
        <div className="flex">
                <div className="flex-1">Name</div>
                <div className="flex-1">Last Edit</div>
                <div className="flex-1">Running</div>
                <div className="flex-1">Go</div>
        </div>
        {task.map((z) => (
    <div key={z.id} className="flex border-b border-t py-4">
        <div className="flex-1">
            <img src={z.trigger.type.name} className="w-[30px] h-[30px]" />
            {z.action.map((r) => (
                <img key={r.id} src={r.type.image} className="w-[30px] h-[30px]" />
            ))}
        </div>
        <div className="flex-1">{z.id}</div>
        <div className="flex-1">Nov 13, 2024</div>
        <div className="flex-1">{`${HOOKS_URL}/hooks/catch/1/${z.id}`}</div>
        <div className="flex-1 cursor-pointer">
            <Button
                onClick={() => {
                    router.push("/task/" + z.id);
                }}
            >
                Look
            </Button>
        </div>
    </div>
))}

    </div>
}
