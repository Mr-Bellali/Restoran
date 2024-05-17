import { Router } from "express";
import {getAboutInfo} from '../controllers/about.js'
const aboutRouter = Router();

aboutRouter.get("/:branch/about", getAboutInfo);

export default aboutRouter;
