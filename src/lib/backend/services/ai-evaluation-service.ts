import Anthropic from "@anthropic-ai/sdk";
import Database from "@/lib/backend/database/db-context";
import { JobListing } from "@prisma/client";
import { extractDocumentText } from "./document-text-service";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const MODEL = "claude-sonnet-4-6";

type EvaluationResult = {
  matchScore: number;
  strengths: string[];
  missingQualifications: string[];
  summary: string;
};

function formatListings(listings: JobListing[]) {
  if (listings.length < 1) {
    return "None specified";
  }

  return listings
    .map(
      (listing) =>
        `${listing.name}:\n${listing.requirements
          .map((requirement) => `- ${requirement}`)
          .join("\n")}`
    )
    .join("\n\n");
}

export async function evaluateApplication(applicationId: string) {
  try {
    const application = await Database.application.findUniqueOrThrow({
      where: { id: applicationId },
      select: {
        cv: { select: { document: true } },
        vacancy: {
          select: {
            job: {
              select: {
                title: true,
                description: true,
                listings: true,
              },
            },
          },
        },
      },
    });

    const cvText = await extractDocumentText(application.cv.document);
    if (!cvText) {
      return;
    }

    const { job } = application.vacancy;
    const qualifications = job.listings.filter(
      (listing) => listing.type === "Qualification"
    );
    const responsibilities = job.listings.filter(
      (listing) => listing.type === "Responsibility"
    );

    const prompt = `You are screening a job application for a recruitment platform.

Job Title: ${job.title}

Job Description:
${job.description}

Qualifications required:
${formatListings(qualifications)}

Responsibilities:
${formatListings(responsibilities)}

Candidate CV:
"""
${cvText}
"""

Evaluate how well this candidate matches the role above.`;

    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 1024,
      tool_choice: { type: "tool", name: "record_evaluation" },
      tools: [
        {
          name: "record_evaluation",
          description:
            "Record the result of evaluating a candidate's CV against a job's requirements.",
          input_schema: {
            type: "object",
            properties: {
              matchScore: {
                type: "integer",
                minimum: 0,
                maximum: 100,
                description:
                  "Overall percentage match between the CV and the job requirements.",
              },
              strengths: {
                type: "array",
                items: { type: "string" },
                description:
                  "Notable strengths of the candidate relevant to this role.",
              },
              missingQualifications: {
                type: "array",
                items: { type: "string" },
                description:
                  "Qualifications or requirements the candidate appears to be missing.",
              },
              summary: {
                type: "string",
                description:
                  "A brief summary of the candidate's fit for the role.",
              },
            },
            required: [
              "matchScore",
              "strengths",
              "missingQualifications",
              "summary",
            ],
          },
        },
      ],
      messages: [{ role: "user", content: prompt }],
    });

    const toolUse = response.content.find(
      (block): block is Anthropic.ToolUseBlock => block.type === "tool_use"
    );

    if (!toolUse) {
      return;
    }

    const result = toolUse.input as EvaluationResult;

    await Database.application.update({
      where: { id: applicationId },
      data: {
        matchScore: result.matchScore,
        strengths: result.strengths,
        missingQualifications: result.missingQualifications,
        summary: result.summary,
        evaluatedAt: new Date(),
      },
    });
  } catch (error) {
    console.error("CV evaluation failed", error);
  }
}
