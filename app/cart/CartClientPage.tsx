"use client";

import Container from "../components/Container";
import Navbar from "../components/Navbar";
import { FaCheckCircle } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { CiLocationOn } from "react-icons/ci";
import Image from "next/image";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { Address, FoodListing } from "@prisma/client";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import useAddressModal from "../hooks/useAddressModal";
import { FiPhone } from "react-icons/fi";
import EmptyPlace from "../components/EmptyPlace";
import { useEffect, useState } from "react";

const food = {
  name: "Classic Margherita Pizza",
  image: "https://cdn.dummyjson.com/recipe-images/1.webp",
  rating: 4.6,
  reviewCount: 3,
  price: 10.99,
  address: "123 Main St, Cityville, USA",
  restaurantName: "Pizza Paradise",
};

interface CartItems {
  id: string;
  userId: string;
  foodId: string;
  quantity: number;
  food: FoodListing;
}

interface CartClientPageProps {
  cartItems: CartItems[] | null;
  userAddress: Address[] | null;
}

const DELIVERY_FEE = 3;
const PLATFORM_FEE = 1;

const CartClientPage: React.FC<CartClientPageProps> = ({
  cartItems,
  userAddress,
}) => {
  const router = useRouter();
  const addressModal = useAddressModal();
  const delAddress = userAddress?.find((item) => item.deliveryAddress);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const canceledParam = searchParams?.get("canceled");
  const id = "kdh";

  console.log(typeof canceledParam, canceledParam);

  useEffect(() => {
    if (canceledParam) {
      console.log("hello");
      axios
        .delete(`/api/user/order/${canceledParam.toString()}`)
        .then(() => {
          toast.success("order deleted successfully");
        })
        .finally(() => {
          console.log("finally");
        });
    }
  }, [canceledParam]);

  const itemTotalAmount = () => {
    if (!cartItems) {
      return 0;
    }
    const totalAmount = cartItems.reduce(
      (acc, item) => item.quantity * item.food.price + acc,
      0
    );
    return totalAmount;
  };
  const totalAmount = itemTotalAmount() + DELIVERY_FEE + PLATFORM_FEE;

  const handleQuantity = (opt: string, item: CartItems) => {
    if (opt === "reduce") {
      item.quantity -= 1;
    } else if (opt === "add") {
      item.quantity += 1;
    }
    axios
      .patch("/api/cart", item)
      .then(() => {
        toast.success("item updated");
        router.refresh();
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        toast.success("item updated finally");
      });
  };

  const handleSelectedAddress = (item: Address) => {
    axios
      .patch("/api/user/address", item)
      .then(() => {
        toast.success("Address Selected");
        router.refresh();
      })
      .catch((error) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        toast.success("ok");
      });
  };

  const removeDelAddress = (item: any) => {
    axios
      .put("/api/user/address", item)
      .then(() => {
        toast.success("item deleted");
        router.refresh();
      })
      .catch((error) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        console.log("done");
      });
  };

  const onCheckout = async () => {
    setLoading(true);
    const response = await axios.post("/api/user/checkout", {
      totalAmount,
      cartItems,
      delAddress,
    });

    window.location = response.data.url;

    setLoading(false);
  };

  return (
    <>
      <div className="bg-gray-200 h-full">
        <Container>
          <div className="flex flex-col-reverse lg:flex-row gap-x-8">
            <div className="lg:w-4/6">
              <div className="hidden bg-white px-10 py-8 lg:flex flex-col gap-x-8 gap-y-6">
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
                {!delAddress?.id && (
                  <>
                    <h1 className="font-bold text-lg">
                      Add a delivery address
                    </h1>

                    <div className="grid grid-rows-1 grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 ">
                      {userAddress?.map((item) => (
                        <div
                          key={item.id}
                          className=" col-span-1 aspect-video border border-gray-300 px-6 py-7 hover:shadow-lg cursor-pointer"
                        >
                          <div className="flex gap-5 ">
                            <div className="text-gray-600">
                              <GoHome size={20} />
                            </div>
                            <div>
                              <h1 className="text-lg font-bold">
                                {item.place}
                              </h1>
                              <p className="text-xs text-neutral-500 mt-1 min-h-12">
                                {item.address}
                              </p>
                              <p className="flex gap-2 items-center text-sm font-bold mt-7 text-neutral-700">
                                <span>
                                  <FiPhone size={16} />
                                </span>
                                {item.phone}
                              </p>
                              <button
                                onClick={() => handleSelectedAddress(item)}
                                className="mt-4 text-sm border-[#60b246] border-[2px] font-bold px-5 py-1.5 bg-[#60b246] text-white "
                              >
                                DELIVER HERE
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}

                      <div className="border border-dashed border-gray-300 aspect-video px-6 py-7 hover:shadow-lg cursor-pointer">
                        <div className="flex gap-5 justify-between">
                          <div className="text-gray-600">
                            <CiLocationOn size={20} />
                          </div>
                          <div>
                            <h1 className="text-lg font-bold">
                              Add New Address
                            </h1>
                            <p className="text-xs text-neutral-500 mt-1 min-h-12">
                              B 22/120-G-32, Kashmiri Ganj, Khojwan, Bhelupur,
                              Varanasi, Uttar Pradesh 221010, India
                            </p>
                            <p className="flex gap-2 items-center text-sm font-bold mt-7 text-neutral-700">
                              <span>
                                <FiPhone size={16} />
                              </span>
                              999999999
                            </p>
                            <button
                              onClick={() => addressModal.onOpen()}
                              className="mt-4 text-sm border-[#60b246] border-[2px] font-bold px-5 py-2 bg-white text-[#60b246] w-36 h-9"
                            >
                              ADD NEW
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {delAddress?.id && (
                  <div className="flex flex-col gap-y-4">
                    <div className="flex items-center justify-between">
                      <h1 className="text-lg font-bold inline-flex gap-x-6">
                        Delivery Address{" "}
                        <span className="rounded-full text-[#60b246]">
                          <FaCheckCircle size={22} />
                        </span>
                      </h1>
                      <div
                        onClick={() => removeDelAddress(delAddress)}
                        className=""
                      >
                        <span className=" text-amber-700 font-normal cursor-pointer">
                          Change
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="">{delAddress.address}</p>
                      <p className="mt-2 flex items-center gap-x-2 ">
                        <span>
                          <FiPhone size={16} />
                        </span>
                        <span className="font-medium text-sm italic">
                          {delAddress.phone}
                        </span>
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 bg-white px-10 py-8">
                <h1 className="text-lg font-bold text-black">
                  Choose Payment Method
                </h1>
                <button
                  onClick={onCheckout}
                  disabled={loading}
                  className="w-full py-2.5 bg-[#60b246] text-white text-xl font-bold hover:shadow-md mt-6"
                >
                  Proceed To Pay
                </button>
              </div>
            </div>
            <div className="lg:w-2/6  ">
              <div className="lg:hidden bg-white px-10 py-8 flex flex-col gap-x-8 gap-y-6">
                <p className="inline-flex gap-6">
                  <span className="text-base font-bold">Logged In</span>
                  <span className="rounded-full text-[#60b246]">
                    <FaCheckCircle size={22} />
                  </span>
                </p>
                <div className="flex items-center gap-x-4 text-lg font-bold divide-x-2 overflow-hidden  ">
                  <p className="text-sm">Arafat Shaikh</p>
                  <p className="pl-6 text-sm text-neutral-600">
                    arafatshaikh823@gmail.com
                  </p>
                </div>
              </div>
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

                {cartItems?.map((item) => (
                  <div
                    key={item.id}
                    className="mt-8 flex items-center justify-between"
                  >
                    <div className="text-sm font-medium text-black max-w-32 ">
                      {item.food.name}
                    </div>
                    <div className="flex gap-x-3 font-semibold items-center border border-neutral-300 px-3 py-1 text-[#60b246]">
                      <button onClick={() => handleQuantity("reduce", item)}>
                        <AiOutlineMinus size={12} />
                      </button>
                      <span className="text-sm">{item.quantity}</span>
                      <button onClick={() => handleQuantity("add", item)}>
                        <AiOutlinePlus size={12} />
                      </button>
                    </div>
                    <div className="">$ {item.food.price}</div>
                  </div>
                ))}

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
                      <div>$ {itemTotalAmount()}</div>
                    </div>
                    <div className="flex justify-between border-b border-neutral-200 pb-3 mb-1">
                      <div>Delivery fee</div>
                      <div>$ {DELIVERY_FEE}</div>
                    </div>
                    <div className="flex justify-between">
                      <div>Delivery Tip</div>
                      <div className="text-red-600">Add tip</div>
                    </div>
                    <div className="flex justify-between">
                      <div>Platform fee</div>
                      <div>
                        <span className="text-neutral-400 line-through mr-2">
                          $ 3.00
                        </span>
                        <span>{PLATFORM_FEE}</span>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <div className="text-lg text-black font-bold">To Pay</div>
                      <div className="text-base text-black font-bold">
                        $ {totalAmount}
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
