-- CreateEnum
CREATE TYPE "job_types" AS ENUM ('Full_Time', 'Part_Time', 'Contract', 'Internship');

-- CreateEnum
CREATE TYPE "user_statuses" AS ENUM ('Active', 'Blocked', 'Inactive');

-- CreateEnum
CREATE TYPE "user_types" AS ENUM ('Admin', 'Staff', 'User');

-- CreateEnum
CREATE TYPE "job_statuses" AS ENUM ('Drafted', 'Approved', 'Rejected');

-- CreateEnum
CREATE TYPE "job_listing_types" AS ENUM ('Qualification', 'Responsibility');

-- CreateEnum
CREATE TYPE "vacancy_statuses" AS ENUM ('Drafted', 'Published', 'Unpublished');

-- CreateEnum
CREATE TYPE "admin_roles" AS ENUM ('Admin', 'Director', 'Manager');

-- CreateTable
CREATE TABLE "job_seekers" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "middleName" TEXT,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "account_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "job_seekers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userType" "user_types" NOT NULL DEFAULT 'User',
    "isEmailVerified" BOOLEAN NOT NULL DEFAULT false,
    "status" "user_statuses" NOT NULL DEFAULT 'Active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jobs" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "job_types" NOT NULL,
    "status" "job_statuses" NOT NULL DEFAULT 'Drafted',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_listings" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "job_listing_types" NOT NULL,
    "requirements" TEXT[],
    "jobId" TEXT NOT NULL,

    CONSTRAINT "job_listings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vacancies" (
    "id" TEXT NOT NULL,
    "profession" TEXT NOT NULL,
    "roleType" TEXT NOT NULL,
    "employment_type" "job_types" NOT NULL,
    "jobId" TEXT NOT NULL,
    "status" "vacancy_statuses" NOT NULL DEFAULT 'Drafted',
    "postedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deadline" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vacancies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admins" (
    "id" TEXT NOT NULL,
    "role" "admin_roles" NOT NULL,
    "staff_id" TEXT NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "staffs" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "middleName" TEXT,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "account_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "staffs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "job_seekers_email_key" ON "job_seekers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "job_seekers_account_id_key" ON "job_seekers"("account_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "admins_staff_id_key" ON "admins"("staff_id");

-- CreateIndex
CREATE UNIQUE INDEX "staffs_email_key" ON "staffs"("email");

-- CreateIndex
CREATE UNIQUE INDEX "staffs_account_id_key" ON "staffs"("account_id");

-- AddForeignKey
ALTER TABLE "job_seekers" ADD CONSTRAINT "job_seekers_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_listings" ADD CONSTRAINT "job_listings_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vacancies" ADD CONSTRAINT "vacancies_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admins" ADD CONSTRAINT "admins_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "staffs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staffs" ADD CONSTRAINT "staffs_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
