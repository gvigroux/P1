import { NextResponse } from "next/server";
import prisma from "@/prisma/db";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }) {
  
  const id = params.id
  //return NextResponse.json({ message: "Hello World: " + id }, { status: 200 });

  const headers = new Headers();
  headers.append("Content-Type","text/javascript");
  const options = { status: 200, statusText: "Success", headers};


  const config = await prisma.config.findFirst();

  
  const response = new Response(config!.data, options);
  return response;
}