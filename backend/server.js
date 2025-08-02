const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db"); // your PostgreSQL connection pool
const { broadcastOrder } = require("./wsServer");
app.use(cors());
app.use(express.json());




const categoryRoute = require("./routes/categories");
app.use("/categories", categoryRoute);


const menuRoute = require("./routes/menu");
app.use("/menu", menuRoute);

// JSON-RPC: /rpc
app.post("/rpc", async (req, res) => {
  const { method, params, id } = req.body;

  if (method === "placeOrder") {
    const { customer, items } = params;
    const { name, phone, address } = customer;

    try {
      // Step 1: Insert into orders table
      const orderResult = await pool.query(
        `INSERT INTO orders (customer_name, customer_phone, customer_address)
         VALUES ($1, $2, $3) RETURNING id`,
        [name, phone, address]
      );

      const orderId = orderResult.rows[0].id;

      // Step 2: Insert each item into order_items
      for (const item of items) {
        await pool.query(
          `INSERT INTO order_items (order_id, menu_id, qty)
           VALUES ($1, $2, $3)`,
          [orderId, item.id, item.quantity]
        );
      }

      console.log("📦 Order saved in orders and order_items tables ✅");

      // Send WebSocket event to Kitchen
      broadcastOrder("order_created", {
        name,
        phone,
        address,
        cart: items.map(item => ({
          name: item.name,
          qty: item.quantity,
        }))
      });

      return res.json({
        jsonrpc: "2.0",
        result: "Order received",
        id
      });

    } catch (err) {
      console.error("❌ Error saving order:", err);
      return res.status(500).json({
        jsonrpc: "2.0",
        error: {
          code: -32000,
          message: "Internal Server Error"
        },
        id
      });
    }

  } else {
    return res.status(400).json({
      jsonrpc: "2.0",
      error: {
        code: -32601,
        message: "Method not found"
      },
      id
    });
  }
});

app.get("/admin/stats", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        COUNT(DISTINCT o.id) AS total_orders,
        COALESCE(SUM(oi.qty * m.price), 0) AS total_revenue
      FROM orders o
      JOIN order_items oi ON o.id = oi.order_id
      JOIN menu m ON oi.menu_id = m.id
    `);

    res.json(result.rows[0]);
  } catch (err) {
    console.error("❌ /admin/stats error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});



app.listen(5000, () => {
  console.log("✅ Backend running on http://localhost:5000");
});
