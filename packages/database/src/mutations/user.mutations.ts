import { eq } from "drizzle-orm";
import type { z } from "zod";
import { db } from "../database";
import { UserRolesTable, user } from "../schema";
import type {
	userRoleInsertSchema,
	userRoleUpdateSchema,
	userUpdateSchema,
} from "../validations";

type InsertUser = typeof user.$inferInsert;
type UpdateUser = z.infer<typeof userUpdateSchema>;

type InsertUserRole = typeof UserRolesTable.$inferInsert;
type UpdateUserRole = z.infer<typeof userRoleUpdateSchema>;

export const createUser = async (data: InsertUser) => {
	const [newUser] = await db.insert(user).values(data).returning();
	return newUser;
};

export const updateUser = async (id: string, data: UpdateUser) => {
	const [updatedUser] = await db
		.update(user)
		.set(data)
		.where(eq(user.id, id))
		.returning();
	return updatedUser;
};

export const deleteUser = async (id: string) => {
	const [deletedUser] = await db
		.delete(user)
		.where(eq(user.id, id))
		.returning();
	return deletedUser;
};

export const createUserRole = async (data: InsertUserRole) => {
	const [newUserRole] = await db
		.insert(UserRolesTable)
		.values(data)
		.returning();
	return newUserRole;
};

export const updateUserRole = async (data: UpdateUserRole) => {
	if (!data.userId) {
		throw new Error("User ID is required");
	}
	const [updatedUserRole] = await db
		.update(UserRolesTable)
		.set(data)
		.where(eq(UserRolesTable.userId, data.userId))
		.returning();
	return updatedUserRole;
};

export const deleteUserRole = async (userId: string) => {
	const [deletedUserRole] = await db
		.delete(UserRolesTable)
		.where(eq(UserRolesTable.userId, userId))
		.returning();
	return deletedUserRole;
};
