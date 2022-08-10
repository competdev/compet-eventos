import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { FormInput } from "../../types";
import nodemailer from "nodemailer";

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
    
    let mailOptions = {
      from: "compet.eventos@gmail.com",
      to: formInput.email,
      subject: `Confirmaçao Evento COMPET`,
      html: `QRCode de confirmação com id do user`, //aqui vcs enviam o login do usuário.
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

