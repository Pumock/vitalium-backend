/*
  Warnings:

  - Changed the type of `crmState` on the `doctors` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."doctors" DROP COLUMN "crmState",
ADD COLUMN     "crmState" BOOLEAN NOT NULL;
