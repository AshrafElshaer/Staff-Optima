"use server";
import { authActionClient } from "@/lib/safe-action";
import { createDepartment } from "@optima/supabase/mutations";
import {
	departmentInsertSchema,
	departmentUpdateSchema,
} from "@optima/supabase/validations";
import { revalidatePath, revalidateTag } from "next/cache";

export const createDepartmentAction = authActionClient
	.metadata({
		name: "createDepartment",
		track: {
			event: "create-department",
			channel: "organization",
		},
	})
	.schema(departmentInsertSchema)
	.action(async ({ ctx, parsedInput }) => {
		const { user, supabase } = ctx;

		const payload = {
			...parsedInput,
			company_id: user.user_metadata.company_id,
		};

		const { data, error } = await createDepartment(supabase, payload);

		if (error) {
			throw new Error(error.message);
		}

		revalidatePath("/company/departments");
		revalidateTag("departments");

		return data;
	});
