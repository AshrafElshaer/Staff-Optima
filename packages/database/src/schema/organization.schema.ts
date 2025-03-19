import { relations } from "drizzle-orm";
import {
	boolean,
	index,
	pgTable,
	text,
	timestamp,
	uniqueIndex,
	uuid,
} from "drizzle-orm/pg-core";
import { user } from "./auth.schema";

export const OrganizationTable = pgTable(
	"organizations",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		name: text("name").notNull(),
		logo: text("logo"),
		domain: text("domain").notNull().unique(),
		adminId: uuid("admin_id")
			.notNull()
			.references(() => user.id, {
				onDelete: "cascade",
			}),
		industry: text("industry").notNull(),
		profile: text("profile"),
		address1: text("address_1"),
		address2: text("address_2"),
		city: text("city"),
		state: text("state"),
		zipCode: text("zip_code"),
		country: text("country").notNull(),
		timezone: text("timezone").notNull(),
		taxId: text("tax_id"),
		employeeCount: text("employee_count"),
		createdAt: timestamp("created_at", { withTimezone: true })
			.notNull()
			.defaultNow(),
		updatedAt: timestamp("updated_at", { withTimezone: true })
			.notNull()
			.defaultNow(),
		isDomainVerified: boolean("is_domain_verified").notNull().default(false),
	},
	(t) => ({
		uniqueDomain: uniqueIndex("unique_domain").on(t.domain),
		id: index("organization_idx").on(t.id),
	}),
);

export const MembersTable = pgTable(
	"members",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		organizationId: uuid("organization_id").references(
			() => OrganizationTable.id,
			{ onDelete: "cascade" },
		),
		userId: uuid("user_id").references(() => user.id, {
			onDelete: "cascade",
		}),
		createdAt: timestamp("created_at", { withTimezone: true })
			.notNull()
			.defaultNow(),
		updatedAt: timestamp("updated_at", { withTimezone: true })
			.notNull()
			.defaultNow(),
	},
	(table) => ({
		userIdOrganizationIdx: index("user_id_organization_idx").on(
			table.userId,
			table.organizationId,
		),
	}),
);

export const DomainVerificationTable = pgTable(
	"domain_verification",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		organizationId: uuid("organization_id")
			.notNull()
			.references(() => OrganizationTable.id, { onDelete: "cascade" }),
		domain: text("domain").notNull(),
		verificationToken: text("verification_token").notNull(),
		verificationStatus: text("verification_status", {
			enum: ["pending", "verified", "failed"],
		})
			.notNull()
			.default("pending"),
		verificationDate: timestamp("verification_date", { withTimezone: true }),
		createdAt: timestamp("created_at", { withTimezone: true })
			.notNull()
			.defaultNow(),
		updatedAt: timestamp("updated_at", { withTimezone: true })
			.notNull()
			.defaultNow(),
	},
	(table) => ({
		organizationIdDomainIdx: index("organization_id_domain_idx").on(
			table.organizationId,
			table.domain,
		),
	}),
);

export const DepartmentsTable = pgTable(
	"departments",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		name: text("name").notNull(),
		description: text("description"),
		organizationId: uuid("organization_id").references(
			() => OrganizationTable.id,
			{ onDelete: "cascade" },
		),
		headUserId: uuid("head_user_id").references(() => user.id, {
			onDelete: "set null",
		}),
		createdAt: timestamp("created_at", { withTimezone: true })
			.notNull()
			.defaultNow(),
		updatedAt: timestamp("updated_at", { withTimezone: true })
			.notNull()
			.defaultNow(),
	},
	(table) => ({
		organizationIdIdx: index("organization_id_idx").on(table.organizationId),
	}),
);

export const RolesTable = pgTable("roles", {
	id: uuid("id").primaryKey().defaultRandom(),
	name: text("name").notNull(),
	permissions: text("permissions").array(),
	organizationId: uuid("organization_id").references(
		() => OrganizationTable.id,
		{ onDelete: "cascade" },
	),
	createdAt: timestamp("created_at", { withTimezone: true })
		.notNull()
		.defaultNow(),
	updatedAt: timestamp("updated_at", { withTimezone: true })
		.notNull()
		.defaultNow(),
});

export const OrganizationRelations = relations(
	OrganizationTable,
	({ many, one }) => ({
		admin: one(user, {
			fields: [OrganizationTable.adminId],
			references: [user.id],
		}),
		departments: many(DepartmentsTable),
		members: many(MembersTable),
		domainVerification: one(DomainVerificationTable, {
			fields: [OrganizationTable.id],
			references: [DomainVerificationTable.organizationId],
		}),
		roles: many(RolesTable),
	}),
);

export const DomainVerificationRelations = relations(
	DomainVerificationTable,
	({ one }) => ({
		organization: one(OrganizationTable, {
			fields: [DomainVerificationTable.organizationId],
			references: [OrganizationTable.id],
		}),
	}),
);

export const DepartmentsRelations = relations(DepartmentsTable, ({ one }) => ({
	organization: one(OrganizationTable, {
		fields: [DepartmentsTable.organizationId],
		references: [OrganizationTable.id],
	}),
	headUser: one(user, {
		fields: [DepartmentsTable.headUserId],
		references: [user.id],
	}),
}));

export const MembersRelations = relations(MembersTable, ({ one }) => ({
	organization: one(OrganizationTable, {
		fields: [MembersTable.organizationId],
		references: [OrganizationTable.id],
	}),
	user: one(user, {
		fields: [MembersTable.userId],
		references: [user.id],
	}),
}));
