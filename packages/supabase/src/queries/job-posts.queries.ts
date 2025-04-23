// import type {
//   EmploymentType,
//   ExperienceLevel,
//   JobLocation,
//   JobPostCampaignStatus,
//   SupabaseInstance,
// } from "../types";
import type {
	EmploymentType,
	ExperienceLevel,
	JobPostStatus,
	SupabaseInstance,
	WorkMode,
} from "../types";

export async function getJobPosts(
	supabase: SupabaseInstance,
	company_id: string,
	filters?: {
		status?: JobPostStatus[];
		type?: EmploymentType[];
		workMode?: WorkMode[];
		experience?: ExperienceLevel[];
		department?: string[];
		title?: string;
	},
) {
	const query = supabase
		.from("job_posts")
		.select("*, department:department_id (*), campaigns:job_posts_campaigns(*)")
		.eq("company_id", company_id);

	// if (filters?.status?.length) {
	// 	const statuses = filters.status.map((status) => `status.eq.${status}`);
	// 	query.or(statuses.join(","), {
	// 		referencedTable: "job_posts_campaigns",
	// 	});
	// } else {
	// 	query.or("status.neq.archived", {
	// 		referencedTable: "job_posts_campaigns",
	// 	});
	// }

	if (filters?.type?.length) {
		query.in("employment_type", filters.type);
	}

	if (filters?.workMode?.length) {
		query.in("work_mode", filters.workMode);
	}

	if (filters?.experience?.length) {
		query.in("experience_level", filters.experience);
	}

	if (filters?.department?.length) {
		query.in("department_id", filters.department);
	}

	if (filters?.title?.length) {
		query.ilike("title", `%${filters.title}%`);
	}

	return await query;
}

// export async function getJobPostsWithApplicationsCount(
// 	supabase: SupabaseInstance,
// 	company_id: string,
// 	filters?: {
// 		status?: JobPostStatus[];
// 		type?: EmploymentType[];
// 		location?: string[];
// 		experience?: ExperienceLevel[];
// 		department?: string[];
// 		title?: string;
// 	},
// ) {
// 	const query = supabase
// 		.from("job_posts")
// 		.select("*, department:department_id (*),")
// 		.eq("company_id", company_id);
// 	//  applications(count), campaigns:job_posts_campaigns!inner(*)

// 	if (filters?.status?.length) {
// 		const statuses = filters.status.map((status) => `status.eq.${status}`);
// 		query.or(statuses.join(","), {
// 			referencedTable: "job_posts_campaigns",
// 		});
// 	} else {
// 		query.or("status.neq.archived", {
// 			referencedTable: "job_posts_campaigns",
// 		});
// 	}

// 	if (filters?.type?.length) {
// 		query.in("employment_type", filters.type);
// 	}

// 	if (filters?.location?.length) {
// 		query.in("location", filters.location);
// 	}

// 	if (filters?.experience?.length) {
// 		query.in("experience_level", filters.experience);
// 	}

// 	if (filters?.department?.length) {
// 		query.in("department_id", filters.department);
// 	}

// 	if (filters?.title?.length) {
// 		query.ilike("title", `%${filters.title}%`);
// 	}

// 	return await query;
// }

export async function getJobPostById(
	supabase: SupabaseInstance,
	job_id: string,
) {
	return await supabase
		.from("job_posts")
		.select("*, campaigns:job_posts_campaigns(*), department:department_id(*)")
		.eq("id", job_id)
		.single();
}
