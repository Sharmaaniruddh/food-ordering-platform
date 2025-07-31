import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./checkout.css";

function Checkout() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const cartItems = useSelector((state) => state.cart.items);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const orderPayload = {
      jsonrpc: "2.0",
      method: "placeOrder",
      params: {
        customer: {
          name: form.name,
          phone: form.phone,
          address: form.address,
        },
        items: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity || 1,
        })),
        timestamp: new Date().toISOString(),
      },
      id: Date.now(), // Unique ID for each request
    };

    try {
      const response = await axios.post("http://localhost:5000/rpc", orderPayload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.error) {
        throw new Error(response.data.error.message);
      }

      alert(`✅ Order #${response.data.result.orderId} placed successfully!`);
      // Reset form after successful submission
      setForm({ name: "", phone: "", address: "" });
    } catch (error) {
      console.error("Order failed:", error);
      alert(`❌ Failed to place order: ${error.message}`);
    }
  };


  return (
    <div className="checkout-wrapper">
      <div className="checkout-container">
        <div className="checkout-card">
          <div className="card-header">
            <h2>PLACE YOUR ORDER</h2>
            <div className="tag-container">
              <span className="tag">SECURE CHECKOUT</span>
              <span className="tag">FAST DELIVERY</span>
              <span className="tag">EASY PAYMENT</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="form-group">
              <label className="form-label">Your Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="form-input"
                required
                pattern="[0-9]{10}"
                title="10-digit number"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Full Delivery Address</label>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                className="form-textarea"
                required
                rows="4"
              ></textarea>
            </div>
            
            <button type="submit" className="submit-btn">
              CONFIRM ORDER
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Checkout;