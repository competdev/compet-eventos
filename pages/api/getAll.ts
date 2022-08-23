import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();

  try {
    const users = await prisma.user.findMany();
    console.log(users);

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Erro na criação do usuário" });
  }
}
