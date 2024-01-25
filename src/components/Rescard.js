import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { resData } = props;

  // Ensure that resData and resData.info are defined before destructuring
  const { cloudinaryImageId, cuisines, name, costForTwo, avgRating, sla } = resData?.info || {};

  return (
    <div className="res-card flex-grow ml-4 w-64 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
      {/* Use CDN_URL + cloudinaryImageId for the image source */}
      <img className="res-logo object-cover w-full h-40 mb-4 rounded-lg" src={CDN_URL + cloudinaryImageId} alt={name} />
      <h3 className="text-xl font-semibold mb-2 overflow-hidden whitespace-nowrap overflow-ellipsis">{name}</h3>
      <h4 className="text-sm mb-2 overflow-hidden whitespace-nowrap overflow-ellipsis">{cuisines && cuisines.join(",")}</h4>
      <h4 className="text-sm mb-2 overflow-hidden whitespace-nowrap overflow-ellipsis">Cost for Two: {costForTwo}</h4>
      <h4 className="text-sm mb-2 overflow-hidden whitespace-nowrap overflow-ellipsis">{avgRating} Stars</h4>
      <h4 className="text-sm overflow-hidden whitespace-nowrap overflow-ellipsis">{sla && sla.deliveryTime} minutes</h4>
    </div>
  );
};

export const withPromoted = (WrappedComponent) => {
  return (props) => {
    return (
      <div className="relative">
        <WrappedComponent {...props} />
        <label className="absolute bottom-0 right-0 bg-black text-white p-2 rounded-bl-lg">Promoted</label>
      </div>
    );
  };
};



export default RestaurantCard;
