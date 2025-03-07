import type {
	// OrganizationMemberTable,
	// OrganizationTable,
	UserTable,
} from "./schema";

export type User = typeof UserTable.$inferSelect;
// export type Organization = typeof OrganizationTable.$inferSelect;
// export type OrganizationMember = typeof OrganizationMemberTable.$inferSelect;
