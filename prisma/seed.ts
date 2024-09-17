import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main(){
    const role = await prisma.role.createMany({
        data: [
            { role: "USER"},
            { role: "ADMIN"}
        ]
    })

    await prisma.creditCard_init.createMany({
        data: [
            {
                "type" : "Platinum",
                "amoutallowed" : 2200000,
                "franchise" : "VISA"
            },
            {
                "type" : "Clasic",
                "amoutallowed" : 1200000,
                "franchise" : "VISA"
            },
            {
                "type" : "Platinum",
                "amoutallowed" : 500000,
                "franchise" : "MASTER CARD"
            },
            {
                "type" : "Clasic",
                "amoutallowed" : 200000,
                "franchise" : "MASTER CARD"
            },
        ]
    })

    await prisma.debitCard_init.createMany({
        data: [
            {
                "type" : "Platinum",
                "franchise" : "VISA"
            },
            {
                "type" : "Clasic",
                "franchise" : "VISA"
            },
            {
                "type" : "Platinum",
                "franchise" : "MASTER CARD"
            },
            {
                "type" : "Clasic",
                "franchise" : "MASTER CARD"
            },
        ]
    })
    
}

main()
    .then(async() => await prisma.$disconnect())
    .catch(async(e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })