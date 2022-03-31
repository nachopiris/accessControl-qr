const { PrismaClient } = require("@prisma/client");
const getRrpps = require("./getRrpps");

const prisma = new PrismaClient();

const main = async () => {
  try {
    const rrpps = getRrpps();
    for (let i = 0; i < rrpps.length; i++) {
      const { fullName, dni, phoneNumber } = rrpps[i];
      let rrpp = await prisma.rrpp.findUnique({
        where: {
          dni
        }
      })
      const guest = await prisma.guest.findUnique({
        where: {
          dni
        }
      })
      if (!rrpp) {
        rrpp = await prisma.rrpp.create({
          data: {
            fullName,
            dni,
            phoneNumber,
          },
        });
      }
      if (!guest) {
        await prisma.guest.create({
          data: {
            rrpp_id: rrpp.id,
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
