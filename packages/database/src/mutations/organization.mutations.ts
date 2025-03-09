import { eq } from "drizzle-orm";
import type { z } from "zod";
import { db } from "../database";
import { OrganizationTable } from "../schema";
import type {
	organizationInsertSchema,
	organizationUpdateSchema,
} from "../validations";
type OrganizationInsert = z.infer<typeof organizationInsertSchema> & {
	adminId: string;
};
type OrganizationUpdate = z.infer<typeof organizationUpdateSchema>;

export async function createOrganization(data: OrganizationInsert) {
	const [organization] = await db
		.insert(OrganizationTable)
		.values(data)
		.returning();
	return organization;
}

export async function updateOrganization(data: OrganizationUpdate) {
	const { id, createdAt, ...updateData } = data;
	const [organization] = await db
		.update(OrganizationTable)
		.set(updateData)
		.where(eq(OrganizationTable.id, id))
		.returning();
	return organization;
}

export async function deleteOrganization(id: string) {
	const [organization] = await db
		.delete(OrganizationTable)
		.where(eq(OrganizationTable.id, id))
		.returning();
	return organization;
}
