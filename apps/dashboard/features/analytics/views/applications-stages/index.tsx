import { createServerClient } from "@/lib/supabase/server";
// import { getApplicationStages } from "@optima/supabase/queries";
import { headers } from "next/headers";
import { ApplicationsStagesChartClient } from "./chart.client";

export async function ApplicationsStagesChart() {
	// const supabase = await createServerClient();
	const headersList = await headers();
	// const organizationId = headersList.get("x-organization-id");
	// const { data: applicationStages } = await getApplicationStages(
	//   supabase,
	//   organizationId as string,
	// );

	return <ApplicationsStagesChartClient stages={[]} />;
}
