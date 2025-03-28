"use server";

import { authActionClient } from "@/lib/safe-action";
import {
	createRole,
	deleteRole,
	updateBulkRoles,
	updateRole,
} from "@optima/supabase/mutations";
import {
	roleInsertSchema,
	roleSchema,
	roleUpdateSchema,
} from "@optima/supabase/validations";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createRoleAction = authActionClient
	.metadata({
		name: "create-role",
		track: {
			event: "create-role",
			channel: "organization",
		},
	})
	.schema(roleInsertSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { supabase, user } = ctx;
		const { data, error } = await createRole(supabase, {
			...parsedInput,
			organization_id: user.user_metadata.organization_id,
		});

		if (error) {
			throw new Error(error.message);
		}
		revalidatePath("organization/access-control");
		return data;
	});

export const updateBulkRolesAction = authActionClient
	.metadata({
		name: "update-bulk-roles",
		track: {
			event: "update-bulk-roles",
			channel: "organization",
		},
	})
	.schema(z.array(roleSchema))
	.action(async ({ parsedInput, ctx }) => {
		const { supabase, user } = ctx;
		const { data, error } = await updateBulkRoles(supabase, parsedInput);

		if (error) {
			throw new Error(error.message);
		}
		revalidatePath("organization/access-control");
		return data;
	});

export const updateRoleAction = authActionClient
	.metadata({
		name: "update-role",
		track: {
			event: "update-role",
			channel: "organization",
		},
	})
	.schema(roleUpdateSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { supabase } = ctx;
		const { data, error } = await updateRole(supabase, parsedInput);

		if (error) {
			throw new Error(error.message);
		}
		revalidatePath("organization/access-control");
		return data;
	});

export const deleteRoleActions = authActionClient
.metadata({
	name: "update-role",
	track: {
		event: "update-role",
		channel: "organization",
	},
})
.schema(z.object({
	roleId:z.string().uuid()
}))
.action(async ({ parsedInput, ctx }) => {
	const { supabase } = ctx;
	const { data, error } = await deleteRole(supabase, parsedInput.roleId);

	if (error) {
		throw new Error(error.message);
	}
	revalidatePath("organization/access-control");
	return data;
});
