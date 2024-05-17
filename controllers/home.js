import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


//get branches


export const getBranchDirection = async (req, res) => {
    try {
        const branch = req.params.branch;
        if (!branch) {
            return res.status(404).json({ error: 'Branch not found' });
        }
        
        const branchData = await prisma.restorant.findUnique({
            where: {
                branch
            },
            include: {
                Chefs: {
                    include: {
                        SocialsNet: true
                    }
                },
                Meals: {
                    include: {
                        category: true
                    }
                },
                Testimonials: true,
                Contacts: true,
                Reservations: true
            }
        });

        if (!branchData) {
            return res.status(404).json({ error: 'Branch not found' });
        }

        const categories = await prisma.categories.findMany({
            where: {
                Meals: {
                    some: {
                        id_restorant_fk: branchData.id_restorant
                    }
                }
            }
        });

        const chefs = await prisma.chefs.findMany({
            where: {
                id_restorant_fk: branchData.id_restorant
            }
        });

        const testimonials = await prisma.testimonials.findMany({
            where: {
                id_restorant_fk: branchData.id_restorant
            }
        });

        res.render('index', { branchData, categories, chefs, testimonials });
    } catch (error) {
        console.error('Error fetching branch data:', error);
        res.status(500).json({ error: 'Failed to fetch branch data' });
    }
}


// get categories 

export const getAllCategories = async () => {
    try {
        const categories = await prisma.categories.findMany({
            include: {
                Meals: {
                    select: {
                        name_meal: true,
                        description: true,
                        Price: true,
                        Image: true,
                    }
                }
            }
        });
        return categories;
    } catch (error) {
        console.log(error);
    }
}

//get chefs 

export const getAllChefs = async () => {
    try {
        const chefs = prisma.chefs.findMany({
            include: {
                SocialsNet:{
                    select: {
                        facebook: true,
                        twitter: true,
                        instagram: true
                    }
                }
            }
        });
        console.log(chefs);
        return chefs;
    } catch (error) {
        console.log(error);
    }
}

// get testimonials

export const getAlltestimonials = async () => {
    try {
        const testimonials = prisma.testimonials.findMany();
        console.log(testimonials);
        return testimonials;
    } catch (error) {
        console.log(error);
    }
}

// get restorants

export const getAllRestorants = async () => {
    try {
        const restorants = await prisma.restorant.findMany();
        console.log(restorants);
        return restorants;
    } catch (error) {
        console.log(error);
    }
}

//post reservation 

export const creatReservation = async (req, res) => {
    const branch = req.params.branch; 
    const { name, email, dateReservation, numberOfPeople, specialRequest } = req.body;

    try {
        const branchData = await prisma.restorant.findUnique({
            where: {
                branch: branch
            }
        });

        if (!branchData) {
            return res.status(404).json({ error: 'Branch not found' });
        }

        const isoDateReservation = new Date(dateReservation).toISOString();

        const reservation = await prisma.reservations.create({
            data: {
                name,
                email,
                date_reservation: isoDateReservation,
                number_of_poeple: +numberOfPeople,
                special_request: specialRequest,
                restorant: {
                    connect: {
                        id_restorant: branchData.id_restorant 
                    }
                }
            }
        });

        console.log(reservation);
        res.redirect(`/${branchData.branch}`);
    } catch (error) {
        console.error('Error creating reservation:', error);
        res.status(500).json({ error: 'Failed to create reservation' });
    }
}
