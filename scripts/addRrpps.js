const { PrismaClient } = require("@prisma/client");
const getRrpps = require("./getRrpps");

const prisma = new PrismaClient();

const main = async () => {
  try {
    const rrpps = getRrpps();
    await prisma.rrpp.createMany({
      data: rrpps,
      skipDuplicates: true,
    });
    await prisma.$disconnect();
    console.log("Success!");
  } catch (error) {
    console.log(error.message);
  }
};

main();
