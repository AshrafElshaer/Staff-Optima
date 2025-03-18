"use server";

import { eq } from "drizzle-orm";
import type { z } from "zod";
import { db } from "../database";
import { DepartmentsTable } from "../schema";
import type {
	departmentInsertSchema,
	departmentUpdateSchema,
} from "../validations";

type DepartmentInsert = z.infer<typeof departmentInsertSchema>;
type DepartmentUpdate = z.infer<typeof departmentUpdateSchema>;

export async function createDepartment(department: DepartmentInsert) {
	const [data] = await db
		.insert(DepartmentsTable)
		.values(department)
		.returning();
	return data;
}

export async function updateDepartment(department: DepartmentUpdate) {
	if (!department.id) {
		throw new Error("Department ID is required");
	}

	const [data] = await db
		.update(DepartmentsTable)
		.set(department)
		.where(eq(DepartmentsTable.id, department.id))
		.returning();
	return data;
}
