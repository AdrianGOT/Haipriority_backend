-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "state" BOOLEAN NOT NULL DEFAULT true,
    "phoneNumber" TEXT NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "amoutallowed" DOUBLE PRECISION NOT NULL,
    "franchise" TEXT NOT NULL,
    "cardType" TEXT NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Loan_init" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "amoutallowed" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Loan_init_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreditCard" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "cvc" SMALLINT NOT NULL,
    "current_amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "cardName" VARCHAR(20) NOT NULL,
    "cardLastName" VARCHAR(20) NOT NULL,
    "expirationDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "courtDate" TIMESTAMP(3) NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL,
    "cardId" INTEGER NOT NULL,
    "clientId" INTEGER NOT NULL,

    CONSTRAINT "CreditCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DebitCard" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "cvc" SMALLINT NOT NULL,
    "current_amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "cardName" VARCHAR(20) NOT NULL,
    "cardLastName" VARCHAR(20) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expirationDate" TIMESTAMP(3) NOT NULL,
    "cardId" INTEGER NOT NULL,
    "clientId" INTEGER NOT NULL,

    CONSTRAINT "DebitCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Loan" (
    "id" SERIAL NOT NULL,
    "current_amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "limitDate" TIMESTAMP(3) NOT NULL,
    "clientId" INTEGER NOT NULL,
    "loanId" INTEGER NOT NULL,

    CONSTRAINT "Loan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "role" VARCHAR(8) NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RolesOnClients" (
    "clientId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "RolesOnClients_pkey" PRIMARY KEY ("clientId","roleId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

-- AddForeignKey
ALTER TABLE "CreditCard" ADD CONSTRAINT "CreditCard_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditCard" ADD CONSTRAINT "CreditCard_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DebitCard" ADD CONSTRAINT "DebitCard_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DebitCard" ADD CONSTRAINT "DebitCard_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Loan" ADD CONSTRAINT "Loan_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Loan" ADD CONSTRAINT "Loan_loanId_fkey" FOREIGN KEY ("loanId") REFERENCES "Loan_init"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolesOnClients" ADD CONSTRAINT "RolesOnClients_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolesOnClients" ADD CONSTRAINT "RolesOnClients_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
