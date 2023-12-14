// tanamanController.js
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getTanamanData() {
  try {
    const tanamanData = await prisma.jenis_tanaman.findMany();
    return tanamanData;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching tanaman data");
  }
}

module.exports = { getTanamanData };
