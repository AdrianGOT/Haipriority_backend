import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const prismaClient = prisma.client;
export const prismaCreditCard = prisma.creditCard;
export const prismaDebitCard = prisma.debitCard;
export const prismaRole = prisma.role;
export const prismaLoan = prisma.loan;
export const prismaRoleClient = prisma.rolesOnClients;

export const prismaCCard = prisma.creditCard_init;
export const prismaDCard = prisma.debitCard_init;
export const prismaLoaninit = prisma.loan_init;

// export const PrismaCreditClient = prisma.creditCardOnClients;
