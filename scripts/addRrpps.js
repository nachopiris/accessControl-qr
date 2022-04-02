import getRrpps from "./getRrpps"
import prisma from "../prisma/client"

const main = async () => {
  try {
    const rrpps = getRrpps();
    for (let i = 0; i < rrpps.length; i++) {
      const { fullName, dni, phoneNumber, spots } = rrpps[i];
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
            spots
          },
        });
      } else {
        await prisma.rrpp.update({
          where: {
            dni
          },
          data: {
            spots
          }
        })
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
    console.log("Success!");
  } catch (error) {
    console.log(error.message);
  }
};

main();
