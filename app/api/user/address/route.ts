import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  console.log(currentUser);

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const { address, phone, place } = body;

  console.log("these are details");

  console.log(typeof address);
  console.log(typeof phone);
  console.log(typeof place);

  const newAddress = await prisma.address.create({
    data: {
      userId: currentUser.id,
      address: address,
      phone: phone,
      place: place,
    },
  });

  return NextResponse.json("SUCCESS");
}
