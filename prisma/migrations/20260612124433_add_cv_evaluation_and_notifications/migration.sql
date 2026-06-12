-- AlterTable
ALTER TABLE "applications" ADD COLUMN     "evaluatedAt" TIMESTAMP(3),
ADD COLUMN     "matchScore" INTEGER,
ADD COLUMN     "missingQualifications" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "strengths" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "summary" TEXT;

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "link" TEXT,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

