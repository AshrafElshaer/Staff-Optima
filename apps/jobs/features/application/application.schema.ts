import { type JobPost, attachmentTypeEnum } from "@optima/supabase/types";
import moment from "moment";
import { z } from "zod";
import { zfd } from "zod-form-data";

import {
	applicationInsertSchema,
	candidateEducationInsertSchema,
	candidateExperienceInsertSchema,
	candidateInsertSchema,
	candidateSocialLinkInsertSchema,
} from "@optima/supabase/validations";

export const formSchema = z.object({
	candidate: candidateInsertSchema,
	education: z.array(candidateEducationInsertSchema),
	experience: z.array(candidateExperienceInsertSchema),
	social_links: z.array(candidateSocialLinkInsertSchema),
	application: applicationInsertSchema,
	attachments: z.array(
		z.object({
			fileType: z.nativeEnum(attachmentTypeEnum),
			file: zfd.file(),
		}),
	),
});

export function getDefaultValues(job: JobPost): z.infer<typeof formSchema> {
	return {
		candidate: {
			company_id: job.company_id,
			avatar_url: "",
			first_name: "",
			last_name: "",
			email: "",
			phone_number: "",
			country: "",
			city: "",
			gender: "",
			date_of_birth: moment().subtract(16, "years").toISOString(),
			timezone: "",
		},
		education: [
			{
				candidate_id: "",
				company_id: job.company_id,
				degree: "",
				end_date: "",
				grade: "",
				field_of_study: "",
				institution: "",
				start_date: "",
			},
		],
		experience: [
			{
				candidate_id: "",
				company: "",
				company_id: job.company_id,
				description: "",
				end_date: null,
				start_date: "",
				job_title: "",
				skills: [""],
			},
		],
		social_links: [
			{
				candidate_id: "",
				company_id: job.company_id,
				url: "",
				platform: "linkedin",
			},
		],
		application: {
			candidate_id: "",
			company_id: job.company_id,
			screening_question_answers:
				job.screening_questions?.map((question) => ({
					type: question.type,
					question: question.question,
					answer: question.type === "multiple-choice" ? [] : "",
					is_required: question.is_required,
				})) ?? [],
			source: "website",
			candidate_match: 0,
			job_id: job.id,
			department_id: job.department_id ?? "",
			reject_reason_id: null,
			status: "applied",
			stage_id: null,
		},
		attachments: [],
	};
}
