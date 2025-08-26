-- AlterTable
ALTER TABLE "public"."Application" ADD COLUMN     "comments" TEXT,
ADD COLUMN     "currentStatus" TEXT,
ADD COLUMN     "gpa" DOUBLE PRECISION,
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "jobSource" TEXT,
ADD COLUMN     "onHold" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "score" DOUBLE PRECISION,
ADD COLUMN     "skillSummary" TEXT,
ADD COLUMN     "type" TEXT;

-- AlterTable
ALTER TABLE "public"."Company" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "public"."Job" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "public"."Notification" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "public"."SavedJob" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;
