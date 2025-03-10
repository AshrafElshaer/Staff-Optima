"use server";
import { eq } from "drizzle-orm";
import { db } from "../database";
import { MembersTable, OrganizationTable } from "../schema";
import type { Organization } from "../types";

export async function getUserOrganization(
	userId: string,
): Promise<Organization | null> {
	const [query] = await db
		.select({
			organization: OrganizationTable,
		})
		.from(MembersTable)
		.where(eq(MembersTable.userId, userId))
		.leftJoin(
			OrganizationTable,
			eq(MembersTable.organizationId, OrganizationTable.id),
		)
		.limit(1);

	return query?.organization ?? null;
}

export async function getOrganizationById(id: string) {
	const [organization] = await db
		.select()
		.from(OrganizationTable)
		.where(eq(OrganizationTable.id, id));
	return organization;
}

export async function getOrganizationByDomain(domain: string) {
	const [organization] = await db
		.select()
		.from(OrganizationTable)
		.where(eq(OrganizationTable.domain, domain));
	return organization;
}
