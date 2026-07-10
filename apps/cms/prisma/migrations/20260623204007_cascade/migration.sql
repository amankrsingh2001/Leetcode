-- DropForeignKey
ALTER TABLE "MetaData" DROP CONSTRAINT "MetaData_problemId_fkey";

-- DropForeignKey
ALTER TABLE "TestCases" DROP CONSTRAINT "TestCases_metaDataId_fkey";

-- AddForeignKey
ALTER TABLE "MetaData" ADD CONSTRAINT "MetaData_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestCases" ADD CONSTRAINT "TestCases_metaDataId_fkey" FOREIGN KEY ("metaDataId") REFERENCES "MetaData"("id") ON DELETE CASCADE ON UPDATE CASCADE;
