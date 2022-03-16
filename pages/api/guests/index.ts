import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";
import capitalize from "lib/capitalize";
import formatPhoneNumber from "lib/formatPhoneNumber";

const prisma = new PrismaClient();

interface Body {
  firstName: string;
  lastName: string;
  dni: string;
  phoneNumber: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    query: { name },
    body,
  } = req;

  try {
    if (method === "GET") {
      const session = await getSession({ req });

      if (!session) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const guests = await prisma.guest.findMany({
        where: {
          fullName: {
            contains: name,
          },
        },
        select: {
          fullName: true,
          gotIn: true,
          dni: true,
        },
      });
      await prisma.$disconnect();

      return res.json(guests);
    }

    if (method === "POST") {
      const { guests, rrppDni } = JSON.parse(body);
      const rrpp = await prisma.rrpp.findUnique({
        where: {
          dni: Number(rrppDni),
        },
        include: {
          guest: true,
        },
      });
      if (!rrpp) {
        throw new Error("RRPP no registrado");
      }
      if (rrpp.guest.length + guests.length > rrpp.spots) {
        throw new Error("No tiene lugares disponibles");
      }
      const finalGuests = guests.map((guest: Body) => {
        return {
          fullName: `${capitalize(guest.firstName)} ${capitalize(
            guest.lastName
          )}`,
          dni: Number(guest.dni),
          phoneNumber: Number(formatPhoneNumber(guest.phoneNumber)),
          rrpp_id: rrpp.id,
        };
      });
      await prisma.guest.createMany({
        data: finalGuests,
        skipDuplicates: true,
      });
      await prisma.$disconnect();
      return res.json({
        message: `Invitados agregados con éxito, te quedan ${
          rrpp.spots - (rrpp.guest.length + guests.length)
        } lugares`,
      });
    }

    throw new Error("Method not allowed");
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
