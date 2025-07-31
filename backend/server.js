const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const menuRoute = require("./routes/menu");
app.use("/menu", menuRoute);

// JSON-RPC: /rpc
app.post("/rpc", (req, res) => {
  const { method, params, id } = req.body;

  if (method === "placeOrder") {
    console.log("✅ New Order:", params);

    // Later insert into DB
    return res.json({
      jsonrpc: "2.0",
      result: "Order received",
      id
    });
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

app.listen(5000, () => {
  console.log("✅ Backend running on http://localhost:5000");
});
