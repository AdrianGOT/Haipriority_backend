/*
  Warnings:

  - A unique constraint covering the columns `[number]` on the table `CreditCard` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `paymentDate` on the `CreditCard` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "CreditCard" DROP COLUMN "paymentDate",
ADD COLUMN     "paymentDate" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CreditCard_number_key" ON "CreditCard"("number");
