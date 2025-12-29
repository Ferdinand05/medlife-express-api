import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "clotilde.volkman@ethereal.email",
    pass: "3PsjEx6bJdtbsKHPGC",
  },
});
