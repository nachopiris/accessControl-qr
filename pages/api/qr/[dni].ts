import { NextApiRequest, NextApiResponse } from "next";
import * as qr from "qr-image";

export default function index(req: NextApiRequest, res: NextApiResponse) {
  const {
    method,
    query: { dni },
  } = req;

  try {
    if (method !== "GET") {
      throw new Error("Method not allowed");
    }

    if (dni?.length !== 8 || isNaN(Number(dni))) {
      throw new Error("DNI invalido");
    }

    res.setHeader("Content-Type", "image/svg+xml");
    qr.image(dni, {
      type: "svg",
    }).pipe(res);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
