import { z } from "zod";
const socialLinkSchema = z
	.object({
		linkedin: z.string().optional().describe("LinkedIn profile URL"),
		github: z.string().optional().describe("GitHub profile URL"),
		portfolio: z.string().optional().describe("Portfolio URL"),
		"x (twitter)": z.string().optional().describe("X (Twitter) profile URL"),
		instagram: z.string().optional().describe("Instagram profile URL"),
		facebook: z.string().optional().describe("Facebook profile URL"),
		other: z.string().optional().describe("Other social media URL"),
	})
	.describe("Social links of the candidate");
const educationSchema = z.object({
	school: z.string().describe("School name"),
	degree: z.string().describe("Degree"),
	graduation_date: z.string().describe("Graduation date"), // Removed .date() format
	gpa: z.string().describe("GPA"),
});

const experienceSchema = z.object({
	company: z.string().describe("Company name"),
	position: z.string().describe("Position"),
	start_date: z.string().describe("Start date"), // Removed .date() format
	end_date: z.string().describe("End date"), // Removed .date() format
	description: z.string().describe("Key responsibilities and achievements"),
	skills: z.array(z.string()).describe("Skills used in the role"),
});

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
	social_links: socialLinkSchema
		.optional()
		.describe("Social links of the candidate such as linkedin, github, etc."),
	timezone: z.string().optional().describe("Timezone of the candidate"),
});
