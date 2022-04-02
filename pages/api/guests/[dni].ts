import { getSession } from "next-auth/react";
import prisma from "../../../prisma/client";

export default async function handler(req: any, res: any) {
  const {
    method,
    query: { dni },
  } = req;

  try {
    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (dni?.length !== 8 || isNaN(Number(dni))) {
      throw new Error("DNI inválido");
    }

    if (method === "GET" || method === "PUT") {
      const guest = await prisma.guest.findUnique({
        where: {
          dni: Number(dni),
        },
        select: {
          fullName: true,
          dni: true,
          gotIn: true,
          rrpp: {
            select: {
              fullName: true,
              sector: true,
            },
          },
        },
      });
      if (!guest) {
        throw new Error("No está en lista");
      }

      if (method === "PUT") {
        if (guest.gotIn) {
          throw new Error("El invitado ya ingresó");
        }
        await prisma.guest.update({
          where: {
            dni: Number(dni),
          },
          data: {
            gotIn: true,
          },
        });
        return res.status(201).json({ message: "Ingreso marcado con éxito" });
      }
      return res.status(200).json(guest);
    }

    throw new Error("Method not allowed");
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
