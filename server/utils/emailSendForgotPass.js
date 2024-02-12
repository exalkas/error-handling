import nodemailer from "nodemailer";

export default async function main(token, email) {
  console.log("🚀 ~ token:", token);
  console.log("🚀 ~ process.env.SMTP_SERVER:", process.env.SMTP_SERVER);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_SERVER,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <developer@alkas.gr>', // sender address
    to: email, // list of receivers
    subject: "Instructions to change your password in social app ✔", // Subject line
    text: "Instructions to change your password in social app", // plain text body
    html: `
        <h3>Forgot your pass?</h3>
        <p>To change your password please click on the following link:</p>
        <a href="http://localhost:5173/changePass/${token}">Change password</a>`,
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}
