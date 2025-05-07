import { env } from "@/env.mjs";
import { createOpenAI } from "@ai-sdk/openai";
import type {
	Application,
	CandidateEducation,
	CandidateExperience,
	JobPost,
} from "@optima/supabase/types";
// import type { Application, Candidate, JobPost } from "@optima/supabase/types";
import { generateObject } from "ai";
import { z } from "zod";

const openai = createOpenAI({
	apiKey: env.NEXT_PUBLIC_OPENAI_API_KEY,
});

const schema = z.object({
	match: z
		.number()
		.min(0)
		.max(100)
		.describe("The percentage of how well the candidate matches the job"),
});

type Props = {
	job: JobPost;
	candidateEducations: CandidateEducation[];
	candidateExperiences: CandidateExperience[];
	application: Omit<Application, "candidate_match">;
};

export async function calculateCandidateMatch({
	job,
	candidateEducations,
	candidateExperiences,
	application,
}: Props) {
	try {
		const { object } = await generateObject({
			model: openai("gpt-4o-mini"),
			schema,
			system: `
      You are an AI assistant that calculates how well a candidate matches a job position by analyzing their application and candidate details.
      You should return a match percentage between 0-100 based on:
      - How well the candidate's experience matches the job requirements
      - How well the candidate's education matches the job requirements
      - How well the candidate's skills match the job requirements
      - The candidate's answers to screening questions
      `,
			messages: [
				{
					role: "user",
					content: `
			    Job Details:
			    Title: ${job.title}
			    Description: ${job.job_details}
			    Requirements: ${job.required_skills?.join(", ")}

			    Candidate Details:
			    Education: ${JSON.stringify(candidateEducations)}
			    Experience: ${JSON.stringify(candidateExperiences)}

			    Application Details:
			    Screening Answers: ${JSON.stringify(application.screening_question_answers)}
			    `,
				},
			],
		});

		return object.match;
	} catch (error) {
		console.error("Error calculating candidate match:", error);
		return 50; // Return a default middle value if calculation fails
	}
}
