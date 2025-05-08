import { Button } from "@optima/ui/components/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@optima/ui/components/card";

import { Icons } from "@optima/ui/components/icons";
import { ScrollArea, ScrollBar } from "@optima/ui/components/scroll-area";
import { Separator } from "@optima/ui/components/separator";
import { Skeleton } from "@optima/ui/components/skeleton";
import { MoreHorizontalIcon } from "lucide-react";

import { FaLinkedinIn } from "react-icons/fa";

export default function ApplicationsListLoading() {
	return (
		<ScrollArea className="w-full whitespace-nowrap ">
			<section className="flex items-start gap-4  pb-4">
				{[1, 2, 3, 4]?.map((stage) => (
					<div key={stage.toString()} className="w-86 border rounded-md ">
						<div className="flex items-center gap-4 px-2 py-2 bg-muted">
							<Skeleton className="h-5 w-1 rounded-sm" />
							<Skeleton className="h-4 w-16" />
							<Skeleton className="h-5 w-5 ml-auto" />
						</div>
						<Separator />
						<ScrollArea className="h-140  space-y-2">
							{[1, 2, 3, 4]?.map((application) => (
								<Card
									key={`${application.toString()}-${stage.toString()}`}
									className="hover:bg-muted transition-all border-x-0 border-t-0 rounded-none"
								>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<Skeleton className="h-4 w-16" />
										</CardTitle>
										<CardDescription>
											<Skeleton className="h-3 w-32" />
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-2">
												<Icons.CalendarFill className="h-4 w-4 " />
												<p className="text-sm ">
													<Skeleton className="h-3 w-24" />
												</p>
											</div>
											<div className="flex items-center gap-2 ml-auto text-sm">
												<Skeleton className="h-4 w-4 rounded-full" />
												<Skeleton className="h-4 w-6" />
											</div>
										</div>
									</CardContent>
									<CardFooter className="flex items-center justify-between ">
										<Button variant="link" className="!p-0" disabled>
											<FaLinkedinIn
												strokeWidth={2}
												size={16}
												className="text-blue-500"
											/>
											<span>LinkedIn</span>
										</Button>
										<Button
											variant="ghost"
											size="iconSm"
											className="ml-auto"
											disabled
										>
											<MoreHorizontalIcon strokeWidth={2} size={16} />
										</Button>
									</CardFooter>
								</Card>
							))}
						</ScrollArea>
					</div>
				))}
			</section>
			<ScrollBar orientation="horizontal" />
		</ScrollArea>
	);
}
