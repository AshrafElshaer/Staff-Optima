import { getLinkIcon } from "@/lib/get-link-icon";
import { createServerClient } from "@/lib/supabase/server";
import {
	getApplicationStages,
	getApplicationsByJobId,
} from "@optima/supabase/queries";
import type {
	Application,
	Candidate,
	CandidateSocialLink,
} from "@optima/supabase/types";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@optima/ui/components/avatar";
import { Badge } from "@optima/ui/components/badge";
import { Button, buttonVariants } from "@optima/ui/components/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@optima/ui/components/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@optima/ui/components/dropdown-menu";
import { Icons } from "@optima/ui/components/icons";
import { ScrollArea, ScrollBar } from "@optima/ui/components/scroll-area";
import { Separator } from "@optima/ui/components/separator";
import { cn } from "@optima/ui/lib/utils";
import { MoreHorizontalIcon } from "lucide-react";
import moment from "moment";
import { headers } from "next/headers";
import Link from "next/link";
import {
	BiSolidCircleHalf,
	BiSolidCircleQuarter,
	BiSolidCircleThreeQuarter,
} from "react-icons/bi";
import { FaLinkedinIn } from "react-icons/fa6";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@optima/ui/components/tooltip";

interface ApplicationWithCandidate extends Application {
	candidate: Candidate & {
		social_links: CandidateSocialLink[];
	};
}

export async function ApplicationsList({ jobId }: { jobId: string }) {
	const headersList = await headers();
	const supabase = await createServerClient();
	const companyId = headersList.get("x-company-id");

	const [{ data: applications }, { data: applicationStages }] =
		await Promise.all([
			getApplicationsByJobId(supabase, jobId),
			getApplicationStages(supabase, companyId ?? ""),
		]);

	const applicationsByStage = applications?.reduce(
		(acc, application) => {
			const key = application.stage_id as string;
			if (!acc[key]) {
				acc[key] = [];
			}
			acc[key].push(application);
			return acc;
		},
		{} as Record<string, ApplicationWithCandidate[]>,
	);

	return (
		<ScrollArea className="w-full whitespace-nowrap ">
			<section className="flex items-start gap-4  pb-4">
				{applicationStages?.map((stage) => (
					<div key={stage.id} className="w-86  ">
						<div className="flex items-center gap-4 px-2 py-2 bg-muted">
							<div
								className="h-5 w-1 rounded-sm"
								style={{
									backgroundColor: stage.indicator_color,
								}}
							/>
							<h2>{stage.title}</h2>
							<Badge variant="info" size="sm" className="ml-auto">
								{applicationsByStage?.[stage.id]?.length ?? 0}
							</Badge>
						</div>
						<Separator />
						<ScrollArea className="h-140 py-2 space-y-2">
							{applicationsByStage?.[stage.id]?.map((application) => (
								<Card
									key={application.id}
									className="rounded-md hover:bg-muted transition-all "
								>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											{/* <Avatar className="w-10 h-10">
												<AvatarImage
													src={application.candidate.avatar_url ?? ""}
												/>
												<AvatarFallback className="font-normal text-sm">
													{application.candidate.first_name.charAt(0)}
													{application.candidate.last_name.charAt(0)}
												</AvatarFallback>
											</Avatar> */}
											<div className="space-y-1">
												<p className="font-medium">
													{application.candidate.first_name}{" "}
													{application.candidate.last_name}
												</p>
												<p className="text-sm text-muted-foreground truncate">
													{application.candidate.email}
												</p>
											</div>
										</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="flex items-center justify-between">
											<TooltipProvider>
												<Tooltip>
													<TooltipTrigger>
														<div className="flex items-center gap-2">
															<Icons.CalendarFill className="h-4 w-4 " />
															<p className="text-sm ">
																{moment(application.created_at).format(
																	"DD MMM YYYY",
																)}
															</p>
														</div>
													</TooltipTrigger>
													<TooltipContent>
														<p>Submitted at</p>
													</TooltipContent>
												</Tooltip>
											</TooltipProvider>
											<TooltipProvider>
												<Tooltip>
													<TooltipTrigger>
														<div
															className={cn(
																"flex items-center gap-2 ml-auto  text-sm",
																application.candidate_match &&
																	(application.candidate_match >= 75
																		? "text-success"
																		: application.candidate_match >= 50
																			? "text-warning"
																			: "text-destructive"),
															)}
														>
															{application.candidate_match &&
																(application.candidate_match >= 75 ? (
																	<BiSolidCircleThreeQuarter className="border rounded-full border-current" />
																) : application.candidate_match >= 50 ? (
																	<BiSolidCircleHalf className="border rounded-full border-current" />
																) : (
																	<BiSolidCircleQuarter className="border rounded-full border-current" />
																))}
															<span>{application.candidate_match}%</span>
														</div>
													</TooltipTrigger>
													<TooltipContent>
														<p>Candidate match score</p>
													</TooltipContent>
												</Tooltip>
											</TooltipProvider>
										</div>
									</CardContent>
									<CardFooter className="flex items-center justify-between ">
										<Link
											// @ts-ignore JSONB is not typed
											href={`https://${application.candidate.social_links?.find((link) => link.platform === "linkedin")?.url as string}`}
											target="_blank"
											className={buttonVariants({
												variant: "link",
												className: "!p-0",
											})}
										>
											<FaLinkedinIn
												strokeWidth={2}
												size={16}
												className="text-blue-500"
											/>
											<span>LinkedIn</span>
										</Link>
										<DropdownMenu>
											<DropdownMenuTrigger className="ml-auto" asChild>
												<Button variant="ghost" size="icon">
													<MoreHorizontalIcon strokeWidth={2} size={16} />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												{application.candidate.social_links
													.filter((link) => !link.platform.includes("linkedin"))
													.map((link) => (
														<DropdownMenuItem key={link.platform} asChild>
															<Link
																href={`https://${link.url}`}
																target="_blank"
																className="capitalize"
															>
																{getLinkIcon(link.platform)}
																<span>{link.platform}</span>
															</Link>
														</DropdownMenuItem>
													))}
											</DropdownMenuContent>
										</DropdownMenu>
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
