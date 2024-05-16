import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const restorants = [
    {
        id_restorant: 1,
        manager_restorant: "hakmi",
        city: "jerada",
        address: "hay zetoune",
        telephone_restorant: "555-1234",
        email_restorant: "hakmi@resto.com",
        branch: "zeouitina"
    },
    {
        id_restorant: 2,
        manager_restorant: "yassine",
        city: "jerada",
        address: "hay lmassira",
        telephone_restorant: "122-1234",
        email_restorant: "yassine@resto.com",
        branch: "f1"
    },
    {
        id_restorant: 3,
        manager_restorant: "belkhadir",
        city: "jerada",
        address: "hay zkara",
        telephone_restorant: "555-777",
        email_restorant: "belkhadir@resto.com",
        branch: "zkara"
    }

]

const seed = async () => {
    await prisma.restorant.createMany({
        data: restorants
    })
    console.log("[+] restorants table seeded succesfully!");

}
seed();