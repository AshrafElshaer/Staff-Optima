import { createOpenAI } from "@ai-sdk/openai";

import { env } from "@/env.mjs";
import { ratelimit } from "@optima/kv/ratelimit";
import { streamText } from "ai";
import { match } from "ts-pattern";

// IMPORTANT! Set the runtime to edge: https://vercel.com/docs/functions/edge-functions/edge-runtime
export const runtime = "edge";

const openai = createOpenAI({
	apiKey: env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function POST(req: Request): Promise<Response> {
	// Check if the OPENAI_API_KEY is set, if not return 400
	// if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "") {
	// 	return new Response(
	// 		"Missing OPENAI_API_KEY - make sure to add it to your .env file.",
	// 		{
	// 			status: 400,
	// 		},
	// 	);
	// }
	const ip = req.headers.get("x-forwarded-for");
	const { success, limit, reset, remaining } = await ratelimit.limit(
		`novel_ratelimit_${ip}`,
	);

	if (!success) {
		return new Response("You have reached your request limit for the day.", {
			status: 429,
			headers: {
				"X-RateLimit-Limit": limit.toString(),
				"X-RateLimit-Remaining": remaining.toString(),
				"X-RateLimit-Reset": reset.toString(),
			},
		});
	}

	const { prompt, option, command } = await req.json();
	const messages = match(option)
		.with("continue", () => [
			{
				role: "system",
				content:
					"You are an AI writing assistant that continues existing text based on context from prior text. " +
					"Give more weight/priority to the later characters than the beginning ones. " +
					"Limit your response to no more than 200 characters, but make sure to construct complete sentences." +
					"Use Markdown formatting when appropriate. " +
					"Start directly with the continuation without commentary.",
			},
			{
				role: "user",
				content: prompt,
			},
		])
		.with("improve", () => [
			{
				role: "system",
				content:
					"You are an AI writing assistant that improves existing text. " +
					"Limit your response to no more than 200 characters, but make sure to construct complete sentences." +
					"Use Markdown formatting when appropriate. " +
					"Provide the improved version directly without commentary.",
			},
			{
				role: "user",
				content: `The existing text is: ${prompt}`,
			},
		])
		.with("shorter", () => [
			{
				role: "system",
				content:
					"You are an AI writing assistant that shortens existing text. " +
					"Use Markdown formatting when appropriate. " +
					"Provide the shortened version directly without commentary.",
			},
			{
				role: "user",
				content: `The existing text is: ${prompt}`,
			},
		])
		.with("longer", () => [
			{
				role: "system",
				content:
					"You are an AI writing assistant that lengthens existing text. " +
					"Use Markdown formatting when appropriate. " +
					"Provide the expanded version directly without commentary.",
			},
			{
				role: "user",
				content: `The existing text is: ${prompt}`,
			},
		])
		.with("fix", () => [
			{
				role: "system",
				content:
					"You are an AI writing assistant that fixes grammar and spelling errors in existing text. " +
					"Limit your response to no more than 200 characters, but make sure to construct complete sentences." +
					"Use Markdown formatting when appropriate. " +
					"Provide the corrected text only.",
			},
			{
				role: "user",
				content: `The existing text is: ${prompt}`,
			},
		])
		.with("zap", () => [
			{
				role: "system",
				content:
					"You area an AI writing assistant that generates text based on a prompt. " +
					"You take an input from the user and a command for manipulating the text" +
					"Use Markdown formatting when appropriate." +
					"Provide the generated text directly without commentary.",
			},
			{
				role: "user",
				content: `For this text: ${prompt}. You have to respect the command: ${command}`,
			},
		])
		.run();
	const result = await streamText({
		prompt: messages[messages.length - 1]?.content,
		maxTokens: 4096,
		temperature: 0.7,
		// temperature: match(option)
		// 	.with("fix", () => 0.3)
		// 	.with("shorter", () => 0.4)
		// 	.with("improve", () => 0.6)
		// 	.with("continue", () => 0.7)
		// 	.with("longer", () => 0.7)
		// 	.with("zap", () => 0.7)
		// 	.run(),
		topP: 1,
		frequencyPenalty: 0,
		presencePenalty: 0,
		model: openai("gpt-4o-mini"),
	});

	return result.toDataStreamResponse();
}
