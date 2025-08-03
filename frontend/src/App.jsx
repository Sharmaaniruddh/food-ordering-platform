import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Kitchen from "./pages/Kitchen";
import Analytics from "./pages/Analytics";
import OrderTracker from "./pages/OrderTracker";
import LandingPage from "./pages/LandingPage";
import AdminLanding from "./pages/AdminLanding";

export default function App() {
  return (
    <BrowserRouter>
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md w-full fixed top-0 left-0 right-0 z-50">
        <div className="flex justify-center gap-8 py-4">
          <NavLink
            to="/menu"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg transition-all font-medium text-sm
              ${
                isActive
                  ? "bg-blue-100 text-blue-700 border-b-2 border-blue-500"
                  : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
              }`
            }
          >
            🍔 Menu
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg transition-all font-medium text-sm
              ${
                isActive
                  ? "bg-green-100 text-green-700 border-b-2 border-green-500"
                  : "text-gray-600 hover:bg-gray-100 hover:text-green-600"
              }`
            }
          >
            🛒 Cart
          </NavLink>

            <NavLink
            to="/order-tracker"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg transition-all font-medium text-sm
              ${
                isActive
                  ? "bg-indigo-100 text-indigo-700 border-b-2 border-indigo-500"
                  : "text-gray-600 hover:bg-gray-100 hover:text-indigo-600"
              }`
            }
          >
            🚚 Tracker
          </NavLink>

          <NavLink
            to="/checkout"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg transition-all font-medium text-sm
              ${
                isActive
                  ? "bg-green-100 text-green-700 border-b-2 border-green-500"
                  : "text-gray-600 hover:bg-gray-100 hover:text-green-600"
              }`
            }
          >
            💳 Checkout
          </NavLink>

          <NavLink
            to="/kitchen"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg transition-all font-medium text-sm
              ${
                isActive
                  ? "bg-green-100 text-green-700 border-b-2 border-green-500"
                  : "text-gray-600 hover:bg-gray-100 hover:text-green-600"
              }`
            }
          >
            👨‍🍳 Kitchen
          </NavLink>

          <NavLink
            to="/analytics"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg transition-all font-medium text-sm
              ${
                isActive
                  ? "bg-green-100 text-green-700 border-b-2 border-green-500"
                  : "text-gray-600 hover:bg-gray-100 hover:text-green-600"
              }`
            }
          >
            📊 Analytics
          </NavLink>
          
        </div>
      </nav>
              
      {/* Page Content */}
      <main className="max-w-6xl mx-auto p-6 pt-24">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin" element={<AdminLanding />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order-tracker" element={<OrderTracker />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/kitchen" element={<Kitchen />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </main>
    </BrowserRouter>
    
  );
}
