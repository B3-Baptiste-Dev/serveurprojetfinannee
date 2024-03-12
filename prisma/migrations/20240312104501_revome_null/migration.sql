/*
  Warnings:

  - Made the column `location` on table `Object` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Object" ALTER COLUMN "location" SET NOT NULL;
