import { isValidPhoneNumber } from "libphonenumber-js";
import { z } from "zod";
import { domainVerificationStatusEnum } from ".";

// import {
//   attachmentTypeEnum,
//   employmentTypeEnum,
//   experienceLevelEnum,
//   jobLocationEnum,
//   jobPostCampaignStatusEnum,
//   userRoleEnum,
// } from "./index";

export const organizationSchema = z.object({
	id: z.string().uuid(),
	name: z.string().min(2, {
		message: "Organization name is required",
	}),
	domain: z
		.string()
		.regex(/^(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/, "Invalid domain format"),
	is_domain_verified: z.boolean().optional(),
	industry: z.string().min(2, {
		message: "Industry is required",
	}),
	logo: z.string().nullable(),
	address_1: z.string().nullable(),
	address_2: z.string().nullable(),
	city: z.string().nullable(),
	country: z.string().min(2, {
		message: "Country is required",
	}),
	admin_id: z.string().uuid(),
	profile: z.string().optional(),
	state: z.string().nullable(),
	zip_code: z.string().nullable(),
	timezone: z.string().min(2, {
		message: "Timezone is required",
	}),
	tax_id: z.string().nullable(),
	employee_count: z.string().nullable(),
	created_at: z.string().nullable(),
	updated_at: z.string().nullable(),
});

export const organizationInsertSchema = organizationSchema.omit({
	id: true,
	created_at: true,
	updated_at: true,
	admin_id: true,
	logo: true,
	is_domain_verified: true,
});

export const organizationUpdateSchema = organizationSchema.partial().required({
	id: true,
});

export const organizationMemberSchema = z.object({
	organization_id: z.string().uuid(),
	user_id: z.string().uuid(),
	created_at: z.string().nullable(),
	updated_at: z.string().nullable(),
});
export const organizationMemberInsertSchema = organizationMemberSchema.omit({
	updated_at: true,
	created_at: true,
});

export const organizationMemberUpdateSchema =
	organizationMemberSchema.partial();

export const domainVerificationSchema = z.object({
	id: z.string().uuid(),
	organization_id: z.string().uuid(),
	domain: z
		.string()
		.regex(/^(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/, "Invalid domain format"),
	verification_token: z.string(),
	verification_status: z.nativeEnum(domainVerificationStatusEnum),
	verification_date: z.string().nullable(),
	created_at: z.string().nullable(),
	updated_at: z.string().nullable(),
});

export const domainVerificationInsertSchema = domainVerificationSchema.omit({
	id: true,
	created_at: true,
	updated_at: true,
});

export const domainVerificationUpdateSchema = domainVerificationSchema
	.partial()
	.required({
		id: true,
	});
export const departmentSchema = z.object({
	id: z.string().uuid(),
	organization_id: z.string().uuid(),
	name: z.string().min(2, {
		message: "Must be minimum 2 characters",
	}),
	description: z.string().nullable(),
	head_user_id: z.string().uuid().nullable(),
	created_at: z.string().nullable(),
	updated_at: z.string().nullable(),
});

export const departmentInsertSchema = departmentSchema.omit({
	id: true,
	organization_id: true,
	created_at: true,
	updated_at: true,
});

export const departmentUpdateSchema = departmentSchema.partial();

// export const pipelineStageSchema = z.object({
//   id: z.string().uuid(),
//   organization_id: z.string().uuid(),
//   title: z.string().min(2, {
//     message: "Must be minimum 2 characters",
//   }),
//   description: z.string().min(2, {
//     message: "Must be minimum 2 characters",
//   }),
//   indicator_color: z.string().min(2, {
//     message: "Must be minimum 2 characters",
//   }),
//   stage_order: z.string().min(1, {
//     message: "Must be positive number",
//   }),
//   created_at: z.string(),
//   updated_at: z.string(),
// });

// export const pipelineStageInsertSchema = pipelineStageSchema.omit({
//   id: true,
//   organization_id: true,
//   created_at: true,
//   updated_at: true,
// });

// export const pipelineStageUpdateSchema = pipelineStageSchema
//   .partial()
//   .required({
//     id: true,
//   });

export const userSchema = z.object({
	id: z.string().uuid(),
	email: z.string().email(),
	first_name: z.string().min(1, "First name is required."),
	last_name: z.string().min(1, "Last name is required."),
	image: z.string().url().nullable(),
	created_at: z.string().nullable(),
	updated_at: z.string().nullable(),
	phone_number: z.string().refine(isValidPhoneNumber, {
		message: "Invalid phone number",
	}),
});

export const userInsertSchema = userSchema.omit({
	id: true,
	created_at: true,
	updated_at: true,
	image: true,
});

export const userUpdateSchema = userSchema.partial().required({
	id: true,
});
// export const userPreferencesSchema = z.object({
//   user_id: z.string().uuid(),
//   timezone: z.string(),
//   date_format: z.string(),
//   reminder_period: z.number().positive(),
//   created_at: z.string(),
//   updated_at: z.string(),
// });

// export const userPreferencesInsertSchema = userPreferencesSchema.omit({
//   created_at: true,
//   updated_at: true,
// });

// export const userPreferencesUpdateSchema = userPreferencesSchema
//   .partial()
//   .required({
//     user_id: true,
//   });
// export const userAvailabilitySchema = z.object({
//   user_id: z.string().uuid(),
//   available_slots: z.array(
//     z.object({
//       day: z.number().min(0).max(6),
//       time_slots: z.array(
//         z.object({
//           start_time: z.string(),
//           end_time: z.string(),
//         }),
//       ),
//     }),
//   ),
//   created_at: z.string(),
//   updated_at: z.string(),
// });

// export const userAvailabilityInsertSchema = userAvailabilitySchema.omit({
//   created_at: true,
//   updated_at: true,
// });

// export const userAvailabilityUpdateSchema = userAvailabilitySchema
//   .partial()
//   .required({
//     user_id: true,
//   });

// export const emailTemplateSchema = z.object({
//   id: z.string().uuid(),
//   organization_id: z.string().uuid(),
//   title: z.string().min(2, {
//     message: "Must be minimum 2 characters",
//   }),
//   body: z.string().min(2, {
//     message: "Must be minimum 2 characters",
//   }),
//   subject: z.string().min(2, {
//     message: "Must be minimum 2 characters",
//   }),
//   created_at: z.string(),
//   updated_at: z.string(),
// });

// export const emailTemplateInsertSchema = emailTemplateSchema.omit({
//   id: true,
//   organization_id: true,
//   created_at: true,
//   updated_at: true,
// });

// export const emailTemplateUpdateSchema = emailTemplateSchema
//   .partial()
//   .required({
//     id: true,
//   });

// export const jobPostSchema = z.object({
//   benefits: z.array(z.string()).nullable(),
//   created_at: z.string(),
//   created_by: z.string().nullable(),
//   department_id: z.string().uuid(),
//   employment_type: z.nativeEnum(employmentTypeEnum),
//   experience_level: z.nativeEnum(experienceLevelEnum),
//   id: z.string(),
//   job_details: z.string().min(10, {
//     message: "Job details must be at least 10 characters",
//   }),
//   location: z.nativeEnum(jobLocationEnum),
//   organization_id: z.string().nullable(),
//   salary_range: z.string().nullable(),
//   screening_questions: z.array(z.string()).nullable(),
//   skills: z.array(z.string()).nullable(),

//   title: z.string().min(2, {
//     message: "Must be minimum 2 characters",
//   }),
//   updated_at: z.string(),
// });

// export const jobPostInsertSchema = jobPostSchema.omit({
//   id: true,
//   created_at: true,
//   updated_at: true,
//   organization_id: true,
//   created_by: true,
// });

// export const jobPostUpdateSchema = jobPostSchema.partial().required({
//   id: true,
// });

// export const jobPostCampaignSchema = z.object({
//   created_at: z.string(),
//   end_date: z.string().nullable(),
//   id: z.string(),
//   is_integration_enabled: z.boolean(),
//   job_id: z.string(),
//   organization_id: z.string(),
//   start_date: z.string(),
//   status: z.nativeEnum(jobPostCampaignStatusEnum),
//   updated_at: z.string(),
// });

// export const jobPostCampaignInsertSchema = jobPostCampaignSchema.omit({
//   id: true,
//   created_at: true,
//   updated_at: true,
//   organization_id: true,
// });

// export const jobPostCampaignUpdateSchema = jobPostCampaignSchema
//   .partial()
//   .required({
//     id: true,
//   });

// const socialLinkSchema = z.record(
//   z.string().min(2, {
//     message: "Must be minimum 2 characters",
//   }),
//   z
//     .string()
//     .regex(
//       /^(?:(?:www\.)?)?[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*(?:\/[@\w-]+)*$/,
//       "Please enter a valid domain with optional path (e.g., twitter.com/@username)",
//     ),
// );

// export const educationSchema = z.object({
//   school: z.string().min(2, {
//     message: "Must be minimum 2 characters",
//   }),
//   degree: z.string().min(2, {
//     message: "Must be minimum 2 characters",
//   }),
//   graduation_date: z.string().min(1, {
//     message: "Date is required",
//   }),
//   gpa: z.string().min(1, {
//     message: "GPA is required",
//   }),
// });

// export type Education = z.infer<typeof educationSchema>;

// const experienceSchema = z.object({
//   company: z.string().min(2, {
//     message: "Must be minimum 2 characters",
//   }),
//   position: z.string().min(2, {
//     message: "Must be minimum 2 characters",
//   }),
//   start_date: z.string().min(1, {
//     message: "Start date is required",
//   }),
//   end_date: z.string().nullable(),
//   description: z.string().min(2, {
//     message: "Must be minimum 2 characters",
//   }),
//   skills: z.array(z.string()),
// });

// export type Experience = z.infer<typeof experienceSchema>;

// export const candidateSchema = z.object({
//   id: z.string(),
//   organization_id: z.string().nullable(),
//   avatar_url: z.string().nullable(),
//   city: z.string().min(2, {
//     message: "Must be minimum 2 characters",
//   }),
//   country: z.string().min(2, {
//     message: "Must be minimum 2 characters",
//   }),
//   date_of_birth: z.string().min(1, {
//     message: "Date of birth is required",
//   }),
//   educations: z.array(educationSchema),
//   email: z.string().email(),
//   experiences: z.array(experienceSchema),
//   first_name: z.string().min(2, {
//     message: "Must be minimum 2 characters",
//   }),
//   gender: z.string().min(2, {
//     message: "Must be minimum 2 characters",
//   }),
//   last_name: z.string().min(2, {
//     message: "Must be minimum 2 characters",
//   }),
//   phone_number: z.string().refine(isValidPhoneNumber, {
//     message: "Invalid phone number",
//   }),
//   social_links: socialLinkSchema,
//   timezone: z.string().min(1, {
//     message: "Timezone is required",
//   }),
//   created_at: z.string().nullable(),
//   updated_at: z.string().nullable(),
// });

// export const candidateInsertSchema = candidateSchema.omit({
//   id: true,
//   created_at: true,
//   updated_at: true,
// });

// export const candidateUpdateSchema = candidateSchema.partial().required({
//   id: true,
// });

// const screeningQuestionAnswerSchema = z.object({
//   question: z.string(),
//   answer: z.string().min(2, {
//     message: "Answer is required",
//   }),
// });
// export const applicationSchema = z.object({
//   id: z.string(),
//   candidate_id: z.string(),
//   candidate_match: z.number().min(0).max(100),
//   department_id: z.string(),
//   job_id: z.string(),
//   organization_id: z.string(),
//   rejection_reason_id: z.string().nullable(),
//   screening_question_answers: z.array(screeningQuestionAnswerSchema).nullable(),
//   source: z.string().nullable(),
//   stage_id: z.string().nullable(),
//   created_at: z.string().nullable(),
//   updated_at: z.string().nullable(),
// });

// export const applicationInsertSchema = applicationSchema.omit({
//   id: true,
//   candidate_id: true,
//   stage_id: true,
//   created_at: true,
//   updated_at: true,
// });

// export const applicationUpdateSchema = applicationSchema.partial().required({
//   id: true,
// });

// export const attachmentSchema = z.object({
//   id: z.string(),
//   application_id: z.string(),
//   organization_id: z.string(),
//   attachment_type: z.nativeEnum(attachmentTypeEnum),
//   candidate_id: z.string(),
//   file_name: z.string().min(2, {
//     message: "Must be minimum 2 characters",
//   }),
//   file_path: z.string().min(2, {
//     message: "Must be minimum 2 characters",
//   }),
//   file_url: z.string().url(),
//   created_at: z.string().nullable(),
//   updated_at: z.string().nullable(),
// });

// export const attachmentInsertSchema = attachmentSchema.omit({
//   id: true,
//   organization_id: true,
//   candidate_id: true,
//   created_at: true,
//   updated_at: true,
// });

// export const attachmentUpdateSchema = attachmentSchema.partial().required({
//   id: true,
// });
