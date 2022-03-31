const { PrismaClient } = require("@prisma/client");
const getRrpps = require("./getRrpps");

const prisma = new PrismaClient();

const main = async () => {
  try {
    const rrpps = getRrpps();
    for (let i = 0; i < rrpps.length; i++) {
      const { fullName, dni, phoneNumber } = rrpps[i];
      const guest = await prisma.guest.findUnique({
        where: {
          dni
        }
      })
      if (!guest) {
        await prisma.guest.create({
          data: {
            fullName,
            dni,
            phoneNumber,
          },
        });
      }
    }
    await prisma.$disconnect();
    console.log("Success!");
  } catch (error) {
    console.log(error.message);
  }
};

main();
