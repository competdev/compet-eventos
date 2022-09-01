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

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "compet.eventos@gmail.com",
        pass: "fgnhatcvvrdkvelq",
      },
    });

    // Converting the data into base64
    const image = await QRcode.toDataURL(user.id);

    const source = fs.readFileSync("utils/template.html", "utf-8").toString();
    const template = handlebars.compile(source);
    const replacements = {
      image: image,
    };
    const htmlToSend = template(replacements);

    let mailOptions = {
      from: "Compet Eventos <compet.eventos@gmail.com>",
      to: email,
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
    console.error(error);
    res.status(500).json({ error: "Erro na criação do usuário" });
  }
}
