// server.js
const express = require("express");
const { register, login } = require("./login");
const cors = require("cors");
const { getTanamanData } = require("./tanamanController");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", register);
app.post("/login", login);git

// Rute untuk mendapatkan data tanaman
app.get("/api/tanaman", async (req, res) => {
  try {
    const tanamanData = await getTanamanData();
    res.json(tanamanData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
