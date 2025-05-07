import type { SupabaseInstance, TablesInsert, TablesUpdate } from "../types";

export const createCandidate = async (
	supabase: SupabaseInstance,
	candidate: TablesInsert<"candidates">,
) => {
	const { data: existingCandidate, error } = await supabase
		.from("candidates")
		.select("*")
		.eq("email", candidate.email)
		.eq("company_id", candidate.company_id ?? "")
		.single();

	if (existingCandidate) {
		const { data, error } = await supabase
			.from("candidates")
			.update(candidate)
			.eq("email", candidate.email)
			.eq("company_id", candidate.company_id ?? "")
			.select()
			.single();

		return {
			data,
			error,
		};
	}
	return await supabase.from("candidates").insert(candidate).select().single();
};

export const updateCandidate = async (
	supabase: SupabaseInstance,
	candidate: TablesUpdate<"candidates">,
) => {
	if (!candidate.id) {
		throw new Error("Candidate ID is required");
	}

	return await supabase
		.from("candidates")
		.update(candidate)
		.eq("id", candidate.id)
		.select()
		.single();
};

export const createCandidateEducation = async (
	supabase: SupabaseInstance,
	education:
		| TablesInsert<"candidate_educations">
		| TablesInsert<"candidate_educations">[],
) => {
	if (Array.isArray(education)) {
		return await supabase
			.from("candidate_educations")
			.insert(education)
			.select();
	}

	return await supabase
		.from("candidate_educations")
		.insert(education)
		.select()
		.single();
};

export const createCandidateExperience = async (
	supabase: SupabaseInstance,
	experience:
		| TablesInsert<"candidate_experiences">
		| TablesInsert<"candidate_experiences">[],
) => {
	if (Array.isArray(experience)) {
		return await supabase
			.from("candidate_experiences")
			.insert(experience)
			.select();
	}

	return await supabase
		.from("candidate_experiences")
		.insert(experience)
		.select()
		.single();
};

export const createCandidateSocialLink = async (
	supabase: SupabaseInstance,
	socialLink:
		| TablesInsert<"candidate_social_links">
		| TablesInsert<"candidate_social_links">[],
) => {
	if (Array.isArray(socialLink)) {
		return await supabase
			.from("candidate_social_links")
			.insert(socialLink)
			.select();
	}

	return await supabase
		.from("candidate_social_links")
		.insert(socialLink)
		.select()
		.single();
};
