/*
  Warnings:

  - Changed the type of `crmState` on the `doctors` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `corenState` on the `nurses` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "doctors" DROP COLUMN "crmState",
ADD COLUMN     "crmState" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "nurses" DROP COLUMN "corenState",
ADD COLUMN     "corenState" BOOLEAN NOT NULL;

-- CreateIndex
CREATE INDEX "patient_units_unitId_idx" ON "patient_units"("unitId");
