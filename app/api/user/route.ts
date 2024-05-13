import { NextResponse } from "next/server";
//import { Prisma } from "@prisma/client";
import prisma from "../../../prisma/db";
import { hash } from 'bcrypt';
import * as z from 'zod';


// define schema for input validation
const userSchema = z
  .object({
    username: z.string().min(1, 'Username is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have than 8 characters')
  });



export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, username, password } = userSchema.parse(body);

        // Check if email is unique
        const existingUserByEmail = await prisma.user.findUnique({
            where: {email: email}
        });
        if( existingUserByEmail ) {
            return NextResponse.json({ user: null, message: "Email already in used"}, {status: 409 })
        }
        
        const hashedPassword =  await hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                email,
                name: username,
                password: hashedPassword
            }
        })
        const {password: newUserPassword, ...rest} = newUser;
        return NextResponse.json({user: rest, message: "User created succedfully"}, {status: 201});

    }
    catch (error) {
        return NextResponse.json({message: "Something went wrong!"}, {status: 500});

    }
}