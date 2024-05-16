import { Router } from "express";
import { createContact } from "../controllers/contact.js";


const contactRouter = Router() ;

contactRouter.get("/contact",(req, res) => {
    res.render("contact");
});

contactRouter.post("/contact", createContact);

export default contactRouter;