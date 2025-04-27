import { createGoogleGenerativeAI } from "@ai-sdk/google";

import { generateObject } from "ai";
import { candidateSchema } from "./candidate.schema";
import { env } from "@/env.mjs";

const google = createGoogleGenerativeAI({
	apiKey: env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY,
});

export async function extractResumeData(resume: File) {
	const result = await generateObject({
		model: google("gemini-1.5-flash"),
		schema: candidateSchema,
		system:
			"Extract candidate information from this resume. Be concise and factual. " +
			"For missing data: use null data type for optional fields, empty arrays for array fields, " +
			"and empty objects for object fields. " +
			"The output must include text describing the candidate's background." +
			"if the gradation date is not available, set it to null data type",
		messages: [
			{
				role: "user",
				content: [
					{
						type: "text",
						text: "Please analyze this resume and extract the candidate information.",
					},
					{
						type: "file",
						data: await resume.arrayBuffer(),
						mimeType: "application/pdf",
					},
				],
			},
		],
	});

	return result.object;
}
