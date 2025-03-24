import {
	createSearchParamsCache,
	parseAsInteger,
	parseAsString,
	parseAsStringEnum,
} from "nuqs/server";
// Note: import from 'nuqs/server' to avoid the "use client" directive

export const authSearchParams = {
	redirect_url: parseAsString.withDefault("/"),
	auth_type: parseAsStringEnum(["signup", "magiclink"]).withDefault(
		"magiclink",
	),
	email: parseAsString.withDefault(""),
	active_tab: parseAsStringEnum(["sign-in", "verify-otp"]).withDefault(
		"sign-in",
	),
};

export const authSearchParamsCache = createSearchParamsCache(authSearchParams);
