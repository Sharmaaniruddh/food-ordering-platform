import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

function Menu() {
  const dispatch = useDispatch();

  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/menu")
      .then((res) => {
        setMenuItems(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching menu data");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-12">Loading menu...</div>;
  if (error) return <div className="text-red-600 text-center mt-12">{error}</div>;

  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed" style={{ 
      backgroundImage: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
      backgroundColor: "rgba(0,0,0,0.4)",
      backgroundBlendMode: "multiply"
    }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition flex flex-col items-center"
          >
            {/* Original Image Container - UNCHANGED */}
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
    </div>
  );
}

export default Menu;