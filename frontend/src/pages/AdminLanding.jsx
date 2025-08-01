import { Link } from "react-router-dom";

function AdminLanding() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white">
      <h1 className="text-4xl font-bold mb-6">🍽️ Admin Dashboard</h1>
      <div className="space-y-4 text-center">
        <Link to="/analytics" className="block bg-blue-600 px-6 py-3 rounded hover:bg-blue-700 transition">📊 Analytics</Link>
        <Link to="/kitchen" className="block bg-green-600 px-6 py-3 rounded hover:bg-green-700 transition">👨‍🍳 Kitchen Panel</Link>
        <Link to="/orders" className="block bg-yellow-600 px-6 py-3 rounded hover:bg-yellow-700 transition">📝 Orders</Link>
      </div>
    </div>
  );
}

export default AdminLanding;
