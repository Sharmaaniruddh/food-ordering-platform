import { useState } from "react";

function Checkout() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    alert("Order placed successfully!");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center px-4"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80')",
      }}
    >
      {/* Overlay for dark blur effect */}
      <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-0"></div>

      {/* Floating Checkout Form */}
      <div className="relative z-10 w-full max-w-md bg-gray-900 bg-opacity-90 p-6 sm:p-8 rounded-xl shadow-2xl text-white border border-gray-700 mt-12">
        <h2 className="text-2xl font-bold mb-6 text-center">💳 Checkout</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full bg-gray-800 text-white border border-gray-600 p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full bg-gray-800 text-white border border-gray-600 p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
            pattern="[0-9]{10}"
            title="10-digit number"
          />
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Delivery Address"
            className="w-full bg-gray-800 text-white border border-gray-600 p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
            rows="4"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-yellow-400 text-black font-bold px-4 py-3 rounded hover:bg-yellow-500 transition"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
