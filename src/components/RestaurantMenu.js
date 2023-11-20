import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { MenuShimmer } from "./ShimmerUI";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import MenuCategory from "./MenuCategory";

const RestaurantMenu = () => {
  const [showIndex, setShowIndex] = useState(0);
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);
  console.log(resInfo);

  if (resInfo.data === null) {
    return <MenuShimmer />;
  }

  const { name, cuisines, avgRating, sla, areaName, totalRatingsString } =
    resInfo.data;

  const offers = resInfo.data.aggregatedDiscountInfo.descriptionList;

  return (
    <div className="menu-container flex flex-col justify-center items-center w-[100%] py-5">
      <div className="border border-gray-500 bg-gray-50 rounded-md w-[90%] md:w[70%] shadow-md">
        <div className="flex flex-col md:flex-row justify-between p-2">
          <div className="leading-7">
            <h1 className="text-lg font-bold">{name}</h1>
            <span className="text-sm">👨‍🍳{cuisines.join(", ")}</span>
            <br />
            <span className="text-sm">
              ↪ {areaName}, {sla.slaString}
            </span>
          </div>
          <div className="rating-container">
            <p className="text-sm mt-1">⭐ {avgRating}</p>
            <p className="text-sm mt-1">® {totalRatingsString}</p>
          </div>
        </div>
        <hr className="bg-gray-400" />
        <div className="p-2">
          <p className="fee-text">
            ❗Far (4 kms) | Additional delivery fee will apply
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 my-5">
        <div className="border border-gray-500 bg-gray-50 rounded-md p-3 hover:shadow-md cursor-pointer">
          <p className="text-sm">🔄 {offers[0].meta}</p>
        </div>
        <div className="border border-gray-500 bg-gray-50 rounded-md p-3 hover:shadow-md cursor-pointer">
          <p className="text-sm">🔄 {offers[1].meta}</p>
        </div>
      </div>

      <hr className="bg-gray-400 w-[99%] my-3" />

      {resInfo?.menuItems?.map((x, i) => (
        <div className="w-[95%] lg:w-7/12" key={x.title}>
          <MenuCategory
            menu={x}
            showItems={i === showIndex ? true : false}
            setShowIndex={() => setShowIndex(i === showIndex ? null : i)}
          />
        </div>
      ))}
    </div>
  );
};

export default RestaurantMenu;
