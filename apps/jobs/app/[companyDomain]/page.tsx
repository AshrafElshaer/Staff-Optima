import { createServerClient } from "@/lib/supabase/server";

import { countriesMap } from "@optima/location";
import { getCompanyByDomain } from "@optima/supabase/queries";

import { OpenPositions } from "@/components/profile/open-positions";
import { filterSearchParamsCache } from "@/lib/filters.search-params";
import Editor from "@optima/editor";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { SearchParams } from "nuqs/server";

export default async function OrganizationPage({
	params,
	searchParams,
}: {
	params: Promise<{ companyDomain: string }>;
	searchParams: Promise<SearchParams>;
}) {
	await filterSearchParamsCache.parse(searchParams);
	const { companyDomain } = await params;
	const supabase = await createServerClient();
	const { data: company, error } = await getCompanyByDomain(
		supabase,
		companyDomain,
	);
	if (!company) {
		notFound();
	}

	const profileContent = company.profile ?? "";

	const country = countriesMap.get(company.country);

	return (
		<main className="flex flex-col  gap-4">
			<section className="p-4 max-w-3xl flex items-start justify-between gap-4 w-full mx-auto">
				<div className="flex flex-col gap-1">
					<h2 className=" text-muted-foreground">Industry</h2>
					<p className="">{company.industry}</p>
				</div>
				<div className="flex flex-col gap-1">
					<h2 className=" text-muted-foreground">Location</h2>
					<p className="">
						{company.address_1 ? `${company.address_1}, ` : null}
						{company.address_2 ? `${company.address_2}, ` : null}
						{company.address_1 || company.address_2 ? <br /> : null}
						{company.city ? `${company.city}, ` : null}
						{company.state ? `${company.state}, ` : null}
						{company.zip_code ? `${company.zip_code}, ` : null}
						{company.city || company.state || company.zip_code ? <br /> : null}
						{country?.flag} {country?.name}
					</p>
				</div>
			</section>
			<section className="p-4 max-w-3xl mx-auto">
				<Editor content={profileContent} isEditable={false} />
			</section>

			<OpenPositions companyId={company.id} />
		</main>
	);
}
