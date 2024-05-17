import { Router } from "express";
import { createChef, createMeal, createRestorant, getAllChefs, getAllContacts, getAllMeals, getAllReservation, getAllRestorants } from "../controllers/dashboard.js";

const dashboardRouter = Router() ;

import multer from 'multer';

let storagechef = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/files/chefs')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname )
    }
  })

  let storagemeal = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/files/meals')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname )
    }
  })

const uploadchef = multer({ storage: storagechef})
const uploadmeal = multer({ storage: storagemeal})
//restorant routes
dashboardRouter.get("/dashboard/restorant",async (req, res) => {
  const restorants = await getAllRestorants(); 
  const reservations = await getAllReservation();
  const contacts = await getAllContacts(); 
  res.render("restorant",{restorants, reservations, contacts});
})

dashboardRouter.post("/dashboard/restorant", createRestorant);

//chef routes
dashboardRouter.get("/dashboard/chef",async (req, res) => {
  const chefs = await getAllChefs();  
  
  res.render("chef",{chefs});
})

dashboardRouter.post("/dashboard/chef", uploadchef.single('image'), createChef)



//meal routes
dashboardRouter.get("/dashboard/meal",async (req, res) => {
  const meals = await getAllMeals(); 
  res.render("meal", {meals});
})

dashboardRouter.post("/dashboard/meal", uploadmeal.single('image'), createMeal)


//reservation route


//contact route

export default dashboardRouter ;