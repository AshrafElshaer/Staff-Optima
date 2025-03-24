export const PERMISSIONS = {
	user: {
		add: "user:add",
		update: "user:update",
		delete: "user:delete",
		role: "user:role",
	},
	job: {
		create: "job:create",
		update: "job:update",
		status: "job:status",
		delete: "job:delete",
		publish: "job:publish",
	},
	candidate: {
		create: "candidate:create",
		update: "candidate:update",
		delete: "candidate:delete",
		notes: "candidate:notes",
		tags: "candidate:tags",
	},
	application: {
		status: "application:status",
		feedback: "application:feedback",
		stage: "application:stage",
	},
	interview: {
		schedule: "interview:schedule",
		update: "interview:update",
		cancel: "interview:cancel",
		feedback: "interview:feedback",
	},
	reports: {
		view: "reports:view",
		create: "reports:create",
	},
	analytics: {
		access: "analytics:access",
	},
	metrics: {
		view: "metrics:view",
	},
	settings: {
		workflow: "settings:workflow",
		template: "settings:template",
		organization: "settings:organization",
		integration: "settings:integration",
		roles: "settings:roles",
		departments: "settings:departments",
	},
} as const;

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
	"settings:organization",
	"settings:integration",
	"settings:roles",
	"settings:departments",
] as const;

export type Permission = (typeof PERMISSIONS_ARRAY)[number];
