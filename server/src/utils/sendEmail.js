import nodemailer from "nodemailer";

const sendEmail = async (to, subject, mailbody) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSCODE,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to,
      subject,
      html: mailbody,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("Email Sent Successfully", result.messageId);
    return true;
  } catch (error) {
    console.error("Error sending Email", error);
    return false;
  }
};
