/*
  Warnings:

  - Made the column `deleted` on table `tilemaps` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "tilemaps" ALTER COLUMN "deleted" SET NOT NULL;
