import type {
	DomainVerificationTable,
	MembersTable,
	OrganizationTable,
	user,
} from "./schema";

export type User = typeof user.$inferSelect;
export type Organization = typeof OrganizationTable.$inferSelect;
export type OrganizationMember = typeof MembersTable.$inferSelect;
export type DomainVerification = typeof DomainVerificationTable.$inferSelect;
