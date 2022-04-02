import prisma from "../prisma/client";
import QRCode from "qrcode";
import axios from "axios";

const { WHATSAPP_API_BASE_URI } = process.env;

const message =
  "Hola! Listo para pasarla de lujo este sábado en Alta Vista? 🤪 de la mano de la #SiATodo ( no podes decir que no, ya tenes tu pase free 🥳)";

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const getQr = async (dni) => {
  try {
    return QRCode.toDataURL(String(dni));
  } catch (error) {
    console.error(error);
  }
};

const sendMessage = async (guest) => {
  const qr = await getQr(guest.dni);
  const base64 = qr.slice(22);
  try {
    return axios.post(
      `${WHATSAPP_API_BASE_URI}/chat/sendimage/${guest.phoneNumber}`,
      {
        image: base64,
        caption: message,
      }
    );
  } catch (error) {
    console.error(error);
  }
};

const main = async () => {
  const guests = await prisma.guest.findMany();
  for (let i = 0; i < guests.length; i++) {
    if (guests[i].id >= 323) {
      console.log(`sending msg to ${guests[i].phoneNumber}`);
      const res = await sendMessage(guests[i]);
      console.log(res.data);
      if (i !== guests.length - 1) {
        await sleep(5000);
      }
    }
  }
};

main();
