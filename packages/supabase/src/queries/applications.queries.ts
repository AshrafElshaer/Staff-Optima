import type { SupabaseInstance } from "../types";

export async function getApplications(
	supabase: SupabaseInstance,
	companyId: string,
) {
	return await supabase
		.from("applications")
		.select("*")
		.eq("company_id", companyId);
}

export async function getApplicationById(
	supabase: SupabaseInstance,
	applicationId: string,
) {
	return await supabase
		.from("applications")
		.select("*")
		.eq("id", applicationId);
}

export async function getApplicationByCandidateId(
	supabase: SupabaseInstance,
	candidateId: string,
) {
	return await supabase
		.from("applications")
		.select("*")
		.eq("candidate_id", candidateId);
}

export async function getApplicationsByJobId(
	supabase: SupabaseInstance,
	jobId: string,
) {
	return await supabase.from("applications").select("*").eq("job_id", jobId);
}

export async function getApplicationsByStageId(
	supabase: SupabaseInstance,
	stageId: string,
) {
	return await supabase
		.from("applications")
		.select("*")
		.eq("stage_id", stageId);
}

export async function isCandidateAppliedToJob(
	supabase: SupabaseInstance,
	candidateId: string,
	jobId: string,
) {
	return await supabase
		.from("applications")
		.select("*")
		.eq("candidate_id", candidateId)
		.eq("job_id", jobId)
		.single();
}
