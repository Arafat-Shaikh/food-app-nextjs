"use client";

import { IoMdClose } from "react-icons/io";
import useAddressModal from "../hooks/useAddressModal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const UserAddressModal = () => {
  const addressModal = useAddressModal();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { place: "", phone: "", address: "" },
  });

  if (!addressModal.isOpen) {
    return null;
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (loading) return;

    setLoading(true);

    axios
      .post("/api/user/address", data)
      .then(() => {
        toast.success("Address updated");
        router.refresh();
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="transition fixed inset-0 w-full z-50 bg-neutral-800/70 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none ">
      <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 h-full sm:h-auto lg:h-auto ">
        <div className="">
          <div className="bg-white rounded-md ">
            <div className="relative py-5 text-center border-b border-neutral-300">
              <h1 className="font-medium text-lg">Add New Address</h1>
              <span
                onClick={() => addressModal.onClose()}
                className="absolute right-4 top-4 cursor-pointer"
              >
                <IoMdClose size={18} />
              </span>
            </div>
            <div className="mt-6 pb-10 flex flex-col gap-y-4 py-4 px-8 sm:px-8 lg:px-12">
              <div className="flex flex-col gap-y-2">
                <label htmlFor="place">Place</label>
                <input
                  id="place"
                  {...register("place", { required: true })}
                  type="text"
                  placeholder="Home / commercial"
                  className="block w-full border border-neutral-300 py-3 px-2 rounded-md focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <label htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  {...register("phone", { required: true })}
                  type="text"
                  className="block w-full border border-neutral-300 py-3 px-2 rounded-md focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <label htmlFor="address">Address</label>
                <textarea
                  id="address"
                  {...register("address", { required: true })}
                  placeholder="Delivery Address here "
                  className="w-full  border-neutral-300 border h-[120px] p-2 resize-none rounded-md py-3 focus:outline-none"
                ></textarea>
              </div>
              <div className="mt-10 text-center">
                <button
                  onClick={handleSubmit(onSubmit)}
                  className="bg-[#60b246] w-full py-2 text-white text-lg rounded-md focus:outline-none hover:bg-[#70bc54] transition "
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAddressModal;
