// import { PageTitle } from "@/components/page-title";
import { FlowWithProvider } from "@/components/providers/react-flow-provider";
import { StagesFlow } from "@/features/company/workflow/views/stages-flow";
import { createServerClient } from "@/lib/supabase/server";
import { getApplicationStages } from "@optima/supabase/queries";
import {
	Alert,
	AlertDescription,
	AlertTitle,
} from "@optima/ui/components/alert";
import type { Metadata } from "next";
import { headers } from "next/headers";

export const metadata: Metadata = {
	title: "Pipeline",
	description:
		"Design and manage your interview pipeline with customizable stages and automated triggers to streamline your hiring process.",
};

export default async function CompanyWorkflowsPage() {
	const supabase = await createServerClient();
	const headerList = await headers();
	const companyId = headerList.get("x-company-id");
	const { data: applicationStages, error } = await getApplicationStages(
		supabase,
		companyId ?? "",
	);
	if (error) {
		throw error;
	}
	return (
		<div className="flex flex-col gap-4 flex-1">
			{/* <Alert>
				Good to know! The 'Rejected' stage is universal and can be paired with
				any stage in your workflow.
				<br />
				This ensures seamless candidate management, regardless of their hiring
				stage.
			</Alert> */}
			<Alert variant="info">
				<AlertTitle>Good to know!</AlertTitle>
				<AlertDescription>
					You can Reject or Hire a candidate from any stage in your workflow. no
					need to create a new stage for this.
				</AlertDescription>
			</Alert>
			<FlowWithProvider>
				<StagesFlow applicationStages={applicationStages} />
			</FlowWithProvider>
		</div>
	);
}
