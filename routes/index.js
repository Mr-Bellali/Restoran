import { Router } from "express";
import aboutRouter from './about.js'
import contactRouter from './contact.js'
import homeRouter from './home.js'
import dashboardRouter from "./dashboard.js";

const routes = Router(); 

routes.use(homeRouter, aboutRouter, contactRouter, dashboardRouter);

export default routes;