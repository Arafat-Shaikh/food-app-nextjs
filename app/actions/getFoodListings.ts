import prisma from "@/app/libs/prismadb";

// interface IFoodListingParams {
//   name: string;
//   imageSrc: string;
//   price: number;
//   rating: number;
//   restaurantAddress: string;
//   restaurantName: string;
// }

export default async function getFoodListing() {
  try {
    const foodListing = await prisma.foodListing.findMany({});
    return foodListing;
  } catch (error: any) {
    throw new Error(error);
  }
}
