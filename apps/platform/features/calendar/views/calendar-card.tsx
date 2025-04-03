import {
	JobLinkIcon,
	LinkSquare02Icon,
	TimeQuarterPassIcon,
} from "hugeicons-react";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@optima/ui/components/card";
import { Icons } from "@optima/ui/components/icons";
import Link from "next/link";

type CalendarCardProps = {
	title: string;
	date: Date;
	location: string;
	status: string;
	candidate: string;
	job: string;
	time: string;
	link: string;
};

export function CalendarCard({
	date,
	job,
	link,
	location,
	time,
	title,
}: CalendarCardProps) {
	const Icon =
		location === "Google Meet"
			? Icons.GoogleMeet
			: location === "Zoom"
				? Icons.Zoom
				: Icons.Building;
	return (
		<Card className="w-80 bg-accent gap-4" key={title}>
			<CardHeader>
				<CardTitle>
					<p className="font-semibold truncate">{title}</p>
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-1">
				<p className=" flex items-center gap-2 text-secondary-foreground">
					<JobLinkIcon strokeWidth={2} size={16} />
					<span className="text-sm ">{job}</span>
				</p>
				<p className="text-sm text-secondary-foreground flex items-center gap-2">
					<TimeQuarterPassIcon strokeWidth={2} size={16} />
					<span>{time} (UTC)</span>
				</p>
			</CardContent>
			<CardFooter className="w-full">
				<Link
					href={link}
					target="_blank"
					className="flex items-center gap-2 text-secondary-foreground hover:text-foreground transition-colors w-full"
				>
					<Icon />
					<span className="text-sm mr-auto">{location}</span>
					<LinkSquare02Icon strokeWidth={2} size={18} />
				</Link>
			</CardFooter>
		</Card>
	);
}
