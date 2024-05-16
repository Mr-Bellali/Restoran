import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


export const createContact = async (req, res) => {
    const {name, subject, message, email, restorantId} = req.body
    try {
        const contacts = await prisma.contacts.create({
            data:{
                name,
                subject,
                message,
                email,
                id_restorant_fk: +restorantId
            }
        });
        console.log(contacts);
        res.redirect("/contact");
    } catch (error) {
     console.log(error);   
    }
}