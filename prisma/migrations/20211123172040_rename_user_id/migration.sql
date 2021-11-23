/*
  Warnings:

  - You are about to drop the column `userId` on the `tilemaps` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `tilemaps` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tilemaps" DROP CONSTRAINT "tilemaps_userId_fkey";

-- AlterTable
ALTER TABLE "tilemaps" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "tilemaps" ADD CONSTRAINT "tilemaps_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
