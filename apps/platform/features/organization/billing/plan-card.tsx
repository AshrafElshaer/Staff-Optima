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
					Starter Plan{" "}
					<Badge variant="success" className="rounded-sm" size="md">
						Monthly
					</Badge>
					<p className="ml-auto">
						15 $ <span className="text-muted-foreground text-sm">/ month</span>
					</p>
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-2">
				<p className="text-sm">
					Next Billing Cycle in {daysInMonth - daysPassed} days
				</p>
				<div className="flex items-center w-full gap-2">
					{Array.from({ length: daysInMonth }).map((_, index) => (
						<div
							key={index.toString()}
							className={cn(
								"w-2 h-8 bg-accent rounded-full flex-1",
								index + 1 <= daysPassed && "bg-success",
							)}
						/>
					))}
				</div>
			</CardContent>
			<Separator />
			<CardFooter>
				<Button variant="outline" className="ml-auto">
					Manage
				</Button>
			</CardFooter>
		</Card>
	);
}
