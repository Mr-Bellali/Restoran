import { Router } from "express";
import { createContact } from "../controllers/contact.js";

const contactRouter = Router();

contactRouter.get("/:branch/contact", (req, res) => {
    res.render("contact", { branch: req.params.branch });
});

contactRouter.post("/:branch/contact", createContact);

export default contactRouter;
