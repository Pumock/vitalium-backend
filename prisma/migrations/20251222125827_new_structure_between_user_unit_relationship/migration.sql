/*
  Warnings:

  - You are about to drop the column `clinicId` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `caregivers` table. All the data in the column will be lost.
  - You are about to drop the column `clinicId` on the `doctors` table. All the data in the column will be lost.
  - You are about to drop the column `consultationPrice` on the `doctors` table. All the data in the column will be lost.
  - You are about to drop the column `hospitalId` on the `doctors` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `medical_records` table. All the data in the column will be lost.
  - You are about to drop the column `hospitalId` on the `nurses` table. All the data in the column will be lost.
  - You are about to drop the column `wardId` on the `nurses` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `patient_doctors` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `prescriptions` table. All the data in the column will be lost.
  - You are about to drop the column `medications` on the `prescriptions` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `prescriptions` table. All the data in the column will be lost.
  - You are about to drop the column `validUntil` on the `prescriptions` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `specializations` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `ward_admissions` table. All the data in the column will be lost.
  - You are about to drop the column `currentOccupancy` on the `wards` table. All the data in the column will be lost.
  - You are about to drop the column `hospitalId` on the `wards` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `wards` table. All the data in the column will be lost.
  - You are about to drop the column `wardType` on the `wards` table. All the data in the column will be lost.
  - You are about to drop the `clinics` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `hospitals` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `unitId` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dosage` to the `prescriptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `prescriptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `frequency` to the `prescriptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `medication` to the `prescriptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitId` to the `prescriptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `wards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitId` to the `wards` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UnitType" AS ENUM ('HOSPITAL', 'CLINIC', 'CONSULTING_ROOM', 'LAB', 'OTHER');

-- DropForeignKey
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_clinicId_fkey";

-- DropForeignKey
ALTER TABLE "clinics" DROP CONSTRAINT "clinics_hospitalId_fkey";

-- DropForeignKey
ALTER TABLE "doctors" DROP CONSTRAINT "doctors_clinicId_fkey";

-- DropForeignKey
ALTER TABLE "doctors" DROP CONSTRAINT "doctors_hospitalId_fkey";

-- DropForeignKey
ALTER TABLE "nurses" DROP CONSTRAINT "nurses_hospitalId_fkey";

-- DropForeignKey
ALTER TABLE "nurses" DROP CONSTRAINT "nurses_wardId_fkey";

-- DropForeignKey
ALTER TABLE "wards" DROP CONSTRAINT "wards_hospitalId_fkey";

-- AlterTable
ALTER TABLE "appointments" DROP COLUMN "clinicId",
ADD COLUMN     "unitId" TEXT NOT NULL,
ALTER COLUMN "duration" SET DEFAULT 30;

-- AlterTable
ALTER TABLE "caregivers" DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "doctors" DROP COLUMN "clinicId",
DROP COLUMN "consultationPrice",
DROP COLUMN "hospitalId",
ALTER COLUMN "crmState" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "medical_records" DROP COLUMN "isActive";

-- AlterTable
ALTER TABLE "nurses" DROP COLUMN "hospitalId",
DROP COLUMN "wardId";

-- AlterTable
ALTER TABLE "patient_doctors" DROP COLUMN "isActive";

-- AlterTable
ALTER TABLE "prescriptions" DROP COLUMN "isActive",
DROP COLUMN "medications",
DROP COLUMN "updatedAt",
DROP COLUMN "validUntil",
ADD COLUMN     "dosage" TEXT NOT NULL,
ADD COLUMN     "duration" TEXT NOT NULL,
ADD COLUMN     "frequency" TEXT NOT NULL,
ADD COLUMN     "medication" TEXT NOT NULL,
ADD COLUMN     "prescribedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "unitId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "specializations" DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "ward_admissions" DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "wards" DROP COLUMN "currentOccupancy",
DROP COLUMN "hospitalId",
DROP COLUMN "updatedAt",
DROP COLUMN "wardType",
ADD COLUMN     "currentLoad" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "floor" TEXT,
ADD COLUMN     "type" "WardType" NOT NULL,
ADD COLUMN     "unitId" TEXT NOT NULL;

-- DropTable
DROP TABLE "clinics";

-- DropTable
DROP TABLE "hospitals";

-- CreateTable
CREATE TABLE "units" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "UnitType" NOT NULL,
    "cnpj" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zipCode" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "units_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "doctor_units" (
    "id" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "unitId" TEXT NOT NULL,
    "consultationPrice" DECIMAL(65,30),
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "doctor_units_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nurse_units" (
    "id" TEXT NOT NULL,
    "nurseId" TEXT NOT NULL,
    "unitId" TEXT NOT NULL,
    "wardId" TEXT,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nurse_units_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patient_units" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "unitId" TEXT NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "patient_units_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "units_cnpj_key" ON "units"("cnpj");

-- CreateIndex
CREATE INDEX "doctor_units_doctorId_idx" ON "doctor_units"("doctorId");

-- CreateIndex
CREATE INDEX "doctor_units_unitId_idx" ON "doctor_units"("unitId");

-- CreateIndex
CREATE UNIQUE INDEX "doctor_units_doctorId_unitId_key" ON "doctor_units"("doctorId", "unitId");

-- CreateIndex
CREATE INDEX "nurse_units_nurseId_idx" ON "nurse_units"("nurseId");

-- CreateIndex
CREATE INDEX "nurse_units_unitId_idx" ON "nurse_units"("unitId");

-- CreateIndex
CREATE UNIQUE INDEX "nurse_units_nurseId_unitId_key" ON "nurse_units"("nurseId", "unitId");

-- CreateIndex
CREATE INDEX "patient_units_patientId_idx" ON "patient_units"("patientId");

-- CreateIndex
CREATE UNIQUE INDEX "patient_units_patientId_unitId_key" ON "patient_units"("patientId", "unitId");

-- CreateIndex
CREATE INDEX "appointments_patientId_idx" ON "appointments"("patientId");

-- CreateIndex
CREATE INDEX "appointments_doctorId_idx" ON "appointments"("doctorId");

-- CreateIndex
CREATE INDEX "appointments_scheduledAt_idx" ON "appointments"("scheduledAt");

-- CreateIndex
CREATE INDEX "doctors_crm_idx" ON "doctors"("crm");

-- CreateIndex
CREATE INDEX "medical_records_patientId_idx" ON "medical_records"("patientId");

-- CreateIndex
CREATE INDEX "medical_records_doctorId_idx" ON "medical_records"("doctorId");

-- CreateIndex
CREATE INDEX "nurses_coren_idx" ON "nurses"("coren");

-- CreateIndex
CREATE INDEX "patients_cpf_idx" ON "patients"("cpf");

-- CreateIndex
CREATE INDEX "prescriptions_patientId_idx" ON "prescriptions"("patientId");

-- CreateIndex
CREATE INDEX "prescriptions_doctorId_idx" ON "prescriptions"("doctorId");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_role_idx" ON "users"("role");

-- CreateIndex
CREATE INDEX "ward_admissions_patientId_idx" ON "ward_admissions"("patientId");

-- CreateIndex
CREATE INDEX "ward_admissions_wardId_idx" ON "ward_admissions"("wardId");

-- CreateIndex
CREATE INDEX "wards_unitId_idx" ON "wards"("unitId");

-- AddForeignKey
ALTER TABLE "doctor_units" ADD CONSTRAINT "doctor_units_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctor_units" ADD CONSTRAINT "doctor_units_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "units"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nurse_units" ADD CONSTRAINT "nurse_units_nurseId_fkey" FOREIGN KEY ("nurseId") REFERENCES "nurses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nurse_units" ADD CONSTRAINT "nurse_units_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "units"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nurse_units" ADD CONSTRAINT "nurse_units_wardId_fkey" FOREIGN KEY ("wardId") REFERENCES "wards"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient_units" ADD CONSTRAINT "patient_units_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient_units" ADD CONSTRAINT "patient_units_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "units"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "units"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prescriptions" ADD CONSTRAINT "prescriptions_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "units"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wards" ADD CONSTRAINT "wards_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "units"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
