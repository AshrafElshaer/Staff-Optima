"use client";
import { Input } from "@optima/ui/components/inputs";
import { Search } from "lucide-react";

export function MembersSearch() {
	return (
		<Input
			startIcon={<Search className="size-4" />}
			placeholder="Search by name"
		/>
	);
}
