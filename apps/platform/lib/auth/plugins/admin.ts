import { admin } from "better-auth/plugins";
import { createAccessControl } from "better-auth/plugins/access";
import {
	adminAc,
	defaultStatements,
} from "better-auth/plugins/organization/access";

/**
 * make sure to use `as const` so typescript can infer the type correctly
 */
const statement = {
	...defaultStatements,
	job_post: ["create", "update", "archive", "unarchive", "publish", "pause"],
	job_post_campaign: ["create", "update", "archive", "publish", "pause"],
	candidate: ["create", "update", "delete"],
	application: ["create", "update", "reject", "hire"],
	application_stage: ["create", "update", "delete"],
	application_stage_trigger: ["create", "update", "delete"],
	interview: ["create", "update", "delete"],
	interview_feedback: ["create", "update", "delete"],
	department: ["create", "update", "delete"],
	email_template: ["create", "update", "delete"],
	attachment: ["create", "update", "delete"],
	reject_reason: ["create", "update", "delete"],
	domain_verification: ["create", "update", "delete"],
	user_preference: ["create", "update"],
	user_availability: ["create", "update", "delete"],
} as const;

const ac = createAccessControl(statement);

// Recruiter role with full job posting and candidate management permissions
// export const recruiter = ac.newRole({
// 	job_post: ["create", "update", "archive", "unarchive"],
// });

// // Hiring Manager role with candidate review and job post request permissions
// export const hiringManager = ac.newRole({
// 	job_post: ["update", "archive", "unarchive"],
// 	candidate: ["update", "reject", "hire"],
// });

// // Interviewer role with limited candidate access permissions
// export const interviewer = ac.newRole({
// 	candidate: ["update"], // For providing interview feedback
// 	interview: ["create", "update", "delete"],
// });

export const adminPlugin = admin({
	defaultRole: "owner",
	adminRoles: ["owner", "admin"],

	// ac: ac,
	// roles: { recruiter, hiringManager, interviewer },
});
