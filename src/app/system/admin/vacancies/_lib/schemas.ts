import {
  Application,
  EmploymentType,
  Job,
  Vacancy,
  VacancyStatus,
  VacancyType,
} from "@prisma/client";
import { z } from "zod";

export const AddEditVacancySchema = z.object({
  profession: z
    .string({ required_error: "Vacancy profession is required" })
    .min(1, "Vacancy profession is required"),
  roleType: z
    .string({ required_error: "Vacancy role type is required" })
    .min(1, "Vacancy role type is required"),
  jobId: z
    .string({ required_error: "Vacancy job is required" })
    .min(1, "Vacancy job is required"),
  type: z.nativeEnum(VacancyType, {
    required_error: "Vacancy type is required",
    invalid_type_error: "Invalid vacancy type",
  }),
  employmentType: z.nativeEnum(EmploymentType, {
    required_error: "Vacancy employment type is required",
    invalid_type_error: "Invalid vacancy employment type",
  }),
  deadline: z.coerce
    .date({ required_error: "Vacancy deadline is required" })
    .min(new Date(), { message: "Vacancy deadline must be in the future" }),
});
export type AddEditVacancy = z.infer<typeof AddEditVacancySchema>;

export const ChangeVacancyStatusSchema = z.object({
  status: z.nativeEnum(VacancyStatus, {
    required_error: "Vacancy status is required",
    invalid_type_error: "Invalid job status",
  }),
});

export type ChangeVacancyStatus = z.infer<typeof ChangeVacancyStatusSchema>;

export type VacancyStatusTotal = Record<VacancyStatus, number>;

export type ListVacancy = Vacancy & {
  job: string;
  applicants: number;
};

export type ListVacancyWithStatusTotals = {
  vacancies: ListVacancy[];
  totals: VacancyStatusTotal;
};

export type VacancyDetail = Vacancy & {
  job: Job;
  applicants: number;
};

export type ListApplicants = Pick<Application, "id" | "jobSeekerId"> & {
  applicantName: string;
};
