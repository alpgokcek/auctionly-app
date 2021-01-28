import * as nodemailer from 'nodemailer';


export default async function getTransporter(){
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASS,
        },
      });
      return transporter;
}