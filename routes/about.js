import { Router } from "express";
import { getAllRestorants, getAllChefs } from "../controllers/home.js";

const aboutRouter = Router() ;


aboutRouter.get("/about",async (req, res) => {
    const chefs = await getAllChefs();
    const restorants = await getAllRestorants();
    res.render("about", {chefs, restorants});
})

export default aboutRouter ;