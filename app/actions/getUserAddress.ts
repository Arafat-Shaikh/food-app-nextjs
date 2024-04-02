import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getUserAddress() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return null;
    }

    const addresses = await prisma.address.findMany({
      where: {
        userId: currentUser?.id,
      },
    });

    return addresses;
  } catch (error: any) {
    throw new Error(error);
  }
}
