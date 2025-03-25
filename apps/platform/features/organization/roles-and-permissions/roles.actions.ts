"use server";

import { authActionClient } from "@/lib/safe-action";
import { createRole } from "@optima/supabase/mutations";
import { roleInsertSchema } from "@optima/supabase/validations";
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
