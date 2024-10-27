"use client";

import Image from "next/image";
import { IoIosArrowRoundDown } from "react-icons/io";
import { FoodListing } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

interface HomeClientProps {
  foodList: FoodListing[];
  foodListLength: number;
}

const filters = [
  {
    name: "American",
    selected: false,
  },
  {
    name: "BBQ",
    selected: false,
  },
  {
    name: "Breakfast",
    selected: false,
  },
  {
    name: "Lunch",
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
    selected: false,
  },
  {
    name: "Deserts",
    selected: false,
  },
  {
    name: "Italian",
    selected: false,
  },
];

const HomeClient: React.FC<HomeClientProps> = ({
  foodList,
  foodListLength,
}) => {
  const [isSortMenu, setIsSortMenu] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const productsPerPage = 6;
  const pageParam = Number(params?.get("pageVal")) || 1;
  const totalPages = Math.ceil(foodListLength / productsPerPage);

  if (foodList?.length === 0) {
    return (
      <div className="flex justify-center items-center">
        <h1>No Items available</h1>
      </div>
    );
  }

  const handleFilter = (label: string) => {
    let categoryParams = params?.get("category");
    let categoryArr = categoryParams?.split(",") || [];
    let currentQuery: any = "";

    if (categoryArr) {
      const index = categoryArr.findIndex((item) => item === label);
      if (index !== -1) {
        categoryArr.splice(index, 1);
      } else {
        categoryArr.push(label);
      }
    } else {
      categoryArr = [label];
    }

    currentQuery = categoryArr.join(",");

    let updatedQuery = {
      category: currentQuery,
    };

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  };

  const itemSelected = (item: any) => {
    let categoryParams = params?.get("category");
    let categoryArr = categoryParams?.split(",");

    if (categoryArr?.includes(item.name)) {
      return true;
    } else {
      return false;
    }
  };

  const handleSort = (label: string) => {
    let currentQuery: any = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
      if (label === "topRating") {
        delete currentQuery["lowPrice"];
      } else {
        delete currentQuery["topRating"];
      }
    }

    const updatedQuery = {
      ...currentQuery,
      [label]: true,
    };

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  };

  const handlePageFilter = (item: number) => {
    let query = {};

    if (params) {
      query = qs.parse(params.toString());
    }

    let updatedQuery = {
      ...query,
      pageVal: item,
    };

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  };

  const isCurrentPage = (idx: number) => {
    let pageParam = null;
    if (params) {
      pageParam = params.get("pageVal");
    }

    if (!pageParam && idx === 1) {
      return true;
    } else if (Number(pageParam) === idx) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-10 ">
      <div className="w-full md:w-3/12 px-2">
        <div className="flex flex-col ">
          <div className="w-full flex justify-between mb-4">
            <p className="text-lg font-semibold text-gray-700 hidden lg:block">
              Filter by Choice
            </p>
            <p
              onClick={() => router.replace("/")}
              className="font-medium underline text-gray-900 cursor-pointer hover:opacity-80 transition"
            >
              Remove filters
            </p>
          </div>
          <div className="flex items-center justify-center w-full">
            <div className="flex flex-col sm:max-w-sm lg:max-w-none w-full">
              {filters.map((item: any) => (
                <div key={item.name} className="">
                  <button
                    onClick={() => handleFilter(item.name)}
                    className={`border w-full rounded-md py-3 mt-1 text-gray-600 font-medium ${
                      itemSelected(item)
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
      </div>
      <div className="w-full md:w-9/12  h-screen flex flex-col">
        <div
          onClick={() => setIsSortMenu((val) => !val)}
          className="relative flex items-center justify-end "
        >
          <p className=" text-gray-900 inline-flex items-center gap-1 border rounded-full px-3 py-1 border-gray-300 text-sm font-medium cursor-pointer">
            <span>Sort by</span>
            <IoIosArrowRoundDown size={20} />
          </p>
          {isSortMenu && (
            <div className="absolute top-9 right-1 z-50 bg-white w-40 border rounded-md shadow-md transition">
              <div
                onClick={() => handleSort("topRating")}
                className="py-2 px-4 text-sm font-medium hover:bg-neutral-100 cursor-pointer"
              >
                Top Rating
              </div>
              <div
                onClick={() => handleSort("lowPrice")}
                className="py-2 px-4 text-sm font-medium hover:bg-neutral-100 cursor-pointer "
              >
                Low Price
              </div>{" "}
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {foodList.map((item) => (
            <div
              onClick={() => router.push(`/item/${item.id}`)}
              key={item.id}
              className="py-3"
            >
              <div className="cols-span-1 cursor-pointer group">
                <div className="flex flex-col gap-2 w-full">
                  <div className="aspect-video w-full relative overflow-hidden rounded-xl">
                    <Image
                      src={item.imageSrc}
                      alt="item"
                      fill
                      className="object-cover h-full w-full group-hover:scale-110 transition duration-200"
                    />
                  </div>
                  <div className="font-bold text-lg">{item.name}</div>
                  <div className="flex flex-row items-center gap-1">
                    <div className="font-semibold">{item.restaurantName}, </div>
                    <div className="font-light text-neutral-500">
                      {item.restaurantLocation}
                    </div>
                  </div>

                  <div className="font-semibold">$ {item.price}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-auto bottom-0 pb-8 flex items-center justify-center gap-x-3">
          <div
            onClick={() =>
              handlePageFilter(pageParam > 1 ? pageParam - 1 : pageParam)
            }
            className="p-2 rounded-lg hover:bg-gray-100 transition cursor-pointer mr-4"
          >
            <p className="text-gray-70 ">
              <IoIosArrowBack size={20} />
            </p>
          </div>
          {Array.from({
            length: totalPages,
          }).map((item, idx) => (
            <div
              key={idx}
              onClick={() => handlePageFilter(idx + 1)}
              className={`${
                isCurrentPage(idx + 1) ? "bg-neutral-300" : "bg-white border"
              }  text-gray-700 font-semibold px-3 py-1 rounded-md cursor-pointer shadow-sm`}
            >
              <p>{idx + 1}</p>
            </div>
          ))}

          {/* <div className="bg-white shadow-sm border px-3 py-1 font-semibold rounded-md text-gray-700">
            <p>2</p>
          </div>
          <div className="bg-white shadow-sm border px-3 py-1 font-semibold rounded-md text-gray-700">
            <p>3</p>
          </div> */}
          <div
            onClick={() =>
              handlePageFilter(
                pageParam < totalPages ? pageParam + 1 : pageParam
              )
            }
            className="p-2 ml-4 rounded-lg hover:bg-gray-100 transition cursor-pointer mr-4"
          >
            <p className="text-gray-700 ">
              <IoIosArrowForward size={20} />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeClient;
