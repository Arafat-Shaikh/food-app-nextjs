import Container from "../components/Container";
import Navbar from "../components/Navbar";
import { FaCheckCircle } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { CiLocationOn } from "react-icons/ci";
import Image from "next/image";
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

const CartClientPage = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-200 h-full">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-9 gap-x-8">
            <div className="col-span-6">
              <div className="bg-white px-10 py-8 flex flex-col gap-x-8 gap-y-6">
                <p className="inline-flex gap-6">
                  <span className="text-lg font-bold">Logged In</span>{" "}
                  <span className="rounded-full text-[#60b246]">
                    <FaCheckCircle size={22} />
                  </span>
                </p>
                <div className="flex items-center gap-x-4 text-lg font-bold divide-x-2 ">
                  <p>Arafat Shaikh</p>
                  <p className="pl-6 text-neutral-600">
                    arafatshaikh823@gmail.com
                  </p>
                </div>
              </div>
              <div className="bg-white px-10 py-8 flex flex-col gap-x-8 gap-y-6 mt-6">
                <h1 className="font-bold text-lg">Add a delivery address</h1>
                <p></p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 ">
                  <div className="border border-dashed border-gray-300 aspect-video px-6 py-7 hover:shadow-lg cursor-pointer">
                    <div className="flex gap-5 justify-between">
                      <div className="text-gray-600">
                        <GoHome size={20} />
                      </div>
                      <div>
                        <h1 className="text-lg font-bold">Home</h1>
                        <p className="text-xs text-neutral-500 mt-1">
                          B 22/120-G-32, Kashmiri Ganj, Khojwan, Bhelupur,
                          Varanasi, Uttar Pradesh 221010, India
                        </p>
                        <p className="text-sm font-bold mt-7 text-neutral-700">
                          30 MINS
                        </p>
                        <button className="mt-4 text-sm border-[#60b246] border-[2px] font-bold px-5 py-1.5 bg-[#60b246] text-white ">
                          DELIVER HERE
                        </button>
                      </div>
                    </div>
                  </div>{" "}
                  <div className="border border-dashed border-gray-300 aspect-video px-6 py-7 hover:shadow-lg cursor-pointer">
                    <div className="flex gap-5 justify-between">
                      <div className="text-gray-600">
                        <GoHome size={20} />
                      </div>
                      <div>
                        <h1 className="text-lg font-bold">Home</h1>
                        <p className="text-xs text-neutral-500 mt-1">
                          B 22/120-G-32, Kashmiri Ganj, Khojwan, Bhelupur,
                          Varanasi, Uttar Pradesh 221010, India
                        </p>
                        <p className="text-sm font-bold mt-7 text-neutral-700">
                          30 MINS
                        </p>
                        <button className="mt-4 text-sm border-[#60b246] border-[2px] font-bold px-5 py-1.5 bg-[#60b246] text-white ">
                          DELIVER HERE
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="border border-dashed border-gray-300 aspect-video px-6 py-7 hover:shadow-lg cursor-pointer">
                    <div className="flex gap-5 justify-between">
                      <div className="text-gray-600">
                        <CiLocationOn size={20} />
                      </div>
                      <div>
                        <h1 className="text-lg font-bold">Add New Address</h1>
                        <p className="text-xs text-neutral-500 mt-1">
                          B 22/120-G-32, Kashmiri Ganj, Khojwan, Bhelupur,
                          Varanasi, Uttar Pradesh 221010, India
                        </p>
                        <p className="text-sm font-bold mt-7 text-neutral-700">
                          30 MINS
                        </p>
                        <button className="mt-4 text-sm border-[#60b246] border-[2px] font-bold px-5 py-2 bg-white text-[#60b246] w-36 h-9">
                          ADD NEW
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-white px-10 py-8">
                <h1 className="text-lg font-bold text-black">
                  Choose Payment Method
                </h1>
                <button className="w-full py-2.5 bg-[#60b246] text-white text-xl font-bold hover:shadow-md mt-6">
                  Proceed To Pay
                </button>
              </div>
            </div>
            <div className="col-span-3 -mr-8 ">
              <div className=" bg-white px-6 py-7">
                <div className="flex gap-3">
                  <div className="relative h-16 w-16">
                    <Image src={food.image} fill alt="" className="absolute " />
                  </div>
                  <div className="">
                    <p className="font-semibold ">{food.restaurantName}</p>
                    <p className="text-neutral-500 font-medium text-sm">
                      {food.address}
                    </p>
                  </div>
                </div>
                <div className="mt-8 flex items-center justify-between">
                  <div className="text-sm font-medium text-black max-w-32 ">
                    {food.name}
                  </div>
                  <div className="flex gap-x-3 font-semibold items-center border border-neutral-300 px-3 py-1 text-[#60b246]">
                    <button>
                      <AiOutlineMinus size={12} />
                    </button>
                    <span className="text-sm">2</span>
                    <button>
                      <AiOutlinePlus size={12} />
                    </button>
                  </div>
                  <div className="">$ 573</div>
                </div>{" "}
                <div className="mt-8 flex items-center justify-between">
                  <div className="text-sm font-medium text-black max-w-32 ">
                    {food.name}
                  </div>
                  <div className="flex gap-x-3 font-semibold items-center border border-neutral-300 px-3 py-1 text-[#60b246]">
                    <button>
                      <AiOutlineMinus size={12} />
                    </button>
                    <span className="text-sm">2</span>
                    <button>
                      <AiOutlinePlus size={12} />
                    </button>
                  </div>
                  <div className="">$ 573</div>
                </div>
                <div className="mt-6 w-full bg-neutral-50 pt-4 pb-1 flex justify-center">
                  <h1 className="flex items-start gap-2">
                    <span className="text-4xl leading-none text-neutral-700">
                      “{" "}
                    </span>
                    <span className="text-sm text-neutral-500">
                      Any Suggestions? We will pass it on...
                    </span>
                  </h1>
                </div>
                <div className="mt-8">
                  <div className="text-sm flex flex-col gap-y-2">
                    <h1 className="font-semibold text-base">Bill Details</h1>
                    <div className="flex justify-between ">
                      <div>Item total</div>
                      <div>$ 110</div>
                    </div>
                    <div className="flex justify-between border-b border-neutral-200 pb-3 mb-1">
                      <div>Delivery fee</div>
                      <div>$ 11</div>
                    </div>
                    <div className="flex justify-between">
                      <div>Delivery Tip</div>
                      <div className="text-red-600">Add tip</div>
                    </div>
                    <div className="flex justify-between">
                      <div>Platform fee</div>
                      <div>
                        <span className="text-neutral-400 line-through mr-2">
                          $ 4.00
                        </span>
                        <span>3</span>
                      </div>
                    </div>
                    <div className="flex justify-between pb-5 border-b-[2px] mb-3 border-black">
                      <div>Restaurant Charges</div>
                      <div>$ 4</div>
                    </div>
                    <div className="flex justify-between">
                      <div className="text-lg text-black font-bold">To Pay</div>
                      <div className="text-base text-black font-bold">
                        $ 146
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default CartClientPage;
