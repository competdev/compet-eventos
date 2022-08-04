import { PrismaClient } from "@prisma/client";
import type {NextApiRequest, NextApiResponse } from "next";

type Data = {
    name: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
){
    const prisma = new PrismaClient();
    const formInput = req.body;

    await prisma.user.create({
        data:{
            name: formInput.name, 
            data_nascimento: formInput.data_nascimento,
            email: formInput.email, 
            telefone: formInput.telelfone, 
            matricula: formInput.matricula,
            presenca: formInput.presenca,
        },
    });
}

