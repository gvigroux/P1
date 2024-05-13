import { Link } from "@nextui-org/link";
import { Checkbox, Input } from "@nextui-org/react";
import { LockIcon } from "../icons/LockIcon";
import { MailIcon } from "../icons/MailIcon";


export function FormCreateUser() {

    const createAccount = async (formData : any) => {
        "use server";
        const name = formData.get("name");
        const email = formData.get("email");
        const password = formData.get("password");
        // Save to the database or perform other server-side operations
      };
    
      return (
        <form action={createAccount} method="POST">
            <Input
                  autoFocus
                  endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
            />
            <Input
                  endContent={
                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
            />
            <div className="flex py-2 px-1 justify-between">
                <Checkbox classNames={{label: "text-small",}}>
                    Remember me
                </Checkbox>

            </div>  
            <button type="submit">Create Account</button>

        </form>
      );
}