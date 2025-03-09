import { eq } from "drizzle-orm";
import type { z } from "zod";
import { db } from "../database";
import { DomainVerificationTable } from "../schema";
import type {
	domainVerificationInsertSchema,
	domainVerificationUpdateSchema,
} from "../validations";

type DomainVerificationInsert = z.infer<typeof domainVerificationInsertSchema>;
type DomainVerificationUpdate = z.infer<typeof domainVerificationUpdateSchema>;

export async function createDomainVerification(data: DomainVerificationInsert) {
	const [domainVerification] = await db
		.insert(DomainVerificationTable)
		.values(data)
		.returning();
	return domainVerification;
}

export async function updateDomainVerification(data: DomainVerificationUpdate) {
	const [domainVerification] = await db
		.update(DomainVerificationTable)
		.set(data)
		.where(eq(DomainVerificationTable.id, data.id))
		.returning();
	return domainVerification;
}
