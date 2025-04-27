import { z } from "zod";

export const educationSchema = z.object({
	school: z.string().describe("The name of the school"),
	degree: z.string().describe("The degree or program of the education"),
	graduation_date: z.string().describe("The date of graduation"),
	gpa: z.string().describe("The GPA of the education"),
});
