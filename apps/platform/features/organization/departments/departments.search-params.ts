import { createSearchParamsCache, parseAsString } from "nuqs/server";

export const departmentSearchParamsParser = {
	name: parseAsString.withDefault(""),
};

export const departmentSearchParamsCache = createSearchParamsCache(
	departmentSearchParamsParser,
);
