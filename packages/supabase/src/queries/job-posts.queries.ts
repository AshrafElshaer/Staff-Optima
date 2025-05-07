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
	JobPostCampaignStatus,
	JobPostStatus,
	SupabaseInstance,
	WorkMode,
} from "../types";
import { jobPostCampaignStatusEnum, jobPostStatusEnum } from "../types";

export async function getJobPosts(
	supabase: SupabaseInstance,
	company_id: string,
	filters?: {
		job_status?: JobPostStatus[];
		campaign_status?: JobPostCampaignStatus[];
		type?: EmploymentType[];
		work_mode?: WorkMode[];
		experience?: ExperienceLevel[];
		department?: string[];
		title?: string;
	},
) {
	const query = supabase
		.from("job_posts")
		.select(
			"*, department:department_id (*), campaigns:job_posts_campaigns(*), applications:applications(*)",
		)
		.eq("company_id", company_id)
		.order("status", { ascending: true });

	// if (filters?.job_status || filters?.campaign_status) {
	// 	query.select(
	// 		"*, department:department_id (*), campaigns:job_posts_campaigns!inner(*)",
	// 	);
	// }

	if (filters?.job_status?.length) {
		query.in("status", filters.job_status as JobPostStatus[]);
	}

	if (filters?.type?.length) {
		query.in("employment_type", filters.type);
	}

	if (filters?.work_mode?.length) {
		query.in("work_mode", filters.work_mode);
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

	const { data, error } = await query;

	if (error) {
		return { data: null, error };
	}

	if (data) {
		// Filter out jobs with no campaigns and get only latest campaign
		const filteredData = data
			.map((job) => ({
				...job,
				campaigns:
					job.campaigns
						?.sort(
							(a, b) =>
								new Date(b.created_at).getTime() -
								new Date(a.created_at).getTime(),
						)
						.slice(0, 1) || [],
			}))
			.filter((job) => job.campaigns.length > 0);

		// Apply campaign status filter if specified
		if (filters?.campaign_status?.length) {
			return {
				data: filteredData.filter((job) =>
					job.campaigns.some((campaign) =>
						filters.campaign_status?.includes(campaign.status),
					),
				),
				error: null,
			};
		}

		return { data: filteredData, error: null };
	}

	return { data: data, error };
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
		.select(
			"*, campaigns:job_posts_campaigns(*), department:department_id(*), applications:applications(*)",
		)
		.eq("id", job_id)
		.single();
}
