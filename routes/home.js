import { Router } from "express";
import { getAllCategories } from "../controllers/home.js";

const homeRouter = Router() ;

homeRouter.get("/",async (req, res) => {
    const categories = await getAllCategories();
    res.render("index", {categories});
})


export default homeRouter ;