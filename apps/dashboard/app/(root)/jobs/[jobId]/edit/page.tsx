export default async function EditJobPage({
	params,
}: {
	params: Promise<{ jobId: string }>;
}) {
	const { jobId } = await params;
	return (
		<div className="flex flex-col items-start flex-1 gap-4">
			Edit Job {jobId}
		</div>
	);
}
