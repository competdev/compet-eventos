import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const prisma = new PrismaClient();
  const formInput = req.body;

  await prisma.user.create({
    data: {
      cellphone: formInput.cellphone,
      name: formInput.name,
      email: formInput.email,
      presence: false,
      registration: formInput.registration,
      role: formInput.role,
    },
  });
}
