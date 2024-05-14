import { Router } from "express";

const aboutRouter = Router() ;

aboutRouter.get("/about",(req, res) => {
    res.render("about");
})

export default aboutRouter ;