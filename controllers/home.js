import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

//get branches
export const getBranchDerection = async (req, res) => {
    try {
        const branch = req.params.branch;
        const branchData = await prisma.restorant.findUnique({
            where: {
                branch
            },
            include: {
                Chefs: true,
                Meals: true,
                Categories: true
            }
        });
        if(!branch) {
            return res.status(404).json({ error: 'Branch not found'});
        }
        res.render('index', { branchData })
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
        categories.forEach(function (category) {
            console.log(category.Meals)
        })
        return categories;
    } catch (error) {
        console.log(error);
    }
}

