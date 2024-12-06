import { IconKey } from "@/lib/frontend/icons";
import { Application, ApplicationDocument, Document } from "@prisma/client";
import { VacancyDetail } from "../admin/vacancies/_lib/schemas";
import { JobSeekerDocumentDetail } from "../user/_lib/schema";

export type Route = {
  title: string;
  href: string;
  icon: IconKey;
};

export type ListApplication = Application & {
  job: string;
};

export type ApplicationDetail = Application & {
  vacancy: VacancyDetail;
  coverLetter: Document;
  cv: JobSeekerDocumentDetail;
  documents: (ApplicationDocument & {
    document: Document;
  })[];
};
