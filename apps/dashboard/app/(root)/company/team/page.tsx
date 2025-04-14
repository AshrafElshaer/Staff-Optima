import { teamSearchParamsLoader } from "@/features/company/team/team.search-params";
import { InviteTeamMember } from "@/features/company/team/views/invite-member";
import { MembersSearch } from "@/features/company/team/views/member-search";
import { MembersFilters } from "@/features/company/team/views/members-filters";
import { MembersTable } from "@/features/company/team/views/team-table";
import { columns } from "@/features/company/team/views/team-table/columns";
import { createServerClient } from "@/lib/supabase/server";
import { getMembersWithRole } from "@optima/supabase/queries";
import { headers } from "next/headers";
import type { SearchParams } from "nuqs";
type Props = {
	searchParams: Promise<SearchParams>;
};

export default async function OrganizationTeamPage({ searchParams }: Props) {
	const filters = await teamSearchParamsLoader(searchParams);

	const supabase = await createServerClient();
	const headersList = await headers();
	const companyId = headersList.get("x-company-id");
	const { data: members, error } = await getMembersWithRole(
		supabase,
		companyId ?? "",
		{
			name: filters.name,
			role: filters.role,
		},
	);
	return (
		<div className="flex flex-col gap-4 flex-1">
			<section className="flex flex-col sm:flex-row items-center gap-2 ">
				<MembersFilters />
				<InviteTeamMember />
			</section>
			<MembersTable columns={columns} data={members ?? []} />
		</div>
	);
}
