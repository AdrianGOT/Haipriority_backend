/*
  Warnings:

  - You are about to drop the `Card` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CreditCard" DROP CONSTRAINT "CreditCard_cardId_fkey";

-- DropForeignKey
ALTER TABLE "DebitCard" DROP CONSTRAINT "DebitCard_cardId_fkey";

-- DropTable
DROP TABLE "Card";

-- CreateTable
CREATE TABLE "CreditCard_init" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "amoutallowed" DOUBLE PRECISION NOT NULL,
    "franchise" TEXT NOT NULL,
    "cardType" TEXT NOT NULL,

    CONSTRAINT "CreditCard_init_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DebitCard_init" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "franchise" TEXT NOT NULL,

    CONSTRAINT "DebitCard_init_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CreditCard" ADD CONSTRAINT "CreditCard_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "CreditCard_init"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DebitCard" ADD CONSTRAINT "DebitCard_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "DebitCard_init"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
