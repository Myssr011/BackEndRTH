// login.js
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function register(req, res) {
  try {
    const { username, email, password, confirmcode } = req.body;

    if (password !== confirmcode) {
      return res
        .status(400)
        .json({ error: "Password and confirmcode tidak sama " });
    }

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password,
        confirmcode,
      },
    });

    if (password !== confirmcode) {
      return res
        .status(400)
        .json({ error: "Password and confirm code do not match " });
    }
    // Send success response or JWT token, etc.
    return res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Cari pengguna berdasarkan email
    const userData = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!userData) {
      return res.status(404).json({ error: "User not found" });
    }

    // Periksa kecocokan password
    const passwordMatch = password === userData.password;

    if (passwordMatch) {
      // Password cocok, kirim data pengguna yang berhasil diotentikasi
      return res
        .status(200)
        .json({ message: "Login successful", user: userData });
    } else {
      return res.status(401).json({ error: "Invalid password" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { register, login };
