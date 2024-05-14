'use client'

import React, { Children, useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link, Switch} from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { MailIcon } from "../icons/MailIcon";
import { LockIcon } from "../icons/LockIcon";
import { GoogleIcon } from "../icons/GoogleIcon";


const initialState = {
  message: '',
}


export default function ModalLogin({createUserFromAction}: {createUserFromAction : any}) {
  const [isLogin, setLogin] = useState(false);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();


  return (
    <>
      <Link onClick={(ev)=>{setLogin(true);onOpen()}} color="primary" className="cursor-pointer">Login</Link>

      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                { isLogin && (
                  <>
                    <form action={createUserFromAction} >
                    <Input
                      id="email" 
                      name="email"
                      autoFocus
                      endContent={
                        <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      label="Email"
                      placeholder="Enter your email"
                      variant="bordered"
                   />
                    <Input
                      id="password"
                      name="password"
                      endContent={
                        <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      label="Password"
                      placeholder="Enter your password"
                      type="password"
                      variant="bordered"
                    />
                    <div className="flex py-2 px-1 justify-between">
                      <Checkbox 
                        id="remember"
                        name="remember"
                        classNames={{label: "text-small",}}>
                        Remember me
                      </Checkbox>
                        <Link color="primary" href="#" size="sm">
                          Forgot password?
                        </Link>
                    </div>   
                    <button type="submit">GO</button>
                    </form>
                  </>  
                )}
               

                <Button className="inline-flex items-center text-[#333] text-base font-semibold border-none outline-none shadow-lg bg-gray-50 hover:bg-gray-100 active:bg-gray-50" onClick={() => signIn("google")} color="primary" startContent={<GoogleIcon className="mr-2 -ml-1 w-4 h-4"/>} >
                    SignIn with Google
                </Button>


              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                  { isLogin && (
                    <Button color="primary" onPress={onClose}>
                      Login
                    </Button>
                  ) || (
                    <button type="submit">Create Account</button>
                  )
                }
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}