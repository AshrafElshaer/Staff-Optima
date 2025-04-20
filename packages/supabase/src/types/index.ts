import type { SupabaseClient } from "@supabase/supabase-js";
import type z from "zod";
import type { Database, Enums, Tables } from "./database";
import type { screeningQuestionSchema } from "./validations";
export * from "./database";

export type SupabaseInstance = SupabaseClient<Database>;

// export type UserAccessRole = Enums<"user_role_enum">;
export type DomainVerificationStatus = Enums<"domain_verification_status_enum">;
export type ApplicationStageTriggerCondition =
	Enums<"application_stage_trigger_condition">;

export type WorkMode = Enums<"work_mode_enum">;
export type ExperienceLevel = Enums<"experience_level_enum">;
export type EmploymentType = Enums<"employment_type_enum">;
export type JobPostStatus = Enums<"job_post_status_enum">;
// export type InterviewStatus = Enums<"interview_status_enum">;
// export type AttachmentType = Enums<"attachment_type_enum">;
// export type JobPostCampaignStatus = Enums<"job_post_campaign_status_enum">;

export const domainVerificationStatusEnum: {
	[key in DomainVerificationStatus]: key;
} = {
	pending: "pending",
	verified: "verified",
	failed: "failed",
};

export const applicationStageTriggerConditionEnum: {
	[key in ApplicationStageTriggerCondition]: key;
} = {
	on_start: "on_start",
	on_complete: "on_complete",
};

export const workModeEnum: {
	[key in WorkMode]: key;
} = {
	remote: "remote",
	on_site: "on_site",
	hybrid: "hybrid",
};

export const jobPostStatusEnum: {
	[key in JobPostStatus]: key;
} = {
	draft: "draft",
	active: "active",
	archived: "archived",
};

// export const jobPostCampaignStatusEnum: {
//   [key in JobPostCampaignStatus]: key;
// } = {
//   active: "active",
//   scheduled: "scheduled",
//   completed: "completed",
//   paused: "paused",
//   draft: "draft",
//   archived: "archived",
// };

export const experienceLevelEnum: {
	[key in ExperienceLevel]: key;
} = {
	junior: "junior",
	mid: "mid",
	senior: "senior",
	lead: "lead",
	executive: "executive",
};

export const employmentTypeEnum: {
	[key in EmploymentType]: key;
} = {
	full_time: "full_time",
	part_time: "part_time",
	contract: "contract",
	internship: "internship",
};

// export const attachmentTypeEnum: {
//   [key in AttachmentType]: key;
// } = {
//   resume: "resume",
//   cover_letter: "cover_letter",
//   portfolio: "portfolio",
//   certificate: "certificate",
//   reference_letter: "reference_letter",
//   other: "other",
//   transcript: "transcript",
//   work_sample: "work_sample",
//   professional_license: "professional_license",
// };

export type User = Tables<"users">;
export type Company = Tables<"companies">;
export type AccessRole = Tables<"roles">;
export type Department = Tables<"departments">;
export type UserRole = Tables<"user_roles">;
export type ApplicationStage = Tables<"application_stages">;
export type ApplicationStageTrigger = Tables<"application_stage_triggers">;
// export type EmailTemplate = Tables<"email_templates">;
export interface JobPost extends Tables<"job_posts"> {
	screening_questions: z.infer<typeof screeningQuestionSchema>[];
}
// export type Candidate = Tables<"candidates">;
// export type Application = Tables<"applications">;
export type DomainVerification = Tables<"domain_verification">;
// export type JobPostCampaign = Tables<"job_posts_campaigns">;
export type UserPreferences = Tables<"user_preferences">;
// export type UserAvailability = Omit<
//   Tables<"user_availability">,
//   "available_slots"
// > & {
//   available_slots: {
//     day: number;
//     time_slots: TimeSlot[];
//   }[];
// };
export type TimeSlot = {
	start_time: string;
	end_time: string;
};

// export interface ApplicationWithJobPost extends Application {
//   job_posts: {
//     id: string;
//     title: string;
//   };
// }

// export type CandidateWithApplication = Candidate & {
//   applications: ApplicationWithJobPost[];
// };
