
interface DepartmentPageProps {
	params: Promise<{
		departmentId: string;
	}>;
}

export default async function DepartmentPage({ params }: DepartmentPageProps) {
	const { departmentId } = await params;
	return (
		<div className="flex flex-col gap-4 flex-1">
			<h1 className="text-2xl font-bold">
				Engineering Department {departmentId}
			</h1>
		</div>
	);
}
