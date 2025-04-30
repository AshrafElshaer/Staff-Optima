import {
	candidateEducationSchema,
	candidateExperienceSchema,
	candidateSocialLinkSchema,
} from "@optima/supabase/validations";
import { z } from "zod";

const educationSchema = z.object({
	school: z.string().describe("School name"),
	degree: z.string().describe("Degree"),
	graduation_date: z.string().describe("Graduation date"), // Removed .date() format
	gpa: z.string().describe("GPA"),
});

const experienceSchema = candidateExperienceSchema
	.omit({
		candidate_id: true,
		company_id: true,
		id: true,
	})
	.describe("Professional experience details of the candidate");

export const candidateSchema = z.object({
	email: z.string().describe("Email of the candidate"),
	first_name: z.string().describe("First name of the candidate"),
	last_name: z.string().describe("Last name of the candidate"),
	gender: z.string().optional().describe("Gender of the candidate"),
	city: z.string().optional().describe("City where the candidate lives"),
	country: z.string().optional().describe("Country where the candidate lives"),
	date_of_birth: z
		.string()
		.optional()
		.describe("Date of birth of the candidate"),
	educations: z
		.array(educationSchema)
		.optional()
		.describe("Educations of the candidate"),
	experiences: z
		.array(experienceSchema)
		.optional()
		.describe("Experiences of the candidate"),
	phone_number: z.string().optional().describe("Phone number of the candidate"),
	social_links: z
		.array(candidateSocialLinkSchema)
		.optional()
		.describe("Social links of the candidate such as linkedin, github, etc."),
	timezone: z.string().optional().describe("Timezone of the candidate"),
});
