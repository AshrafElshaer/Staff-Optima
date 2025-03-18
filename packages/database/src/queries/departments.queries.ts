"use server";
import { and, eq, ilike, like } from "drizzle-orm";
import { unstable_cacheTag as cacheTag } from "next/cache";
import { db } from "../database";
import { DepartmentsTable, MembersTable } from "../schema";

export async function getDepartmentsByUserId(
	userId: string,
	filters?: { name?: string },
) {
	"use cache";
	const conditions = [eq(MembersTable.userId, userId)];
	if (filters?.name) {
		conditions.push(ilike(DepartmentsTable.name, `%${filters.name}%`));
	}

	const query = await db
		.select({
			id: DepartmentsTable.id,
			name: DepartmentsTable.name,
			description: DepartmentsTable.description,
			headUserId: DepartmentsTable.headUserId,
			createdAt: DepartmentsTable.createdAt,
			updatedAt: DepartmentsTable.updatedAt,
			organizationId: DepartmentsTable.organizationId,
		})
		.from(DepartmentsTable)
		.innerJoin(
			MembersTable,
			and(
				eq(MembersTable.organizationId, DepartmentsTable.organizationId),
				eq(MembersTable.userId, userId),
			),
		)
		.where(and(...conditions));

	cacheTag("departments", userId);

	return  query;
}

export async function getDepartmentsByOrganizationId(
	organizationId: string,
	filters?: { name?: string },
) {
	"use cache";
	const conditions = [eq(MembersTable.organizationId, organizationId)];
	if (filters?.name) {
		conditions.push(ilike(DepartmentsTable.name, `%${filters.name}%`));
	}

	const query = await db
		.select()
		.from(DepartmentsTable)
		.innerJoin(
			MembersTable,
			eq(MembersTable.organizationId, DepartmentsTable.organizationId),
		)
		.where(and(...conditions));

	cacheTag("departments", organizationId);

	return await query;
}

export async function getDepartmentById(id: string) {
	"use cache";
	const [data] = await db
		.select()
		.from(DepartmentsTable)
		.where(eq(DepartmentsTable.id, id));

	cacheTag("department", id);

	return data;
}
