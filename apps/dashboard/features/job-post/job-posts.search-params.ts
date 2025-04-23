import {
	employmentTypeEnum,
	experienceLevelEnum,
	jobPostCampaignStatusEnum,
	jobPostStatusEnum,
	workModeEnum,
} from "@optima/supabase/types";

import {
	createLoader,
	createSerializer,
	parseAsArrayOf,
	parseAsFloat,
	parseAsString,
	parseAsStringEnum,
} from "nuqs/server";

// Describe your search params, and reuse this in useQueryStates / createSerializer:
export const jobPostsSearchParams = {
	job_status: parseAsArrayOf(
		parseAsStringEnum(Object.values(jobPostStatusEnum)),
	).withDefault([]),
	campaign_status: parseAsArrayOf(
		parseAsStringEnum(Object.values(jobPostCampaignStatusEnum)),
	).withDefault([]),
	type: parseAsArrayOf(
		parseAsStringEnum(Object.values(employmentTypeEnum)),
	).withDefault([]),
	work_mode: parseAsArrayOf(
		parseAsStringEnum(Object.values(workModeEnum)),
	).withDefault([]),
	experience: parseAsArrayOf(
		parseAsStringEnum(Object.values(experienceLevelEnum)),
	).withDefault([]),
	department: parseAsArrayOf(parseAsString).withDefault([]),
	title: parseAsString.withDefault(""),
};

export const loadJobPostsSearchParams = createLoader(jobPostsSearchParams);

export const jobPostsSerializer = createSerializer(jobPostsSearchParams);
