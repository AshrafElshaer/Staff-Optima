"use server";

import { eq } from "drizzle-orm";
import { db } from "../database";
import { RolesTable, UserRolesTable, user } from "../schema";

export async function getUserByEmail(email: string) {
	const data = await db.query.user.findFirst({
		where: eq(user.email, email),
	});
	return data;
}

export async function getUserById(id: string) {
	const data = await db.query.user.findFirst({
		where: eq(user.id, id),
	});
	return data;
}

export async function getUserRole(userId: string) {
	const [data] = await db
		.select({
			role: RolesTable,
		})
		.from(UserRolesTable)
		.where(eq(UserRolesTable.userId, userId))
		.innerJoin(RolesTable, eq(UserRolesTable.roleId, RolesTable.id));
	return data?.role;
}
