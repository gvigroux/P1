import { Button, Link, User } from "@nextui-org/react";
import ModalLogin from "./modalLogin";
import { Session } from "next-auth";
import { CustomLogout } from "./CustomLogout";

export default async function CustomLogin({session}: {session: Session | null}) {	

    return (
        <>
            {session ? (
                <>
                    <User   
                        name={session.user?.name}
                        className="align-bottom px-4"
                        avatarProps={{src: session.user?.image as string}}
                    />
                    <CustomLogout/>
                 </>
            ) : (
                <>
                    <ModalLogin></ModalLogin>
                </>
            )}			
        </>




    );
}