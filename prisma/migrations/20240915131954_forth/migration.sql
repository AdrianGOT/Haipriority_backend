/*
  Warnings:

  - You are about to drop the column `cardLastName` on the `CreditCard` table. All the data in the column will be lost.
  - You are about to drop the column `cardLastName` on the `DebitCard` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CreditCard" DROP COLUMN "cardLastName";

-- AlterTable
ALTER TABLE "DebitCard" DROP COLUMN "cardLastName";
