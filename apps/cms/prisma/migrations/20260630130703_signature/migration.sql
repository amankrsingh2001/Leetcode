-- CreateTable
CREATE TABLE "Signature" (
    "id" TEXT NOT NULL,
    "functionName" TEXT NOT NULL,
    "returnType" JSONB NOT NULL,
    "parameters" JSONB NOT NULL,
    "problemId" TEXT NOT NULL,

    CONSTRAINT "Signature_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Signature_problemId_key" ON "Signature"("problemId");

-- AddForeignKey
ALTER TABLE "Signature" ADD CONSTRAINT "Signature_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
