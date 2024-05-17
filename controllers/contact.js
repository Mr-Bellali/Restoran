import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

export const createContact = async (req, res) => {
    const { name, subject, message, email } = req.body;
    const branch = req.params.branch;

    try {
        const restorant = await prisma.restorant.findUnique({
            where: { branch },
        });

        if (!restorant) {
            return res.status(404).json({ error: 'Branch not found' });
        }

        const contact = await prisma.contacts.create({
            data: {
                name,
                subject,
                message,
                email,
                id_restorant_fk: restorant.id_restorant,
            },
        });

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const mailOptions = {
            from: process.env.SMTP_USER,
            to: process.env.MAIL_TO,
            subject: `Contact Form Submission: ${subject}`,
            text: `Name: ${name}\nEmail: ${email}\nBranch: ${branch}\nMessage: ${message}`,
        };

        await transporter.sendMail(mailOptions);

        res.redirect(`/${branch}/contact`);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create contact' });
    }
};
