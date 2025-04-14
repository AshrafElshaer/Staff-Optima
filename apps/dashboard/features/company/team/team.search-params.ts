import { createLoader, parseAsArrayOf, parseAsString } from "nuqs/server";

export const teamSearchParamsParser = {
	name: parseAsString.withDefault(""),
	role: parseAsArrayOf(parseAsString.withDefault("")),
};

export const teamSearchParamsLoader = createLoader(teamSearchParamsParser);
