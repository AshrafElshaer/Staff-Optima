import { ApplicationsList } from "@/features/job-post/applications/views/applications-list";

interface JobDetailsPageProps {
	params: Promise<{ jobId: string }>;
}

export default async function JobDetailsPage({ params }: JobDetailsPageProps) {
	const { jobId } = await params;
	return <ApplicationsList jobId={jobId} />;
}
