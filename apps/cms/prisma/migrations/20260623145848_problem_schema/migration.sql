-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('Easy', 'Medium', 'Hard');

-- CreateTable
CREATE TABLE "Problem" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "difficulty" "Difficulty" NOT NULL DEFAULT 'Easy',
    "topic" TEXT NOT NULL,
    "compaines" TEXT[],

    CONSTRAINT "Problem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MetaData" (
    "id" TEXT NOT NULL,
    "leetcodeUrl" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "constraints" TEXT[],
    "problemId" TEXT NOT NULL,

    CONSTRAINT "MetaData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestCases" (
    "id" TEXT NOT NULL,
    "input" TEXT NOT NULL,
    "output" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,
    "testCaseId" TEXT NOT NULL,

    CONSTRAINT "TestCases_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MetaData_problemId_key" ON "MetaData"("problemId");

-- CreateIndex
CREATE UNIQUE INDEX "TestCases_testCaseId_key" ON "TestCases"("testCaseId");

-- AddForeignKey
ALTER TABLE "MetaData" ADD CONSTRAINT "MetaData_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestCases" ADD CONSTRAINT "TestCases_testCaseId_fkey" FOREIGN KEY ("testCaseId") REFERENCES "MetaData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
