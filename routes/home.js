import { Router } from "express";
import { getAllCategories, getAllChefs, getAlltestimonials, getAllRestorants, getBranchDirection  } from "../controllers/home.js";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const homeRouter = Router() ;

homeRouter.get("/",async (req, res) => {
    const categories = await getAllCategories();
    const chefs = await getAllChefs();
    const testimonials = await getAlltestimonials();
    const restorants = await getAllRestorants()
    res.render("index", {categories, chefs, testimonials, restorants });
})

homeRouter.get("/:branch", getBranchDirection);

homeRouter.post("/", async (req, res) => {
    const {name, email, dateReservation, numberOfPoeple, specialRequest, restorantId } = req.body
    try {
        const reservations = await prisma.reservations.create({
            data:{
                name,
                email,
                date_reservation: dateReservation,
                number_of_poeple: +numberOfPoeple,
                special_request: specialRequest,
                id_restorant_fk: +restorantId
            }
        })
        console.log(contacts);
        res.redirect("/");
    } catch (error) {
        console.log(error);
    }
})



export default homeRouter ;