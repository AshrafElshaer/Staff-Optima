import { eq } from "drizzle-orm";
import type { z } from "zod";
import { db } from "../database";
import { user } from "../schema";
import { userInsertSchema, type userUpdateSchema } from "../validations";

type InsertUser = typeof user.$inferInsert;
type UpdateUser = z.infer<typeof userUpdateSchema>;

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
