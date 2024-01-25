import React, { useState, useEffect } from "react";
import RestaurantCard, { withPromoted } from "./Rescard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  const [listOfRes, setListOfRes] = useState([]);
  const [filteredRes, setFilteredRes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const RestaurantCardPromoted = withPromoted(RestaurantCard);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.757467442268776&lng=80.94044242054224&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      

      const restaurants =
        data?.data?.cards?.[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

      setListOfRes(restaurants);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false); // Set loading to false on error as well
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredRes(listOfRes);
  }, [listOfRes]);

  const onlineStatus = useOnlineStatus();

  if (!onlineStatus) {
    return <h1>Looks like you are offline. Check your internet connection</h1>;
  }

  const handleSearch = () => {
    const filteredRes = listOfRes.filter((res) =>
      res.info.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredRes(filteredRes);
  };

  const handleFilter = () => {
    try {
      const filteredRes = listOfRes.filter((res) => res.info.avgRating > 4.3);
      setListOfRes(filteredRes);
    } catch (error) {
      console.error("Error filtering restaurants:", error);
    }
  };

  return (
    <div className="body">
      <div className="filter flex items-center">
        <div className="search">
          <div className="search-box-container">
            <input
              type="text"
              className="search-box border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button
              className="search-btn bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-all ml-2"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>

        <button
          className="filter-btn bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 transition-all ml-2"
          onClick={handleFilter}
        >
          Top Rated Restaurant
        </button>
      </div>

      {loading ? (
        <Shimmer />
      ) : (
        <div className="res-container flex flex-wrap gap-8 mr-2 ml-2">
          {filteredRes.map((resData) => (
            <Link
              key={resData.info.id}
              className="link-style"
              to={`/restaurants/${resData.info.id}`}
            >
              <div className="card hover:shadow-lg transition-transform transform hover:scale-105">
                {resData.info.avgRating > 4.3 ? (
                  <RestaurantCardPromoted resData={resData} />
                ) : (
                  <RestaurantCard resData={resData} />
                )}

                <button
                  className="card-btn hover:bg-blue-500 text-white py-2 px-4 rounded transition-all transform hover:scale-105"
                >
                  View Details
                </button>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Body;
