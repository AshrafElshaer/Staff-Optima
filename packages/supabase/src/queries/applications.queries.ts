import moment from "moment";
import type { SupabaseInstance } from "../types";
type GetApplicationsProps = {
	supabase: SupabaseInstance;
	companyId: string;
	filters?: {
		from?: string;
		to?: string;
	};
};
export async function getApplications({
	supabase,
	companyId,
	filters,
}: GetApplicationsProps) {
	const query = supabase
		.from("applications")
		.select("*")
		.eq("company_id", companyId);

	if (filters?.from) {
		query.gte("created_at", filters.from);
	}

	if (filters?.to) {
		query.lte("created_at", filters.to);
	}

	return await query;
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
