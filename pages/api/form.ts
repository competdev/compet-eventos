import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { FormInput } from "../../types";

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

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Erro na criação do usuário" });
  }
}
