"use client";
import { useRouter } from "next/navigation"
import Button from "./button/Button"
import PriamryButton from "./button/PrimaryButton";



export default function Appbar() {
    const router = useRouter();
    return <div className="flex border-b justify-between">
        <div>
            Whiferr
        </div>
        <div className="flex">
            <Button onClick={()=> {}}>Contact sales</Button>
            <Button onClick={()=> {
                router.push("/login")
            }}>
                Login
            </Button>
            <PriamryButton onClick={()=>{
                router.push("/signup")
            }}>
                Signup
            </PriamryButton>
            
        </div>
    </div>
}