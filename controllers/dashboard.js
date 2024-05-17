import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()



//Restorants controllers
export const createRestorant = async (req, res) => {
    const { manager, city, adress, phonenumber, email, branch } = req.body;
    try {
        const newRestorant = await prisma.restorant.create({
            data:{
                manager_restorant: manager,
                city,
                address: adress,
                telephone_restorant: phonenumber,
                email_restorant: email,
                branch
            }
        });
        res.status(201).json({ message: 'Restorant created successfully', data: newRestorant });
    } catch (err) {
        console.error('Error creating restorant:', err);
        res.status(500).json({ err: 'Failed to create restorant' });
    }
}

export const getAllRestorants = async () => {
    try {
        const restorants = await prisma.restorant.findMany();
        console.log(restorants);
        return restorants
    } catch (error) {
        console.log(error)
    }
}

//chef controllers 

//Post
export const createChef = async (req, res) => {
    const {name, designation, facebook, twitter, instagram, restorantId} = req.body ;
    const image = req.file;
    console.log(req.body);
    console.log(image);
    console.log(image.destination + '/' + image.originalname)
    if (!image) {
        return res.status(400).json({ error: 'Image file is required.' });
    }
    try {
        const createdChef = await prisma.chefs.create({
            data: {
                name_chef: name,
                designation,
                image: image.destination + '/' + image.originalname, 
                id_restorant_fk: parseInt(restorantId),
                SocialsNet: {
                    create: {
                        facebook,
                        twitter,
                        instagram
                    }
                }
            }
        });
        res.redirect("/dashboard/chef?status=success")
    } catch (error) {
        console.log('path',image.path);
        console.log(error);
        res.redirect("/dashboard/chef?status=failed");
    }
}

//Get

export const getAllChefs = async () => {
    try {
        const chefs = await prisma.chefs.findMany({
            include: {
                restorant: {
                    select: {
                        branch: true
                    }
                } ,
                SocialsNet: {
                    select:{
                        facebook:true,
                        twitter:true,
                        instagram:true
                    }
                }
            }
        });
        chefs.forEach(chef => {
            console.log(chef.SocialsNet)
        })
        return chefs;
    } catch (error) {
        console.log(error)
    }
}

//meal's controllers 

//post 

export const createMeal = async (req, res) => {
    const {name, description, price, restorantId, categoryId} = req.body;
    const image = req.file;
    // console.log(req.body);
    // console.log(image);
    // console.log(image.destination + '/' + image.originalname)
    // if(!image) {
    //     return res.status(400).json({ error: 'Image file required.'});
    // }
    try {
        console.log(name);
        const createdMeal = await prisma.meals.create({
            data: {
                name_meal: name,
                description,
                Price: parseFloat(price),
                Image: image.destination + '/' + image.originalname,
                id_restorant_fk: parseInt(restorantId),
                id_category_fk: parseInt(categoryId),

            }
        });
        console.log(createdMeal);
        res.redirect("/dashboard/meal?status=success")
    } catch (error) {
        console.log(error)
        res.redirect("/dashboard/meal?status=failed");
    }
}

//Get 

export const getAllMeals = async () => {
    try {
        const meals = await prisma.meals.findMany({
            include: {
                restorant: true,
                category:  true
               }
        });
        meals.forEach(meal => {
            console.log(meal.restorant);
            console.log(meal.category);
            console.log(meal.Image);
        });
        return meals;
    } catch (error) {
        console.log(error)
    }
}

//reservation controllers
//GET
export const getAllReservation = async () => {
    try {
        const reservations = await prisma.reservations.findMany({
            include: {
                restorant: true
            }
        });
        console.log(reservations);
        return reservations;
    } catch (error) {
        console.log(error);
    }
}


//contact controllers

export const getAllContacts = async () => {
    try {
        const contacts = await prisma.contacts.findMany({
            include:{
                restorant:true
            }
        });
        console.log(contacts);
        return contacts;
    } catch (error) {
        console.log(error);
    }
}