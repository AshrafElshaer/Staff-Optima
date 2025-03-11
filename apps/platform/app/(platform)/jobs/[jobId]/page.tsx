import Link from "next/link";
import { buttonVariants } from "@optima/ui/components/button";

export default async function JobDetailsPage({
	params,
}: {
	params: Promise<{ jobId: string }>;
}) {
	const { jobId } = await params;
	return (
		<main className="flex flex-col items-start flex-1 gap-4">
			Job {jobId} details
			<Link
				href={`/jobs/${jobId}/edit`}
				className={buttonVariants({ variant: "default" })}
			>
				Edit
			</Link>
			<Link
				href={`/jobs/${jobId}/applications`}
				className={buttonVariants({ variant: "default" })}
			>
				Applications
			</Link>
			<Link
				href={`/jobs/${jobId}/campaigns`}
				className={buttonVariants({ variant: "default" })}
			>
				Campaigns
			</Link>
		</main>
	);
}
