import { InviteTeamMember } from "@/features/organization/team/views/invite-member";
import { MembersSearch } from "@/features/organization/team/views/member-search";
import { MembersTable } from "@/features/organization/team/views/team-table";
import { columns } from "@/features/organization/team/views/team-table/columns";
import { createServerClient } from "@/lib/supabase/server";
import { getMembersWithRole } from "@optima/supabase/queries";
import { headers } from "next/headers";
export default async function OrganizationTeamPage() {
	const supabase = await createServerClient();
	const headersList = await headers();
	const organization_id = headersList.get("x-organization-id");
	const { data: members } = await getMembersWithRole(
		supabase,
		organization_id ?? "",
	);

	return (
		<div className="flex flex-col gap-4 flex-1">
			<section className="flex items-center justify-between">
				<MembersSearch />
				<InviteTeamMember />
			</section>
			<MembersTable columns={columns} data={members ?? []} />
		</div>
	);
}
