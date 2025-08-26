-- CreateTable
CREATE TABLE "public"."Blacklist" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "accessToken" TEXT,
    "refreshToken" TEXT,

    CONSTRAINT "Blacklist_pkey" PRIMARY KEY ("id")
);
