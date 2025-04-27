import { createGoogleGenerativeAI } from "@ai-sdk/google";

import { generateObject } from "ai";
import { educationSchema } from "./education.schema";
import { env } from "@/env.mjs";
import { z } from "zod";

const google = createGoogleGenerativeAI({
	apiKey: env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY,
});

export async function extractTranscriptData(transcripts: File[]) {
	const filesCount = transcripts.length;

	const result = await generateObject({
		model: google("gemini-1.5-flash"),
		schema: z.array(educationSchema),
		system:
			"Extract education information from this academic transcript. Be concise and factual. " +
			"Focus on extracting: school name, degree/program, graduation date, and GPA. " +
			"For missing data: use null data type for optional fields. " +
			"Convert GPA to 4.0 scale if needed. " +
			"If graduation date is not available, set it to null data type. " +
			"Only extract education-related information.",
		messages: [
			{
				role: "user",
				content:
					"Please analyze this academic transcript and extract the education information.",
			},
			{
				role: "user",
				//@ts-ignore
				content: [
					...(await Promise.all(
						transcripts.map(async (transcript) => ({
							type: "file",
							data: await transcript.arrayBuffer(),
							mimeType: "application/pdf",
						})),
					)),
				],
			},
		],
	});

	return result.object;
}
