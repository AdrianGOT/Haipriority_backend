import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main(){
    await prisma.role.createMany({
        data: [
            { role: "USER"},
            { role: "ADMIN"}
        ]
    })

    await prisma.creditCard_init.createMany({
        data: [
            {
                "type" : "Platinum",
                "amountAllowed" : 2200000,
                "franchise" : "VISA"
            },
            {
                "type" : "Clasic",
                "amountAllowed" : 1200000,
                "franchise" : "VISA"
            },
            {
                "type" : "Platinum",
                "amountAllowed" : 500000,
                "franchise" : "MASTER CARD"
            },
            {
                "type" : "Clasic",
                "amountAllowed" : 200000,
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

    await prisma.loan_init.createMany({
        data: [
            {
                title: "Credito de libre inversión",
                amountAllowed: 10000000,
                interest: 13,
            },
            {
                title: "Credito educativo ",
                amountAllowed: 40000000,
                interest: 10,
            },
            {
                title: "Prestamo hipotecario",
                amountAllowed: 80000000,
                interest: 15,
            },
            {
                title: "Prestamo rotativo",
                amountAllowed: 70000000,
                interest: 8,
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