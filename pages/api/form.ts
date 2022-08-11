import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { FormInput } from "../../types";
import nodemailer from "nodemailer";
import QRcode from "qrcode";

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

    let mailOptions = {
      from: "compet.eventos@gmail.com",
      to: user.email,
      attachDataUrls: true,
      subject: `Confirmaçao Evento COMPET`,
      html: '</br><img src="' + image + '">' // html body
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