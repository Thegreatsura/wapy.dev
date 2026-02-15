-- AlterTable
ALTER TABLE "User" ADD COLUMN     "language" TEXT NOT NULL DEFAULT 'en',
ALTER COLUMN "sub_next_notification" SET DEFAULT NOW() + INTERVAL '1 month' - INTERVAL '1 day';
