"use server";
import crypto from "node:crypto";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import type { z } from "zod";
import { db } from "../database";
import {
	DomainVerificationTable,
	MembersTable,
	OrganizationTable,
} from "../schema";
import type {
	memberInsertSchema,
	memberUpdateSchema,
	organizationInsertSchema,
	organizationUpdateSchema,
} from "../validations";
type OrganizationInsert = z.infer<typeof organizationInsertSchema> & {
	adminId: string;
};
type OrganizationUpdate = z.infer<typeof organizationUpdateSchema>;

type OrganizationMemberInsert = z.infer<typeof memberInsertSchema>;
type OrganizationMemberUpdate = z.infer<typeof memberUpdateSchema>;

export async function createOrganization(data: OrganizationInsert) {
	const [organization] = await db
		.insert(OrganizationTable)
		.values(data)
		.returning();
	revalidateTag("organization");
	return organization;
}

export async function updateOrganization(data: OrganizationUpdate) {
	const { id, createdAt, ...updateData } = data;
	if (updateData.domain) {
		const verificationToken = crypto.randomBytes(16).toString("hex");
		await db
			.update(DomainVerificationTable)
			.set({
				domain: updateData.domain,
				verificationToken: verificationToken,
				verificationStatus: "pending",
				verificationDate: null,
			})
			.where(eq(DomainVerificationTable.organizationId, id));

		updateData.isDomainVerified = false;
	}
	const [organization] = await db
		.update(OrganizationTable)
		.set(updateData)
		.where(eq(OrganizationTable.id, id))
		.returning();
	revalidateTag("organization");
	return organization;
}

export async function deleteOrganization(id: string) {
	const [organization] = await db
		.delete(OrganizationTable)
		.where(eq(OrganizationTable.id, id))
		.returning();
	revalidateTag("organization");
	return organization;
}

export async function createOrganizationMember(data: OrganizationMemberInsert) {
	const [member] = await db.insert(MembersTable).values(data).returning();
	return member;
}

export async function updateOrganizationMember(data: OrganizationMemberUpdate) {
	const { id, createdAt, ...updateData } = data;

	const [member] = await db
		.update(MembersTable)
		.set(updateData)
		.where(eq(MembersTable.id, id))
		.returning();

	return member;
}

export async function deleteOrganizationMember(id: string) {
	const [member] = await db
		.delete(MembersTable)
		.where(eq(MembersTable.id, id))
		.returning();
	return member;
}
