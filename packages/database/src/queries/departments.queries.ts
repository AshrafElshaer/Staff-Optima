"use server";
import { and, eq, like, ilike } from "drizzle-orm";
import { db } from "../database";
import { DepartmentsTable } from "../schema";

export async function getDepartments(
	organizationId: string,
	filters?: {
		name?: string;
	},
) {
	const conditions = [eq(DepartmentsTable.organizationId, organizationId)];

	if (filters?.name) {
		conditions.push(ilike(DepartmentsTable.name, `%${filters.name}%`));
	}

	return await db
		.select()
		.from(DepartmentsTable)
		.where(and(...conditions));
}

export async function getDepartmentById(id: string) {
	const [data] = await db
		.select()
		.from(DepartmentsTable)
		.where(eq(DepartmentsTable.id, id));

	return data;
}
