"use client";
import { Input } from "@optima/ui/components/inputs";
import { Search } from "lucide-react";
import { useQueryState } from "nuqs";
import { departmentSearchParamsParser } from "../departments.search-params";

export function DepartmentSearch() {
	const [name, setName] = useQueryState(
		"name",
		departmentSearchParamsParser.name,
	);

	return (
		<Input
			placeholder="Search by name"
			startIcon={<Search className="size-4" />}
			value={name ?? ""}
			onChange={(e) => setName(e.target.value)}
		/>
	);
}
