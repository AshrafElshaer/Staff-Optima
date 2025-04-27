import {
	employmentTypeEnum,
	experienceLevelEnum,
	workModeEnum,
	jobPostCampaignStatusEnum,
} from "@optima/supabase/types";
import {
	createSearchParamsCache,
	parseAsArrayOf,
	parseAsString,
	parseAsStringEnum,
} from "nuqs/server";

export const filterSearchParamsParser = {
	type: parseAsArrayOf(
		parseAsStringEnum(Object.values(employmentTypeEnum)),
	).withDefault([]),
	workMode: parseAsArrayOf(
		parseAsStringEnum(Object.values(workModeEnum)),
	).withDefault([]),
	experience: parseAsArrayOf(
		parseAsStringEnum(Object.values(experienceLevelEnum)),
	).withDefault([]),
	department: parseAsArrayOf(parseAsString).withDefault([]),
};

export const filterSearchParamsCache = createSearchParamsCache(
	filterSearchParamsParser,
);
