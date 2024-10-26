import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const { address, phone, place } = body;

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

export async function PATCH(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const addressToUpdate = await prisma.address.findFirst({
    where: {
      deliveryAddress: true,
    },
  });

  if (addressToUpdate) {
    await prisma.address.update({
      where: {
        id: addressToUpdate.id,
      },
      data: {
        deliveryAddress: false,
      },
    });
  }

  await prisma.address.update({
    where: {
      id: body.id,
    },
    data: {
      deliveryAddress: true,
    },
  });

  return NextResponse.json({ success: "Delivery Address added successfully" });
}

export async function PUT(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  await prisma.address.update({
    where: {
      id: body.id,
    },
    data: {
      deliveryAddress: false,
    },
  });

  return NextResponse.json({ success: "Address Deleted Successfully" });
}
