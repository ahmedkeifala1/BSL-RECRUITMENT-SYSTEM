"use server";

import { ChangeApplicationStatus } from "./schema";
import { updateApplicationStatus } from "@/app/(home)/jobs/[id]/apply/_lib/actions";
import { evaluateApplication } from "@/lib/backend/services/ai-evaluation-service";
import { OkResponse } from "@/lib/shared/response";

export async function changeApplicationStatus(data: ChangeApplicationStatus) {
  return updateApplicationStatus({ id: data.id }, data.status);
}

export async function runEvaluation(applicationId: string) {
  await evaluateApplication(applicationId);

  return OkResponse.create(true, { message: "AI evaluation completed" });
}
