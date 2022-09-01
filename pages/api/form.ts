import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { FormInput } from "../../types";
import nodemailer from "nodemailer";
import QRcode from "qrcode";
import fs from "fs";
import path from "path";
import handlebars from "handlebars";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();
  const formInput: FormInput = req.body;

  try {
    const { cellphone, course, email, name, pet, unity } = formInput;

    const user = await prisma.user.create({
      data: {
        cellphone: cellphone,
        name: name,
        email: email,
        course: course,
        pet: pet,
        unity: unity,
        presence: false,
      },
    });

    if (!user) {
      return res.status(400).json({ message: "Erro ao criar usuário" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "compet.eventos@gmail.com",
        pass: "fgnhatcvvrdkvelq",
      },
    });

    // Converting the data into base64
    const image = await QRcode.toDataURL(user.id);

    const filePath = path.resolve('./public', 'template.html');
    const source = fs.readFileSync(filePath, "utf-8").toString();
    const template = handlebars.compile(source);
    const replacements = {
      name: user.name,
      image: image,
    };
    const htmlToSend = template(replacements);

    const mailOptions = {
      from: "Compet Eventos <compet.eventos@gmail.com>",
      to: email,
      attachDataUrls: true,
      subject: `Confirmaçao Evento COMPET`,
      html: htmlToSend,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro na criação do usuário" });
  }
}
