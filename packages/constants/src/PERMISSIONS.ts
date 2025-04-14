export const PERMISSIONS = [
	{
		category: "User Management",
		key: "user",
		permissions: [
			{ value: "user:add", label: "Invite Team Members" },
			{ value: "user:update", label: "Manage Team Members" },
			{ value: "user:delete", label: "Remove Team Members" },
			{ value: "user:role", label: "Manage User Roles" },
		],
	},
	{
		category: "Job Management",
		key: "job",
		permissions: [
			{ value: "job:create", label: "Create Job Postings" },
			{ value: "job:update", label: "Edit Job Postings" },
			{ value: "job:status", label: "Change Job Status" },
			{ value: "job:delete", label: "Delete Job Postings" },
			{ value: "job:publish", label: "Publish Job Postings" },
		],
	},
	{
		category: "Candidate Management",
		key: "candidate",
		permissions: [
			{ value: "candidate:create", label: "Add Candidates" },
			{ value: "candidate:update", label: "Edit Candidate Info" },
			{ value: "candidate:delete", label: "Remove Candidates" },
			{ value: "candidate:notes", label: "Manage Candidate Notes" },
			{ value: "candidate:tags", label: "Assign Candidate Tags" },
		],
	},
	{
		category: "Application Management",
		key: "application",
		permissions: [
			{ value: "application:status", label: "Update Application Status" },
			{ value: "application:feedback", label: "Provide Application Feedback" },
			{ value: "application:stage", label: "Move Application Stages" },
		],
	},
	{
		category: "Interview Management",
		key: "interview",
		permissions: [
			{ value: "interview:schedule", label: "Schedule Interviews" },
			{ value: "interview:update", label: "Modify Interview Details" },
			{ value: "interview:cancel", label: "Cancel Interviews" },
			{ value: "interview:feedback", label: "Submit Interview Feedback" },
		],
	},
	// {
	// 	category: "Reports & Analytics",
	// 	key: "reports",
	// 	permissions: [
	// 		{ value: "reports:view", label: "View Reports" },
	// 		{ value: "reports:create", label: "Generate Reports" },
	// 	],
	// },
	// {
	// 	category: "Analytics & Metrics",
	// 	key: "analytics",
	// 	permissions: [
	// 		{ value: "analytics:access", label: "Access Analytics" },
	// 	],
	// },
	// {
	// 	category: "Metrics",
	// 	key: "metrics",
	// 	permissions: [
	// 		{ value: "metrics:view", label: "View Metrics" },
	// 	],
	// },
	{
		category: "Settings",
		key: "settings",
		permissions: [
			{ value: "settings:workflow", label: "Manage Interviews Workflows" },
			{ value: "settings:template", label: "Edit Email Templates" },
			{
				value: "settings:company",
				label: "Configure Company Settings",
			},
			{ value: "settings:integration", label: "Manage Integrations" },
			{ value: "settings:roles", label: "Define Company Roles" },
			{ value: "settings:departments", label: "Manage Departments" },
		],
	},
] as const;

export const PERMISSIONS_ARRAY = [
	// User Management
	"user:add",
	"user:update",
	"user:delete",
	"user:role",

	// Job Posts
	"job:create",
	"job:update",
	"job:status",
	"job:delete",
	"job:publish",

	// Candidates
	"candidate:create",
	"candidate:update",
	"candidate:delete",
	"candidate:notes",
	"candidate:tags",

	// Applications
	"application:status",
	"application:feedback",
	"application:stage",

	// Interviews
	"interview:schedule",
	"interview:update",
	"interview:cancel",
	"interview:feedback",

	// Reports & Analytics
	// "reports:view",
	// "reports:create",
	// "analytics:access",
	// "metrics:view",

	// Settings
	"settings:workflow",
	"settings:template",
	"settings:company",
	"settings:integration",
	"settings:roles",
	"settings:departments",
] as const;

export type Permission = (typeof PERMISSIONS_ARRAY)[number];
