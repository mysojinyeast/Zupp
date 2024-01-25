import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";
import { CDN_URL } from "../utils/constants";

const ItemList = ({ items }) => {

    const dispatch = useDispatch();

    const handleAddItem = (item) =>{
        // Dispatch an action
        dispatch(addItem(item));
        
    }
    
    

    return (
        <div>
            {items.map(item => (
                <div key={item.card.info.id} className="p-2 m-2 border-gray-200 border-b-2 text-left flex relative">
                    <div className="w-9/12">
                        <div className="py-2">
                            <span className="text-lg font-semibold">{item.card.info.name}</span>
                            <span className="text-gray-600"> - ₹{item.card.info.price ? item.card.info.price / 100 : item.card.info.defaultPrice / 100}</span>
                        </div>
                        <p className="text-gray-700">{item.card.info.description}</p>
                    </div>
                    <div className="w-3/12 p-4 relative">
                        <div className="absolute top-0 right-0 p-2">
                            <button className="p-2 rounded-lg bg-white shadow-lg"
                            onClick={() =>handleAddItem(item)}>Add+</button>
                        </div>
                        <img
                            src={CDN_URL + item.card.info.imageId}
                            alt={item.card.info.name}
                            className="w-full h-32 object-cover rounded-lg shadow-md"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ItemList;
