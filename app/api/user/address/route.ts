import getCurrentUser from "@/app/actions/getCurrentUser";
import getUserAddress from "@/app/actions/getUserAddress";
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
    return null;
  }

  const body = await request.json();

  if (!body) {
    return null;
  }

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
    return null;
  }

  console.log("come here");

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
