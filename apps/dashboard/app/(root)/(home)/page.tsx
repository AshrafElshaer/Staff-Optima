import { ApplicationsCharts } from "@/features/analytics/views/applications-charts";
import { ApplicationsSources } from "@/features/analytics/views/applications-sources";
import { ApplicationsStagesChart } from "@/features/analytics/views/applications-stages";
import {
	ApplicationsWidget,
	ApplicationsWidgetSkeleton,
} from "@/features/analytics/views/applications-widget";
import {
	OpenJobsWidget,
	OpenJobsWidgetSkeleton,
} from "@/features/analytics/views/open-jobs-widget";
import { CalendarCard } from "@/features/calendar/views/calendar-card";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@optima/ui/components/card";
import { Icons } from "@optima/ui/components/icons";
import { ScrollArea, ScrollBar } from "@optima/ui/components/scroll-area";
import {
	Calendar03Icon,
	JobLinkIcon,
	LinkSquare02Icon,
	TimeQuarterPassIcon,
	UserCheck01Icon,
	UserSearch01Icon,
} from "hugeicons-react";
import { Suspense } from "react";

export const metadata = {
	title: "Home",
};

const upcomingEvents = [
	{
		title: "Interview with John Doe Interview with John Doe",
		date: new Date(),
		location: "Google Meet",
		status: "Pending",
		candidate: "John Doe",
		job: "Software Engineer",
		time: "10:00 AM - 11:00 AM",
		link: "/interviews/123",
	},
	{
		title: "Interview with Jane Smith",
		date: new Date(),
		location: "Zoom",
		status: "Confirmed",
		candidate: "Jane Smith",
		job: "Product Manager",
		time: "2:00 PM - 3:00 PM",
		link: "/interviews/124",
	},
	{
		title: "Interview with Mike Johnson",
		date: new Date(),
		location: "Zoom",
		status: "Pending",
		candidate: "Mike Johnson",
		job: "UX Designer",
		time: "11:30 AM - 12:30 PM",
		link: "/interviews/125",
	},
	{
		title: "Interview with Sarah Williams",
		date: new Date(),
		location: "Google Meet",
		status: "Confirmed",
		candidate: "Sarah Williams",
		job: "Frontend Developer",
		time: "4:00 PM - 5:00 PM",
		link: "/interviews/126",
	},
	{
		title: "Interview with David Brown",
		date: new Date(),
		location: "Zoom",
		status: "Pending",
		candidate: "David Brown",
		job: "DevOps Engineer",
		time: "1:00 PM - 2:00 PM",
		link: "/interviews/127",
	},
];

export default async function Page() {
	return (
		<div className=" flex flex-col gap-6 ">
			<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				<Suspense fallback={<OpenJobsWidgetSkeleton />}>
					<OpenJobsWidget />
				</Suspense>

				<Suspense fallback={<ApplicationsWidgetSkeleton />}>
					<ApplicationsWidget />
				</Suspense>
				<Card className="flex-row items-center  p-4 gap-2 bg-accent">
					<Icons.CalendarFill width={20} height={20} />
					<span className="font-semibold">Interviews</span>
					<span className="text-sm text-secondary-foreground">This week</span>
					<span className="text-lg font-semibold font-mono ml-auto">5</span>
				</Card>
			</section>

			<section className="space-y-4">
				<h3 className="text-lg font-semibold">Today's Events</h3>
				<ScrollArea className="w-full whitespace-nowrap ">
					<div className="flex w-max space-x-4 pb-4">
						{upcomingEvents.map((event) => (
							<CalendarCard key={event.title} {...event} />
						))}
					</div>
					<ScrollBar orientation="horizontal" />
				</ScrollArea>
			</section>

			<ApplicationsCharts />
			<section className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<ApplicationsSources />
				<ApplicationsStagesChart />
			</section>
		</div>
	);
}
