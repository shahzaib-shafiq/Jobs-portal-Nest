/*
  Warnings:

  - Added the required column `registrationId` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Company" ADD COLUMN     "registrationId" VARCHAR(150) NOT NULL;
