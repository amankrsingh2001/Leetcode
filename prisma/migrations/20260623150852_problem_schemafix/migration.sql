/*
  Warnings:

  - You are about to drop the column `testCaseId` on the `TestCases` table. All the data in the column will be lost.
  - Added the required column `metaDataId` to the `TestCases` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TestCases" DROP CONSTRAINT "TestCases_testCaseId_fkey";

-- DropIndex
DROP INDEX "TestCases_testCaseId_key";

-- AlterTable
ALTER TABLE "TestCases" DROP COLUMN "testCaseId",
ADD COLUMN     "metaDataId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "TestCases" ADD CONSTRAINT "TestCases_metaDataId_fkey" FOREIGN KEY ("metaDataId") REFERENCES "MetaData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
