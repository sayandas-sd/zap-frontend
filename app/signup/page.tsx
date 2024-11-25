"use client";
import Appbar from "@/components/Appbar"
import PriamryButton from "@/components/button/PrimaryButton";
import Input from "@/components/Input"
import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../config";
import { useRouter } from "next/navigation";

export default function() {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
   
    return <div>
        <Appbar />
        <div className="flex justify-center">
            <div className="flex pt-8 max-w-4xl">
                <div>
                    automate you task
                </div>
                <div className="flex-1 pt-24 px-4">

                    <Input onChange={(e)=>{
                         setUsername(e.target.value)
                    }} type="text" label={"Username"} placeholder="user123@gmail.com"/>

                <Input onChange={(e)=>{
                         setPassword(e.target.value)
                    }} type="password" label={"Password"} placeholder="password"/>

                <Input onChange={(e)=>{
                        setName(e.target.value)
                    }} type="text" label={"name"} placeholder="name"/>


                <PriamryButton onClick={async ()=>{
                    const res = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
                        username: username,
                        password: password,
                        name: name
                    });
                    
                    localStorage.setItem("token", res.data.token);

                    router.push("/login");

                }} size="big">Get started</PriamryButton>
                </div>
            </div>
        </div>
    </div>
}