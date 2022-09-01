import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();
  const { userId } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
    }

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        presence: true,
      },
    });

    res.status(200).json({
      message: "User is now present in the event",
    });

    // const user = await res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro na criação do usuário" });
  }
}
