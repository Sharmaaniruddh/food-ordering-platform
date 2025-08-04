import { useEffect, useState } from "react";
import axios from "axios";

function AdminLanding() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE}/admin/stats`)
      .then((res) => setStats(res.data))
      .catch((err) => {
        console.error("❌ Failed to fetch stats:", err);
        setError("Error loading admin stats");
      });
  }, []);

  if (error) return <div className="text-red-500 p-6">{error}</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">👑 Admin Dashboard</h2>
      {stats ? (
        <div>
          <p>Total Orders: {stats.total_orders}</p>
          <p>Total Revenue: ₹{stats.total_revenue}</p>
        </div>
      ) : (
        <p>Loading stats...</p>
      )}
    </div>
  );
}

export default AdminLanding;
