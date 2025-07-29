import menuItems from "../menuData";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

function Menu() {
  const dispatch = useDispatch();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {menuItems.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition flex flex-col items-center"
        >
          {/* Image container with smaller height and containment */}
          <div className="relative h-36 w-44 overflow-hidden bg-gray-100 rounded-md mb-3">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/150?text=Image+Not+Found';
                e.target.className = 'w-full h-full object-contain p-2';
              }}
            />
          </div>

          <h3 className="text-md font-semibold text-center">{item.name}</h3>
          <p className="text-gray-600">₹{item.price}</p>

          <button
            onClick={() => dispatch(addToCart(item))}
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-sm transition-colors"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

export default Menu;
