import nodemailer from "nodemailer";
import { env } from "../config/env.js";

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS
    }
});

export const sendEmail = async (
    to: string,
    subject: string,
    html: string
): Promise<void> => {

    await transporter.sendMail({
        from: `"Realtime Chat App" <${process.env.SMTP_USER}>`,
        to,
        subject,
        html
    });
};