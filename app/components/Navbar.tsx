"use client";

import { SiSwiggy } from "react-icons/si";
import { RxAvatar } from "react-icons/rx";
import { FiShoppingCart } from "react-icons/fi";
import { BiSolidOffer } from "react-icons/bi";
import { TbMenu2 } from "react-icons/tb";
import { IoIosHelpCircleOutline } from "react-icons/io";
import useRegisterModal from "../hooks/useRegisterModal";
import useLoginModal from "../hooks/useLoginModal";

const Navbar = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  return (
    <div className="fixed w-full z-10 bg-white px-4 sm:px-8 lg:px-12 py-2 sm:py-3 shadow-sm">
      <div className="flex justify-between">
        <div className="flex items-center">
          <span className="text-amber-500">
            <SiSwiggy size={30} />
          </span>
        </div>
        <div className="w-full flex items-center justify-center max-w-2xl flex-1 mx-4 sm:mx-10 ">
          <input
            type="text"
            placeholder="Search"
            className="w-full focus:outline-none border border-300 py-3 rounded-full px-3 focus:ring-1 focus:ring-orange-400 transition duration-100 focus:shadow"
          />
        </div>
        <div className="flex gap-4 sm:gap-16 justify-between">
          <button
            onClick={() => loginModal.onOpen()}
            className="hidden  sm:inline-flex gap-2 items-center font-medium text-base lg:text-lg"
          >
            <RxAvatar size={20} />
            Sign in
          </button>
          <button className="hidden sm:inline-flex gap-2 items-center font-medium  text-base lg:text-lg">
            <FiShoppingCart size={20} />
            <span className="">Cart</span>
          </button>
          <div className="relative flex items-center ">
            <div className="border-[1px] p-2 rounded-full flex-shrink-0 text-gray-500 cursor-pointer">
              <span className="">
                <TbMenu2 size={18} />
              </span>
            </div>
            {false && (
              <div className="absolute top-8 right-0 bg-white shadow-md w-48  rounded-md py-1">
                <div className="flex flex-col ">
                  <div className="w-full font-medium text-sm text-black py-3 hover:bg-gray-100 transition px-4">
                    Orders
                  </div>{" "}
                  <div className="w-full font-medium text-sm text-black py-3 hover:bg-gray-100 transition px-4">
                    Offers
                  </div>{" "}
                  <div className="w-full font-medium text-sm text-black py-3 hover:bg-gray-100 transition px-4">
                    <span>Help</span>
                  </div>
                  <div className="w-full font-medium text-sm text-black py-3 hover:bg-gray-100 transition px-4">
                    Log in
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
