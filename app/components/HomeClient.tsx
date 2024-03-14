import Image from "next/image";
import Link from "next/link";
import { IoIosArrowRoundDown } from "react-icons/io";

const HomeClient = () => {
  const filters = [
    {
      name: "American",
      selected: false,
    },
    {
      name: "BBq",
      selected: false,
    },
    {
      name: "Breakfast",
      selected: false,
    },
    {
      name: "lunch",
      selected: false,
    },
    {
      name: "Dinner",
      selected: false,
    },
    {
      name: "Chinese",
      selected: false,
    },
    {
      name: "Indian",
      selected: true,
    },
    {
      name: "Deserts",
      selected: false,
    },
    {
      name: "Italian",
      selected: true,
    },
  ];

  const foodData = [
    {
      name: "Classic Margherita Pizza",
      image: "https://cdn.dummyjson.com/recipe-images/1.webp",
      rating: 4.6,
      reviewCount: 3,
      price: 10.99,
      address: "123 Main St, Cityville, USA",
      restaurantName: "Pizza Paradise",
    },
    {
      name: "Vegetarian Stir-Fry",
      image: "https://cdn.dummyjson.com/recipe-images/2.webp",
      rating: 4.7,
      reviewCount: 36,
      price: 8.49,
      address: "456 Elm St, Townsville, USA",
      restaurantName: "Wok Master",
    },
    {
      name: "Chocolate Chip Cookies",
      image: "https://cdn.dummyjson.com/recipe-images/3.webp",
      rating: 4.9,
      reviewCount: 23,
      price: 5.99,
      address: "789 Oak St, Villagetown, USA",
      restaurantName: "Sweet Treats Bakery",
    },
    {
      name: "Chicken Alfredo Pasta",
      image: "https://cdn.dummyjson.com/recipe-images/4.webp",
      rating: 4.9,
      reviewCount: 38,
      price: 12.99,
      address: "101 Pine St, Hilltop, USA",
      restaurantName: "Pasta Haven",
    },
    {
      name: "Mango Salsa Chicken",
      image: "https://cdn.dummyjson.com/recipe-images/5.webp",
      rating: 4.9,
      reviewCount: 25,
      price: 11.49,
      address: "234 Cedar St, Mountainview, USA",
      restaurantName: "Tropical Bistro",
    },
    // Duplicated entries with the same image URL
    {
      name: "Classic Margherita Pizza",
      image: "https://cdn.dummyjson.com/recipe-images/1.webp",
      rating: 4.6,
      reviewCount: 3,
      price: 10.99,
      address: "123 Main St, Cityville, USA",
      restaurantName: "Pizza Paradise",
    },
    {
      name: "Vegetarian Stir-Fry",
      image: "https://cdn.dummyjson.com/recipe-images/2.webp",
      rating: 4.7,
      reviewCount: 36,
      price: 8.49,
      address: "456 Elm St, Townsville, USA",
      restaurantName: "Wok Master",
    },
    {
      name: "Chocolate Chip Cookies",
      image: "https://cdn.dummyjson.com/recipe-images/3.webp",
      rating: 4.9,
      reviewCount: 23,
      price: 5.99,
      address: "789 Oak St, Villagetown, USA",
      restaurantName: "Sweet Treats Bakery",
    },
    {
      name: "Chicken Alfredo Pasta",
      image: "https://cdn.dummyjson.com/recipe-images/4.webp",
      rating: 4.9,
      reviewCount: 38,
      price: 12.99,
      address: "101 Pine St, Hilltop, USA",
      restaurantName: "Pasta Haven",
    },
    {
      name: "Mango Salsa Chicken",
      image: "https://cdn.dummyjson.com/recipe-images/5.webp",
      rating: 4.9,
      reviewCount: 25,
      price: 11.49,
      address: "234 Cedar St, Mountainview, USA",
      restaurantName: "Tropical Bistro",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-10">
      <div className="w-full md:w-3/12 px-2">
        <div className="flex flex-col">
          <div className="w-full flex justify-between mb-4">
            <p className="text-lg font-semibold text-gray-700 hidden lg:block">
              Filter by Choice
            </p>
            <p className="font-medium underline text-gray-900">
              Remove filters
            </p>
          </div>
          <div className="flex flex-col text-center max-w-md lg:max-w-none">
            {filters.map((item) => (
              <div key={item.name}>
                <button
                  className={`border w-full rounded-md py-3 mt-1 text-gray-600 font-medium ${
                    item.selected
                      ? "border-gray-700"
                      : "border-gray-300 hover:border-gray-700 transition"
                  }`}
                >
                  {item.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full md:w-9/12 ">
        <div className="flex items-center justify-end ">
          <p className="text-gray-900 inline-flex items-center gap-1 border rounded-full px-3 py-1 border-gray-300 text-sm font-medium">
            <span>Sort by</span>
            <IoIosArrowRoundDown size={20} />
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-12 ">
          {foodData.map((item) => (
            <Link href={"item/1"} key={item.name} className="py-3">
              <div className="cols-span-1 cursor-pointer group">
                <div className="flex flex-col gap-2 w-full">
                  <div className="aspect-video w-full relative overflow-hidden rounded-xl">
                    <Image
                      src={item.image}
                      alt="item"
                      fill
                      className="object-cover h-full w-full group-hover:scale-110 transition duration-200"
                    />
                  </div>
                  <div className="font-bold text-lg">{item.name}</div>
                  <div className="flex flex-row items-center gap-1">
                    <div className="font-semibold">{item.restaurantName}, </div>
                    <div className="font-light text-neutral-500">
                      {item.address}
                    </div>
                  </div>

                  <div className="font-semibold">$ {item.price}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeClient;
