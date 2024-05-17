import { Router } from "express";
import { creatReservation, getBranchDirection  } from "../controllers/home.js";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const homeRouter = Router() ;

homeRouter.get("/:branch", getBranchDirection);

homeRouter.post("/:branch", creatReservation);




export default homeRouter ;