import React, { useContext } from "react";
import { CDN_URL } from "../utils/constants";
import UserContext from "../utils/UserContext";

const RestaurentData = ({ swiggyData }) => {
  const {
    name,
    cloudinaryImageId,
    costForTwo,
    cuisines,
    deliveryTime,
    avgRating,
  } = swiggyData?.info;
  const { loggedInUser } = useContext(UserContext);
  return (
    <div className="bg-gray-100 w-80 p-2" data-testid="resCard">
      <img
        src={CDN_URL + cloudinaryImageId}
        alt={name}
        className="h-48 w-[100%]"
      />

      <h3 className="text-lg font-bold my-2">{name}</h3>
      <div className="text-sm leading-7">
        <p>{cuisines.join(", ")}</p>
        {deliveryTime && <p>DeliveryTime: {deliveryTime}</p>}
        <p>{costForTwo}</p>
        <p>⭐ {avgRating}</p>
        <p>user: {loggedInUser}</p>
      </div>
    </div>
  );
};

export const withPromotedLabel = (RestaurentData) => {
  return (props) => {
    return (
      <div>
        <label className="absolute bg-black text-white p-2 rounded-md text-sm font-bold">
          Opened
        </label>
        <RestaurentData {...props} />
      </div>
    );
  };
};

export default RestaurentData;
