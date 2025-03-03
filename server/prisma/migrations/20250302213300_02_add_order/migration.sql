/*
  Warnings:

  - A unique constraint covering the columns `[order]` on the table `reviews` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "reviews" ADD COLUMN     "order" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "reviews_order_key" ON "reviews"("order");
