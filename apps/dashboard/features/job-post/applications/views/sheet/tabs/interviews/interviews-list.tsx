import { Badge } from "@optima/ui/components/badge";
import { Button } from "@optima/ui/components/button";
import { Card } from "@optima/ui/components/card";
import { Separator } from "@optima/ui/components/separator";
import { CalendarAdd02Icon } from "hugeicons-react";
import moment from "moment";
import { FaEye } from "react-icons/fa";

const demo = [
	{
		id: 1,
		title: "Phone Interview",
		date: "2024-01-01",
		location: "Zoom",
		type: "Video",
		status: "completed",
		start_time: "10:00 AM",
		end_time: "11:00 AM",
		interviewer: "John Doe",
	},
	{
		id: 2,
		title: "Technical Interview",
		date: "2024-01-03",
		location: "Google Meet",
		type: "Video",
		status: "pending",
		start_time: "2:00 PM",
		end_time: "3:00 PM",
		interviewer: "Jane Smith",
	},
	{
		id: 3,
		title: "Final Interview",
		date: "2024-01-05",
		location: "Slack",
		type: "Video",
		status: "scheduled",
		start_time: "11:00 AM",
		end_time: "12:00 PM",
		interviewer: "Mike Johnson",
	},
];

export function InterviewsList() {
	return (
		<div className="flex flex-col  h-full ">
			<div className="p-4 flex-1 space-y-4">
				{demo.map((interview) => (
					<Card key={interview.id} className=" bg-muted">
						<div className="flex items-center gap-4 p-2 px-4">
							<div className="text-center">
								<p className="font-semibold">
									{moment(interview.date).format("DD")}
								</p>
								<p className="font-semibold">
									{moment(interview.date).format("MMM")}
								</p>
							</div>
							<div>
								<p className="font-semibold">{interview.title}</p>
								<p className="text-sm text-secondary-foreground">
									{interview.start_time} - {interview.end_time}
								</p>
							</div>
							<Button className="ml-auto" variant="secondary" size="sm">
								<FaEye className="w-4 h-4" />
								Details
							</Button>
						</div>
						<Separator />
						<div className="flex items-center justify-between gap-6 p-2 px-4">
							<div className="space-y-2">
								<p className="text-sm text-secondary-foreground">Status</p>

								<Badge
									variant={
										interview.status === "completed"
											? "success"
											: interview.status === "pending"
												? "warning"
												: "info"
									}
									className="rounded-sm capitalize"
									size="md"
								>
									{interview.status}
								</Badge>
							</div>
							<div className="space-y-2">
								<p className="text-sm text-secondary-foreground">interviewer</p>
								<p>{interview.interviewer}</p>
							</div>
						</div>
					</Card>
				))}
			</div>
			<Separator className="mt-auto" />
			<div className="flex flex-col gap-2 p-4">
				<Button className="w-fit">
					<CalendarAdd02Icon className="w-4 h-4" />
					Schedule Interview
				</Button>
			</div>
		</div>
	);
}
