"use server";
import { authActionClient } from "@/lib/safe-action";
import { createDepartment } from "@optima/database/mutations";
import {
	departmentInsertSchema,
	departmentUpdateSchema,
} from "@optima/database/validations";
import { revalidatePath, revalidateTag } from "next/cache";
export const createDepartmentAction = authActionClient
	.metadata({
		name: "create-department",
		track: {
			event: "create-department",
			channel: "department",
		},
	})
	.schema(departmentInsertSchema)
	.action(async ({ parsedInput }) => {
		const department = await createDepartment(parsedInput);
		revalidatePath("/organization/departments");
		revalidateTag("departments");
		return department;
	});
