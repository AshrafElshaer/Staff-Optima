import type { SupabaseInstance, TablesInsert, TablesUpdate } from "../types";

type InsertApplicationStage = TablesInsert<"application_stages">;
type UpdateApplicationStage = TablesUpdate<"application_stages">;

export async function createApplicationStage(
	supabase: SupabaseInstance,
	applicationStage: InsertApplicationStage,
) {
	return await supabase
		.from("application_stages")
		.insert(applicationStage)
		.select()
		.single();
}

export async function updateApplicationStage(
	supabase: SupabaseInstance,
	applicationStage: UpdateApplicationStage,
) {
	if (!applicationStage.id) {
		throw new Error("Application stage ID is required");
	}

	const { id, ...updateData } = applicationStage;

	return await supabase
		.from("application_stages")
		.update(updateData)
		.eq("id", id)
		.select()
		.single();
}

export async function deleteApplicationStage(
	supabase: SupabaseInstance,
	applicationStageId: string,
) {
	const { data: deletedStage, error } = await supabase
		.from("application_stages")
		.delete()
		.eq("id", applicationStageId);

	if (error) {
		throw new Error(error.message);
	}

	const { data: remainingStages, error: remainingStagesError } = await supabase
		.from("application_stages")
		.select("*")
		.order("stage_order", { ascending: true });

	if (remainingStagesError) {
		throw new Error(remainingStagesError.message);
	}

	// Update stage orders sequentially
	const updates = remainingStages.map((stage, index) => ({
		...stage,
		stage_order: index + 1,
	}));

	if (updates.length > 0) {
		const { error: updateError } = await supabase
			.from("application_stages")
			.upsert(updates);

		if (updateError) {
			throw new Error(updateError.message);
		}
	}

	return remainingStages;
}

export async function reorderApplicationStages(
	supabase: SupabaseInstance,
	sourceStageId: string,
	targetStageId: string,
) {
	// First fetch both stages to get their current orders
	const { data: stages, error: fetchError } = await supabase
		.from("application_stages")
		.select("*")
		.in("id", [sourceStageId, targetStageId])
		.order("stage_order", { ascending: true });

	if (fetchError) {
		throw new Error(fetchError.message);
	}

	if (!stages || stages.length !== 2) {
		throw new Error("Could not find both stages");
	}

	const stagesMap = new Map(stages.map((stage) => [stage.id, stage]));

	const sourceStage = stagesMap.get(sourceStageId);
	const targetStage = stagesMap.get(targetStageId);

	if (!sourceStage || !targetStage) {
		throw new Error("Could not find both stages");
	}

	// Swap the stage orders
	const updates = [
		{ ...sourceStage, stage_order: targetStage.stage_order },
		{ ...targetStage, stage_order: sourceStage.stage_order },
	];

	const { error: updateError } = await supabase
		.from("application_stages")
		.upsert(updates);

	if (updateError) {
		throw new Error(updateError.message);
	}

	// Fetch all stages in new order
	const { data: updatedStages, error: finalError } = await supabase
		.from("application_stages")
		.select("*")
		.order("stage_order", { ascending: true });

	if (finalError) {
		throw new Error(finalError.message);
	}

	return updatedStages;
}
