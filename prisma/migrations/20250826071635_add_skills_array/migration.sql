-- AlterTable
ALTER TABLE "public"."Job" ADD COLUMN     "budget" DOUBLE PRECISION,
ADD COLUMN     "comments" TEXT,
ADD COLUMN     "industry" TEXT,
ADD COLUMN     "skills" TEXT[],
ADD COLUMN     "year" INTEGER;

-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "refreshToken" SET DATA TYPE TEXT;
