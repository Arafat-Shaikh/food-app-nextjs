"use client";

import { SiSwiggy } from "react-icons/si";
import { RxAvatar } from "react-icons/rx";
import { FiShoppingCart } from "react-icons/fi";
import { BiSolidOffer } from "react-icons/bi";
import { TbMenu2 } from "react-icons/tb";
import { IoIosHelpCircleOutline } from "react-icons/io";
import useRegisterModal from "../hooks/useRegisterModal";
import useLoginModal from "../hooks/useLoginModal";
import { useState } from "react";
import { FaUser } from "react-icons/fa6";
import getCurrentUser from "../actions/getCurrentUser";
import { User } from "@prisma/client";
import Link from "next/link";

interface NavbarProps {
  currentUser?: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  console.log(currentUser);

  // const currentUser = await getCurrentUser();

  // console.log(currentUser?.name);

  return (
    <div className="fixed w-full z-10 bg-white px-4 sm:px-8 lg:px-12 py-2 sm:py-3 shadow-sm">
      <div className="flex justify-between">
        <div className="flex items-center">
          <Link href={"/"} className="text-amber-500">
            <SiSwiggy size={30} />
          </Link>
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
            className="hidden  lg:inline-flex gap-2 items-center font-medium text-base lg:text-lg"
          >
            <RxAvatar size={20} />
            Sign in
          </button>
          <Link
            href={"/cart"}
            className="hidden lg:inline-flex gap-2 items-center font-medium  text-base lg:text-lg"
          >
            <FiShoppingCart size={20} />
            <span className="">Cart</span>
          </Link>
          <div className="relative flex items-center ">
            <div
              onClick={() => setIsMenuOpen((val) => !val)}
              className="flex items-center gap-2 border-[1px] p-1 rounded-full flex-shrink-0 text-gray-500 cursor-pointer"
            >
              <span className="ml-2">
                <TbMenu2 size={24} />
              </span>
              <span className="rounded-full bg-neutral-100 p-2">
                <FaUser size={18} />
              </span>
            </div>
            {isMenuOpen && (
              <div className=" absolute top-14 right-0 bg-white shadow-md w-48  rounded-md py-1">
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
