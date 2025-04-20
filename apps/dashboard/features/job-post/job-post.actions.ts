"use server";
import { authActionClient } from "@/lib/safe-action";
import { createJobPost, updateJobPost } from "@optima/supabase/mutations";
import {
	jobPostInsertSchema,
	jobPostUpdateSchema,
} from "@optima/supabase/validations";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export const createJobPostAction = authActionClient
	.metadata({
		name: "job-post/create",
	})
	.schema(jobPostInsertSchema.omit({ company_id: true }))
	.action(async ({ ctx, parsedInput }) => {
		const { data, error } = await createJobPost(ctx.supabase, {
			...parsedInput,
			company_id: ctx.user.user_metadata.company_id,
			created_by: ctx.user.id,
		});
		if (error) {
			throw new Error(error.message);
		}

		revalidatePath("/jobs");
		redirect(`/jobs/${data.id}`);
	});

export const updateJobPostAction = authActionClient
	.metadata({
		name: "job-post/update",
	})
	.schema(jobPostUpdateSchema)
	.action(async ({ ctx, parsedInput }) => {
		const { data, error } = await updateJobPost(ctx.supabase, {
			...parsedInput,
			updated_at: new Date().toISOString(),
		});
		if (error) {
			throw new Error(error.message);
		}

		revalidatePath("/jobs");
		redirect(`/jobs/${data.id}`);
		return data;
	});
