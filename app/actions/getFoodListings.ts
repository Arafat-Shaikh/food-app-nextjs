import prisma from "@/app/libs/prismadb";

export interface IFoodListingParams {
  category?: string;
  topRating?: boolean;
  lowPrice?: boolean;
  searchVal?: string;
  pageVal?: string;
}

export default async function getFoodListing(params: IFoodListingParams) {
  try {
    const { category, topRating, lowPrice, searchVal, pageVal } = params;
    const productsPerPage = 6;
    const page = Number(pageVal) || 1;

    let query: any = {};
    let orderBy: any = {};

    if (searchVal) {
      query = {
        OR: [
          { name: { contains: searchVal, mode: "insensitive" } },
          { restaurantName: { contains: searchVal, mode: "insensitive" } },
        ],
      };
    } else {
      if (category) {
        let categoryArr = category.split(",");
        query.category = { in: categoryArr };
      }

      if (lowPrice) {
        orderBy = {
          price: "asc",
        };
      } else if (topRating) {
        orderBy = {
          rating: "desc",
        };
      }
    }

    const foodListing = await prisma.foodListing.findMany({
      where: query,
      orderBy: orderBy,
    });

    let newFoodListing: any = [];

    for (let i = 0; i < foodListing.length; i++) {
      if (
        i >= productsPerPage * (page - 1) &&
        newFoodListing.length < productsPerPage
      ) {
        newFoodListing.push(foodListing[i]);
      }
    }

    return { foodList: newFoodListing, foodListLength: foodListing.length };
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}
