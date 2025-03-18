import { Button } from "@optima/ui/components/button";

interface DepartmentPageProps {
	params: Promise<{
		departmentId: string;
	}>;
}

export default async function DepartmentPage({ params }: DepartmentPageProps) {
	const { departmentId } = await params;

	return (
		<div className="flex flex-col gap-6 flex-1">
			{/* Header Section */}
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold">Engineering Department</h1>
				<Button>Edit Department</Button>
			</div>

			{/* Department Info Card */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div className="card p-4 shadow">
					<h3 className="font-semibold mb-2">Recruitment Overview</h3>
					<div className="text-sm">
						<p>Open Positions: 12</p>
						<p>Total Applications: 156</p>
						<p>Interviews Scheduled: 8</p>
					</div>
				</div>

				<div className="card p-4 shadow">
					<h3 className="font-semibold mb-2">Hiring Metrics</h3>
					<div className="text-sm">
						<p>Time to Fill: 25 days avg.</p>
						<p>Offer Acceptance Rate: 85%</p>
						<p>Applications per Day: 12</p>
					</div>
				</div>

				<div className="card p-4 shadow">
					<h3 className="font-semibold mb-2">Quick Actions</h3>
					<div className="flex flex-col gap-2">
						<Button variant="outline">Post New Job</Button>
						<Button variant="outline">Schedule Interviews</Button>
						<Button variant="outline">Review Applications</Button>
					</div>
				</div>
			</div>

			{/* Active Applications */}
			<div className="shadow rounded-lg p-4">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-semibold">Recent Applications</h2>
					<Button variant="outline">View All</Button>
				</div>
				<div className="divide-y">
					<div className="py-4">
						<div className="flex justify-between items-start">
							<div>
								<p className="font-medium">John Smith</p>
								<p className="text-sm">Senior Software Engineer</p>
								<p className="text-sm text-muted-foreground">
									Applied: 2 days ago
								</p>
							</div>
							<div className="flex gap-2">
								<Button variant="outline" size="sm">
									Review
								</Button>
								<Button size="sm">Schedule Interview</Button>
							</div>
						</div>
					</div>
					{/* More application items... */}
				</div>
			</div>

			{/* Open Positions */}
			<div className="shadow rounded-lg p-4">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-semibold">Open Positions</h2>
					<Button variant="outline">Create Position</Button>
				</div>
				<div className="divide-y">
					<div className="py-4">
						<div className="flex justify-between items-start">
							<div>
								<p className="font-medium">Senior Frontend Developer</p>
								<p className="text-sm text-muted-foreground">
									Applications: 45 • Interviews: 3 • Days Open: 15
								</p>
							</div>
							<div className="flex gap-2">
								<Button variant="outline" size="sm">
									Edit
								</Button>
								<Button variant="outline" size="sm">
									View Applications
								</Button>
							</div>
						</div>
					</div>
					{/* More position items... */}
				</div>
			</div>

			{/* Pipeline Overview */}
			<div className="shadow rounded-lg p-4">
				<h2 className="text-xl font-semibold mb-4">Hiring Pipeline</h2>
				<div className="grid grid-cols-5 gap-4 text-center">
					<div className="p-3 rounded bg-muted">
						<p className="font-medium">New</p>
						<p className="text-2xl font-bold">45</p>
					</div>
					<div className="p-3 rounded bg-muted">
						<p className="font-medium">Screening</p>
						<p className="text-2xl font-bold">28</p>
					</div>
					<div className="p-3 rounded bg-muted">
						<p className="font-medium">Interview</p>
						<p className="text-2xl font-bold">12</p>
					</div>
					<div className="p-3 rounded bg-muted">
						<p className="font-medium">Offer</p>
						<p className="text-2xl font-bold">5</p>
					</div>
					<div className="p-3 rounded bg-muted">
						<p className="font-medium">Hired</p>
						<p className="text-2xl font-bold">3</p>
					</div>
				</div>
			</div>
		</div>
	);
}
