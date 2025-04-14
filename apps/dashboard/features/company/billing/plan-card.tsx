import { Badge } from "@optima/ui/components/badge";
import { Button } from "@optima/ui/components/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@optima/ui/components/card";
import { Progress } from "@optima/ui/components/progress";
import { Separator } from "@optima/ui/components/separator";
import { cn } from "@optima/ui/lib/utils";
import moment from "moment";

export function PlanCard() {
	const daysInMonth = moment().daysInMonth();
	const daysPassed = moment().diff(moment().startOf("month"), "days");
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-4">
					<p>
						<span className="font-mono">300$</span>
						<span className="text-muted-foreground text-sm"> / Month</span>
					</p>
					<p className="ml-auto">
						<span className="font-mono">15 </span>
						<span className="text-muted-foreground text-sm">Seats</span>
					</p>
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-2">
				<p className="text-sm">
					Next Billing Cycle in {daysInMonth - daysPassed} days
				</p>
				<div className="flex items-center w-full gap-1 sm:gap1.5 md:gap-2">
					{Array.from({ length: daysInMonth }).map((_, index) => (
						<div
							key={index.toString()}
							className={cn(
								"w-2 h-8 bg-accent rounded-sm flex-1",
								index + 1 <= daysPassed && "bg-success",
							)}
						/>
					))}
				</div>
			</CardContent>
			<Separator />
			<CardFooter>
				<Button size="sm" variant="outline" className="ml-auto">
					Manage
				</Button>
			</CardFooter>
		</Card>
	);
}
