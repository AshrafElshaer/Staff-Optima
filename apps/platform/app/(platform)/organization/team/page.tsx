import { teamSearchParamsLoader } from "@/features/organization/team/team.search-params";
import { InviteTeamMember } from "@/features/organization/team/views/invite-member";
import { MembersSearch } from "@/features/organization/team/views/member-search";
import { MembersFilters } from "@/features/organization/team/views/members-filters";
import { MembersTable } from "@/features/organization/team/views/team-table";
import { columns } from "@/features/organization/team/views/team-table/columns";
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
	const organization_id = headersList.get("x-organization-id");
	const { data: members, error } = await getMembersWithRole(
		supabase,
		organization_id ?? "",
		{
			name: filters.name,
			role: filters.role,
		},
	);
	return (
		<div className="flex flex-col gap-4 flex-1">
			<section className="flex flex-col sm:flex-row items-center ">
				<MembersFilters />
				<InviteTeamMember />
			</section>
			<MembersTable columns={columns} data={members ?? []} />
		</div>
	);
}
