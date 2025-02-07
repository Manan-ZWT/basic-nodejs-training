import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: "manan@zealousweb.com",
    pass: "xwditwvanmayejmf",
  },
});

export const sendMail = (to, sub, msg) => {
  transporter.sendMail({
    to: to,
    sub: sub,
    html: msg,
  });
};
