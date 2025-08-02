import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
} from "recharts";

function Analytics() {
  const [stats, setStats] = useState({ total_orders: 0, total_revenue: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/admin/stats")
      .then((res) => {
        setStats({
          total_orders: Number(res.data.total_orders),
          total_revenue: Number(res.data.total_revenue),
        });
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load analytics.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="p-6 min-h-screen bg-gray-100 flex flex-col items-start">
        <h2 className="text-2xl font-bold mb-4">📊 Analytics</h2>
        <p>Loading analytics data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 min-h-screen bg-gray-100 flex flex-col items-start">
        <h2 className="text-2xl font-bold mb-4">📊 Analytics</h2>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  // Prepare data for the bar chart
  const data = [
    { name: "Total Orders", value: stats.total_orders },
    { name: "Total Revenue", value: stats.total_revenue },
  ];

  return (
    <div className="p-6 min-h-screen bg-gray-100 flex flex-col items-start">
      <h2 className="text-2xl font-bold mb-6">📊 Analytics</h2>

      <div style={{ width: "100%", maxWidth: 600, height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#3182ce" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Analytics;
