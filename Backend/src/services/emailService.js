const nodemailer = require("nodemailer");

const emailGym = "resolve.gym10@gmail.com"

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: emailGym,
    pass: "vgqs qvyz pxwk uuck",
  },
});

async function sendEmail(receivers, subject, contentHtml) {
    try {
        const info = await transporter.sendMail({
            from: `"Resolve Gym 💪" <${emailGym}>`,
            to: receivers,          
            subject: subject,            // Asunto
            html: contentHtml             // Contenido del correo (texto plano)
        });
        console.log('Emails send:', info.messageId);
    } catch (error) {
        console.error('Error sending emails:', error);
        throw new Error('Emails could not be sent');
    }
}

module.exports = sendEmail;