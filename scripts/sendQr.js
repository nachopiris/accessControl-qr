const { PrismaClient } = require("@prisma/client");
const QRCode = require("qrcode");
const axios = require("axios");

const prisma = new PrismaClient();

const { WHATSAPP_API_BASE_URI } = process.env;

const message =
  "Ready para el vip??🤘🤘\n\nLos esperamos esta noche, recuerden que el horario de ingreso por lista es hasta las 2:30 AM.";

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
  await prisma.$disconnect();
  for (let i = 0; i < guests.length; i++) {
    console.log(`sending msg to ${guests[i].phoneNumber}`);
    const res = await sendMessage(guests[i]);
    console.log(res.data);
    if (i !== guests.length - 1) {
      await sleep(3000);
    }
  }
};

main();
