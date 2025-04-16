"use server";

import { authActionClient } from "@/lib/safe-action";
import {
	createApplicationStage,
	deleteApplicationStage,
	reorderApplicationStages,
	updateApplicationStage,
} from "@optima/supabase/mutations";
import {
	applicationStageInsertSchema,
	applicationStageUpdateSchema,
} from "@optima/supabase/validations";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createApplicationStageAction = authActionClient
	.metadata({
		name: "createApplicationStage",
		track: {
			event: "create-application-stage",
			channel: "organization",
		},
	})
	.schema(applicationStageInsertSchema)
	.action(async ({ ctx, parsedInput }) => {
		const { user, supabase } = ctx;

		const { data, error } = await createApplicationStage(supabase, {
			...parsedInput,
			stage_order: Number(parsedInput.stage_order),
			company_id: user.user_metadata.company_id,
		});

		if (error) {
			throw new Error(error.message);
		}

		return data;
	});

export const updateApplicationStageAction = authActionClient
	.metadata({
		name: "updateApplicationStage",
		track: {
			event: "update-application-stage",
			channel: "organization",
		},
	})
	.schema(applicationStageUpdateSchema)
	.action(async ({ ctx, parsedInput }) => {
		const { supabase } = ctx;

		const { data, error } = await updateApplicationStage(supabase, {
			...parsedInput,
			stage_order: parsedInput.stage_order
				? Number(parsedInput.stage_order)
				: undefined,
		});

		if (error) {
			throw new Error(error.message);
		}

		return data;
	});

export const deleteApplicationStageAction = authActionClient
	.metadata({
		name: "deleteApplicationStage",
		track: {
			event: "delete-application-stage",
			channel: "organization",
		},
	})
	.schema(z.object({ id: z.string().uuid() }))
	.action(async ({ parsedInput, ctx }) => {
		const { supabase } = ctx;

		const data = await deleteApplicationStage(supabase, parsedInput.id);

		revalidatePath("/company/workflows");
		return data;
	});

export const reorderApplicationStagesAction = authActionClient
	.metadata({
		name: "reorderApplicationStages",
		track: {
			event: "reorder-application-stages",
			channel: "organization",
		},
	})
	.schema(
		z.object({
			sourceStageId: z.string().uuid(),
			targetStageId: z.string().uuid(),
		}),
	)
	.action(async ({ parsedInput, ctx }) => {
		const { supabase } = ctx;

		const data = await reorderApplicationStages(
			supabase,
			parsedInput.sourceStageId,
			parsedInput.targetStageId,
		);

		return data;
	});
