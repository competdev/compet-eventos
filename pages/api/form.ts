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
let code = 0
    
    // Require the package 
const QRCode = require('qrcode') 
  
// Creating the data 
let data = { 
    email: "formInput.email" 
} 
  
// Converting the data into String format 
let stringdata = JSON.stringify(data) 
  
// Print the QR code to terminal 
QRCode.toString(stringdata,{type:'terminal'}, 
                    function (err, QRcode) { 
  
    if(err) return console.log("error occurred") 
  
    // Printing the generated code 
    console.log(QRcode) 
}) 
    
// Converting the data into base64 
QRCode.toDataURL(stringdata, function (err, code) { 
    if(err) return console.log("error occurred") 
  
    // Printing the code 
    console.log(code) 
})

    let mailOptions = {
      from: "compet.eventos@gmail.com",
      to: formInput.email,
      subject: `Confirmaçao Evento COMPET`,
      html: code, //aqui vcs enviam o login do usuário.
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

