const express = require("express");
const cors = require("cors");
require("dotenv").config();
const menuRoutes = require("./routes/menu");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("✅ Backend is running. Try /menu");
});

app.use("/menu", menuRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
