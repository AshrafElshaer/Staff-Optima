import { admin } from "better-auth/plugins";
import { createAccessControl } from "better-auth/plugins/access";
import { adminAc, defaultStatements } from "better-auth/plugins/admin/access";

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
	interview: ["create", "update", "delete"],
	interview_feedback: ["create", "update", "delete"],
	department: ["create", "update", "delete"],
	email_template: ["create", "update", "delete"],
	attachment: ["create", "update", "delete"],
	reject_reason: ["create", "update", "delete"],
	domain_verification: ["create", "update", "delete"],
	organization: ["create", "update", "delete"],
} as const;

const ac = createAccessControl(statement);

export const adminRole = ac.newRole({
	job_post: [
		"create",
		"update",
		"archive",
		"unarchive",
		"publish",
		"pause",
	] as const,
	job_post_campaign: [
		"create",
		"update",
		"archive",
		"publish",
		"pause",
	] as const,
	candidate: ["create", "update"] as const,
	application: ["create", "update", "reject", "hire"] as const,
	application_stage: ["create", "update"] as const,
	interview: ["create", "update"] as const,
	interview_feedback: ["create", "update"] as const,
	department: ["create", "update", "delete"] as const,
	email_template: ["create", "update", "delete"] as const,
	attachment: ["create", "update", "delete"] as const,
	reject_reason: ["create", "update", "delete"] as const,
	domain_verification: ["create", "update", "delete"] as const,
	user: [
		"ban",
		"create",
		"delete",
		"impersonate",
		"list",
		"set-password",
		"set-role",
	] as const,
	session: ["delete", "list", "revoke"] as const,
	organization: ["create", "update", "delete"] as const,
});

// Recruiter role with full job posting and candidate management permissions
export const recruiter = ac.newRole({
	job_post: [
		"create",
		"update",
		"archive",
		"unarchive",
		"publish",
		"pause",
	] as const,
	job_post_campaign: ["create", "update", "archive", "publish", "pause"],
	candidate: ["create", "update"],
	application: ["create", "update", "reject", "hire"],
	application_stage: ["create", "update"],
	interview: ["create", "update"],
	interview_feedback: ["create", "update"],
	email_template: ["create", "update"],
	attachment: ["create", "update"],
});

// Hiring Manager role with candidate review and job post request permissions
export const hiringManager = ac.newRole({
	job_post: ["update", "archive", "unarchive", "publish", "pause"],
	candidate: ["create", "update"],
	application: ["update", "reject", "hire"],
	application_stage: ["create", "update"],
	interview: ["create", "update"],
	interview_feedback: ["create", "update"],
});

// Interviewer role with limited candidate access permissions
export const interviewer = ac.newRole({
	candidate: ["update"],
	application: ["update"],
	interview: ["update"],
	interview_feedback: ["create", "update"],
});

export const adminPlugin = admin({
	defaultRole: "owner",
	adminRoles: ["owner", "admin"],
	ac: ac,
	roles: { admin: adminRole, recruiter, hiringManager, interviewer },
});
