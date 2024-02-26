/*
  Warnings:

  - You are about to drop the column `location` on the `Object` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Object" DROP COLUMN "location";

-- CreateTable
CREATE TABLE "Annonce" (
    "id" SERIAL NOT NULL,
    "objectId" INTEGER NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Annonce_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Annonce" ADD CONSTRAINT "Annonce_objectId_fkey" FOREIGN KEY ("objectId") REFERENCES "Object"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
