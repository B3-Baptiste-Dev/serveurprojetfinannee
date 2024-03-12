/*
  Warnings:

  - Added the required column `location` to the `Object` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Object" ADD COLUMN "location" TEXT NOT NULL DEFAULT 'Location par défaut';
