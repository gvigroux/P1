'use client'

import React, { Children, useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link, Switch, Spacer} from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { MailIcon } from "../icons/MailIcon";
import { LockIcon } from "../icons/LockIcon";
import { GoogleIcon } from "../icons/GoogleIcon";



export default function ModalRegister({children}: {children: React.ReactNode}) {
  const [isLogin, setLogin] = useState(false);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
 

  return (
    <>
      <Button onPress={(ev)=>{setLogin(false);onOpen()}}  as={Link} color="primary" href="#"  variant="flat">
                        Sign Up
      </Button>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
            
                {children}  
   
                <div className="relative flex py-5 items-center">
                  <div className="flex-grow border-t border-gray-400"></div>
                  <span className="flex-shrink mx-4 text-gray-400">OR</span>
                  <div className="flex-grow border-t border-gray-400"></div>
                </div>
                                            

                <Button className="inline-flex items-center text-[#333] text-base font-semibold border-none outline-none shadow-lg bg-gray-50 hover:bg-gray-100 active:bg-gray-50" onClick={() => signIn("google")} color="primary" startContent={<GoogleIcon className="mr-2 -ml-1 w-4 h-4"/>} >
                    SignIn with Google
                </Button>
                
                <Spacer y={4} />

              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}