import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('aqui');
  // // Run the cors middleware
  // // nextjs-cors uses the cors package, so we invite you to check the documentation https://github.com/expressjs/cors
  // await NextCors(req, res, {
  //   // Options
  //   methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  //   origin: "*",
  //   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  // });

  const prisma = new PrismaClient();
  const { userId } = req.body;
  console.log("userId", userId);

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
