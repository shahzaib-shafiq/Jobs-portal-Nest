/*
  Warnings:

  - You are about to alter the column `registrationId` on the `Company` table. The data in that column could be lost. The data in that column will be cast from `VarChar(150)` to `VarChar(10)`.

*/
-- AlterTable
ALTER TABLE "public"."Company" ALTER COLUMN "registrationId" SET DATA TYPE VARCHAR(10);
