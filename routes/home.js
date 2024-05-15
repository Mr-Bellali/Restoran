import { Router } from "express";
import { getAllCategories, getAllChefs, getAlltestimonials, getAllRestorants } from "../controllers/home.js";

const homeRouter = Router() ;

homeRouter.get("/",async (req, res) => {
    const categories = await getAllCategories();
    const chefs = await getAllChefs();
    const testimonials = await getAlltestimonials();
    const restorants = await getAllRestorants()
    res.render("index", {categories, chefs, testimonials, restorants });
})


export default homeRouter ;