'use server'
import { NextResponse } from "next/server";
import prisma from "@/prisma/db";
import { hash } from 'bcrypt';
import * as z from 'zod';


// define schema for input validation
const userSchema = z
  .object({
    name: z.string().min(1, 'Name is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have than 8 characters')
  });

export async function createUserFromAction(formData: FormData) {

    try {
            
        const validatedFields = userSchema.safeParse({
            email:      formData.get('email'),
            name:       formData.get('name'),
            password:   formData.get('password'),
        })

        // Return early if the form data is invalid
        if (!validatedFields.success) {
            return { errors: validatedFields.error.flatten().fieldErrors, }
        }
        
        // Check if email is unique
        const existingUserByEmail = await prisma.user.findUnique({
            where: {email: validatedFields.data.email}
        });

        if( existingUserByEmail ) {
            return NextResponse.json({ user: null, message: "Email already in used"}, {status: 409 })
        }
        
        const hashedPassword =  await hash(validatedFields.data.password, 10);
        const newUser = await prisma.user.create({
            data: {
                email: validatedFields.data.email,
                name: validatedFields.data.name,
                password: hashedPassword
            }
        })
        const {password: newUserPassword, ...rest} = newUser;
        return NextResponse.json({user: rest, message: "User created successfully"}, {status: 201});

    }
    catch (error) {
        return { message: 'Something went wrong!', }
        //return NextResponse.json({message: "Something went wrong!"}, {status: 500});

    }
}