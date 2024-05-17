import { PrismaClient } from '@prisma/client';
import { getAllRestorants, getAllChefs } from "./home.js"; // Make sure the paths are correct

const prisma = new PrismaClient();

export const getAboutInfo = async (req, res) => {
    const branch = req.params.branch;
    try {
        const branchData = await prisma.restorant.findUnique({
            where: { branch }
        });

        if (!branchData) {
            return res.status(404).json({ error: 'Branch not found' });
        }

        const chefs = await getAllChefs();
        const restorants = await getAllRestorants();
        
        res.render("about", { branch, chefs, restorants, branchData });
    } catch (error) {
        console.error('Error fetching about info:', error);
        res.status(500).json({ error: 'Failed to fetch about info' });
    }
};
