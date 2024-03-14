import Container from "@/app/components/Container";
import Image from "next/image";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const food = {
  name: "Classic Margherita Pizza",
  image: "https://cdn.dummyjson.com/recipe-images/1.webp",
  rating: 4.6,
  reviewCount: 3,
  price: 10.99,
  address: "123 Main St, Cityville, USA",
  restaurantName: "Pizza Paradise",
};

const ItemPageClient = () => {
  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="w-full ">
          <div className="">
            <div className="mb-3">
              <h1 className="text-2xl font-bold">{food.name}</h1>
            </div>
            <div className="w-full h-[45vh] overflow-hidden rounded-xl relative ">
              <Image
                src={food.image}
                fill
                alt=""
                className="w-full object-cover "
              />
            </div>
            <div className=" mt-4 flex flex-row justify-between divide-x">
              <div className="w-1/2 text-center">
                <h1 className="text-xl font-bold tracking-wide">
                  {food.restaurantName}
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-neutral-600">
                  {food.address}
                </p>
              </div>
              <div className="w-1/2 text-center">
                <div>
                  <button className="border px-6 py-1 text-lg font-semibold rounded-full border-neutral-300 hover:text-green-500 hover:bg-white transition bg-green-600 text-white">
                    Add
                  </button>
                </div>
                <div className="mt-2 flex justify-center gap-x-6 items-center">
                  <p className="font-bold text-lg">${food.price}</p>
                  <p className="inline-flex gap-2 clear-start font-semibold">
                    <CiStar size={20} />
                    <span>{food.rating}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-10 flex flex-col md:flex-row gap-2 justify-between">
              <div className="w-full flex flex-col gap-y-4 bg-neutral-50 rounded">
                <h1 className="pt-4 pl-4 text-2xl text-black font-bold border-b pb-2 ">
                  Pizza Paradise{" "}
                  <span className="text-base text-neutral-500 ml-2 self-start">
                    (Menu)
                  </span>
                </h1>
                <div className="flex flex-row justify-between items-center p-4 pr-10 ">
                  <div className="">
                    <h1 className="font-semibold text-xl max-w-xs">
                      {food.name} (with white sauce)
                    </h1>
                    <div className="mt-2 relative h-20 w-20">
                      <Image
                        src={food.image}
                        alt=""
                        fill
                        className="absolute rounded-md"
                      />
                    </div>
                    <p className="mt-2 text-neutral-600 font-medium">$ 233</p>
                  </div>
                  <div>
                    <button className="border bg-white border-gray-300 px-4 py-1 rounded-md text-green-500 hover:bg-green-600 transition hover:text-white">
                      Add
                    </button>
                  </div>
                </div>
                <div className="flex flex-row justify-between items-center p-4 pr-10 ">
                  <div className="">
                    <h1 className="font-semibold text-xl max-w-xs">
                      {food.name} (with white sauce)
                    </h1>
                    <div className="mt-2 relative h-20 w-20">
                      <Image
                        src={food.image}
                        alt=""
                        fill
                        className="absolute rounded-md"
                      />
                    </div>
                    <p className="mt-2 text-neutral-600 font-medium">$ 233</p>
                  </div>
                  <div>
                    <button className="border bg-white border-gray-300 px-4 py-1 rounded-md text-green-500 hover:bg-green-600 transition hover:text-white">
                      Add
                    </button>
                  </div>
                </div>{" "}
                <div className="flex flex-row justify-between items-center p-4 pr-10 ">
                  <div className="">
                    <h1 className="font-semibold text-xl max-w-xs">
                      {food.name} (with white sauce)
                    </h1>
                    <div className="mt-2 relative h-20 w-20">
                      <Image
                        src={food.image}
                        alt=""
                        fill
                        className="absolute rounded-md"
                      />
                    </div>
                    <p className="mt-2 text-neutral-600 font-medium">$ 233</p>
                  </div>
                  <div>
                    <button className="border bg-white border-gray-300 px-4 py-1 rounded-md text-green-500 hover:bg-green-600 transition hover:text-white">
                      Add
                    </button>
                  </div>
                </div>{" "}
                <div className="flex flex-row justify-between items-center p-4 pr-10 ">
                  <div className="">
                    <h1 className="font-semibold text-xl max-w-xs">
                      {food.name} (with white sauce)
                    </h1>
                    <div className="mt-2 relative h-20 w-20">
                      <Image
                        src={food.image}
                        alt=""
                        fill
                        className="absolute rounded-md"
                      />
                    </div>
                    <p className="mt-2 text-neutral-600 font-medium">$ 233</p>
                  </div>
                  <div>
                    <button className="border bg-white border-gray-300 px-4 py-1 rounded-md text-green-500 hover:bg-green-600 transition hover:text-white">
                      Add
                    </button>
                  </div>
                </div>
              </div>
              {/* <div className="w-2/5">
                <div className=" rounded-lg shadow-sm border border-neutral-100 p-4 ">
                  <div className="flex flex-col gap-y-6 border-b pb-6 mb-6">
                    <div className="flex flex-row justify-between">
                      <div>
                        <h1 className="font-bold text-xl">{food.name}</h1>
                        <p className="text-lg text-neutral-600 inline-flex gap-2 items-center">
                          {food.restaurantName}
                        </p>
                        <p className="font-bold flex gap-2">
                          4.5
                          <span className="text-green-600">
                            <FaStar size={18} />
                          </span>
                        </p>
                        <p className="mt-2 font-semibold ">$ {food.price}</p>
                      </div>

                      <div className="">
                        <div className="relative h-20 w-28 ">
                          <Image
                            src={food.image}
                            alt=""
                            fill
                            className="absolute rounded-lg"
                          />
                        </div>
                        <div className="flex flex-row gap-2 mt-4 justify-between items-center">
                          <div className="border  p-2 text-sm text-gray-700 rounded-md hover:bg-gray-100 transition cursor-pointer ">
                            <AiOutlineMinus />
                          </div>
                          <div>1</div>
                          <div className="border p-2 text-sm text-gray-700 rounded-md hover:bg-gray-100 cursor-pointer transition ">
                            <AiOutlinePlus />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row justify-between">
                      <div>
                        <h1 className="font-bold text-xl">{food.name}</h1>
                        <p className="text-lg text-neutral-600 inline-flex gap-2 items-center">
                          {food.restaurantName}
                        </p>
                        <p className="font-bold flex gap-2">
                          4.5
                          <span className="text-green-600">
                            <FaStar size={18} />
                          </span>
                        </p>
                        <p className="mt-2 font-semibold ">$ {food.price}</p>
                      </div>

                      <div className="">
                        <div className="relative h-20 w-28 ">
                          <Image
                            src={food.image}
                            alt=""
                            fill
                            className="absolute rounded-lg"
                          />
                        </div>
                        <div className="flex flex-row gap-2 mt-4 justify-between items-center">
                          <div className="border  p-2 text-sm text-gray-700 rounded-md hover:bg-gray-100 transition cursor-pointer ">
                            <AiOutlineMinus />
                          </div>
                          <div>1</div>
                          <div className="border p-2 text-sm text-gray-700 rounded-md hover:bg-gray-100 cursor-pointer transition ">
                            <AiOutlinePlus />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <p className="font-bold text-lg">Items</p>
                    <p className="text-lg">2</p>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <p className="font-bold text-xl">Total</p>
                    <p className="text-lg">$ 998</p>
                  </div>
                  <div className="mt-6">
                    <button className="w-full bg-orange-500 font-semibold text-white py-2 rounded-md hover:bg-orange-600 transition">
                      Go to Cart
                    </button>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ItemPageClient;
// restaurant
// restaurant location
// foodname
// delivery time
// price
// rating