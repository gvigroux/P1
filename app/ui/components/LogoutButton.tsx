"use client";
import { getAuthSession } from "@/app/lib/auth";
import { Button } from "@nextui-org/button"
import { signOut } from "next-auth/react"


export const LogoutButton = async () => {
	const session = await getAuthSession;
    if( !session ) 
        return (<div></div>);
    return (
        <Button onClick={() => signOut()}>Sign Out</Button>
    )
}
