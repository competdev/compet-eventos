import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { FormInput } from "../../types";
import nodemailer from "nodemailer";
import QRcode from "qrcode";
import fs from "fs";
import handlebars from "handlebars";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();
  const formInput: FormInput = req.body;

  try {
    const user = await prisma.user.create({
      data: {
        cellphone: formInput.cellphone,
        name: formInput.name,
        email: formInput.email,
        presence: false,
        registration: formInput.registration,
        role: formInput.role,
      },
    });

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "compet.eventos@gmail.com",
        pass: "fgnhatcvvrdkvelq",
      },
    });

    // Converting the data into base64
    const image = await QRcode.toDataURL(user.id);

    const source = fs.readFileSync('utils/template.html', 'utf-8').toString();
    const template = handlebars.compile(source);
    const replacements = {
      image: image,
    };
    const htmlToSend = template(replacements);

    let mailOptions = {
      from: "compet.eventos@gmail.com",
      to: 'guilhermeaugustodeoliveira66@gmail.com',
      attachDataUrls: true,
      subject: `Confirmaçao Evento COMPET`,
      html: htmlToSend, 
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        res.json(err);
      } else {
        res.json(info);
      }
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Erro na criação do usuário" });
  }
}
