"use client";

import { IoMdClose } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import useRegisterModal from "../hooks/useRegisterModal";
import useLoginModal from "../hooks/useLoginModal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { signIn } from "next-auth/react";

const SignupModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { name: "", email: "", password: "" },
  });

  if (!registerModal.isOpen) {
    return null;
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    axios
      .post("/api/register", data)
      .then(() => {
        registerModal.onClose();
        loginModal.onOpen();
      })
      .catch((error) => {
        alert("something went wrong");
      });
  };

  const toggleModal = () => {
    loginModal.onOpen();
    registerModal.onClose();
  };

  return (
    <div className="fixed z-50 inset-0 bg-neutral-800/70 flex justify-center items-center overflow-x-hidden overflow-y-auto outline-none ">
      <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
        <div className="translate duration-300 h-full translate-y-0 opacity-100">
          <div className="bg-white shadow-sm rounded-md flex flex-col gap-4">
            <div className="relative border-b border-neutral-200 py-2">
              <h1 className="py-3 px-2 text-center w-full text-xl font-bold">
                Register
              </h1>
              <div
                onClick={() => registerModal.onClose()}
                className="absolute top-5 right-5 text-gray-600 hover:opacity-80 cursor-pointer"
              >
                <IoMdClose size={20} />
              </div>
            </div>
            <div className="p-10 pt-6">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-lg font-semibold text-neutral-800"
                >
                  Email
                </label>
                <input
                  id="email"
                  {...register("email", { required: true })}
                  type="text"
                  placeholder="Email"
                  className={`block border w-full py-4 px-4 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-400 transition 
                  ${errors["email"] ? "border-rose-500" : "border-neutral-300"}
                  `}
                />
              </div>{" "}
              <div className="flex flex-col gap-2 mt-4">
                <label
                  htmlFor="name"
                  className="text-lg font-semibold text-neutral-800"
                >
                  Name
                </label>
                <input
                  id="name"
                  {...register("name", { required: true })}
                  type="text"
                  placeholder="Name"
                  className={`block border w-full py-4 px-4 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-400 transition  
                  ${errors["name"] ? "border-rose-500" : "border-neutral-300"}`}
                />
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-lg text-neutral-800 font-semibold"
                >
                  Password
                </label>
                <input
                  id="password"
                  {...register("password", { required: true })}
                  type="text"
                  placeholder="Password"
                  className={`block border w-full py-4 px-4 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-400 transition 
                  ${
                    errors["password"]
                      ? "border-rose-500"
                      : "border-neutral-300"
                  }
                  `}
                />
              </div>
              <div className="mt-16 text-center">
                <button
                  onClick={handleSubmit(onSubmit)}
                  className="bg-orange-400 w-full py-3 text-white font-semibold text-lg rounded hover:opacity-90"
                >
                  Continue
                </button>
              </div>
              <button
                onClick={() => signIn("google")}
                className="relative mt-2 w-full border py-3 border-neutral-500 rounded font-semibold hover:opacity-80"
              >
                Continue with Google
                <div className="absolute top-2 left-4">
                  <FcGoogle size={20} />
                </div>
              </button>
              <p className="mt-2 text-sm text-neutral-600 text-center">
                Already have an account?{" "}
                <span
                  onClick={toggleModal}
                  className="text-neutral-800 text-base hover:opacity-80 cursor-pointer"
                >
                  Log In
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
