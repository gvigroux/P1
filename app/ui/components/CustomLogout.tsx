"use client";
import { getAuthSession } from "@/app/lib/auth";
import { Button } from "@nextui-org/button"
import { signOut } from "next-auth/react"


export const CustomLogout = () => {
    return (
        <Button onClick={() => signOut()}>Sign Out</Button>
    )
}