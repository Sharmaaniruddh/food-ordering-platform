import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

function Menu() {
  const dispatch = useDispatch();

  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [menuRes, categoryRes] = await Promise.all([
          // axios.get("http://localhost:5000/menu"),
          // axios.get("http://localhost:5000/categories"),
          axios.get(${`process.env.REACT_APP_API_BASE}/menu`)
          axios.get(${`process.env.REACT_APP_API_BASE}/categories`)
        ]);
        setMenuItems(menuRes.data);
        setCategories(categoryRes.data);
      } catch (err) {
        setError("❌ Error loading menu or categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredItems = selectedCategory
    ? menuItems.filter((item) => item.category_id === selectedCategory)
    : menuItems;

  if (loading) return <div className="text-center mt-12 text-white text-lg">Loading menu...</div>;
  if (error) return <div className="text-red-600 text-center mt-12">{error}</div>;

  return (
    <section
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2070&q=80')",
        backgroundColor: "rgba(0,0,0,0.4)",
        backgroundBlendMode: "multiply",
      }}
    >
      <div className="flex max-w-7xl mx-auto mt-20 px-4 gap-8">
        {/* Left Sidebar - Categories (Now with transparent background) */}
        <aside className="w-40 p-4 sticky top-20 self-start h-fit bg-transparent">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`w-full mb-3 px-4 py-2 text-left font-semibold transition-colors duration-200 bg-transparent
              ${
                selectedCategory === null
                  ? "text-yellow-400 underline"
                  : "text-white hover:text-yellow-300"
              }
            `}
          >
            All
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`w-full mb-3 px-4 py-2 text-left font-semibold transition-colors duration-200 bg-transparent
                ${
                  selectedCategory === cat.id
                    ? "text-yellow-400 underline"
                    : "text-white hover:text-yellow-300"
                }
              `}
            >
              {cat.name}
            </button>
          ))}
        </aside>

        {/* Main Content - Menu Items (UNCHANGED) */}
        <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredItems.length === 0 ? (
            <div className="text-white col-span-full text-center text-lg">
              No menu items found.
            </div>
          ) : (
            filteredItems.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition-all duration-300 flex flex-col items-center"
              >
                <div className="relative h-36 w-44 overflow-hidden bg-gray-100 rounded-md mb-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/150?text=No+Image";
                      e.target.className = "w-full h-full object-contain p-2";
                    }}
                  />
                </div>

                <h3 className="text-md font-semibold text-center text-gray-900">{item.name}</h3>
                <p className="text-gray-600 mb-2">₹{item.price}</p>

                {/* Add to Cart button (COMPLETELY UNCHANGED from original) */}
                <button
                  onClick={() => dispatch(addToCart(item))}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors"
                >
                  Add to Cart
                </button>
              </article>
            ))
          )}
        </main>
      </div>
    </section>
  );
}

export default Menu;
