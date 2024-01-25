import React, { useEffect, useState } from 'react';
import Shimmer from './Shimmer';
import { useParams } from 'react-router-dom';
import { MENU_API } from '../utils/constants';
import useRestaurantMenu from '../utils/useRestaurantMenu';
import RestaurantCategory from './ResCategory';

const ResMenu = () => {
  const { resId } = useParams();

  const resInfo = useRestaurantMenu(resId);
  const [showIndex, setShowIndex] = useState(null);

  if (resInfo === null) {
    return <Shimmer />;
  }

  const { name, cuisines, costForTwoMessage } = resInfo?.cards[0]?.card?.card?.info || {};
  const Categories = resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
    (c) => c.card?.card?.["@type"] === 'type.googleapis.com/swiggy.presentation.food.v2.ItemCategory'
  );

  return (
    <div className='menu p-4 text-center'>
      <h1 className='text-2xl font-bold mb-2'>{name}</h1>
      <p className='text-sm mb-4 font-bold'>{cuisines.join(",")} - {costForTwoMessage}</p>
      {/* categories accordions */}
      {Categories.map((category, index) => (
        <RestaurantCategory
          key={category?.card?.card.title}
          data={category?.card?.card}
          showItems={index === showIndex}
          onClick={() => setShowIndex(index)}
        />
      ))}
    </div>
  );
};

export default ResMenu;
