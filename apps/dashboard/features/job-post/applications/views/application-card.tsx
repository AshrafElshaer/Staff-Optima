import { getLinkIcon } from "@/lib/get-link-icon";
import type {
	Application,
	Candidate,
	CandidateSocialLink,
} from "@optima/supabase/types";
import { Button } from "@optima/ui/components/button";
import { buttonVariants } from "@optima/ui/components/button";
import {
	Card,
	CardContent,
	CardDescription,
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
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@optima/ui/components/tooltip";
import { cn } from "@optima/ui/lib/utils";
import { MoreHorizontalIcon } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import {
	BiSolidCircleHalf,
	BiSolidCircleQuarter,
	BiSolidCircleThreeQuarter,
} from "react-icons/bi";
import { FaLinkedinIn } from "react-icons/fa";

interface ApplicationCardProps {
	application: Application & {
		candidate: Candidate & {
			social_links: CandidateSocialLink[];
		};
	};
}

export function ApplicationCard({ application }: ApplicationCardProps) {
	return (
		<Card
			key={application.id}
			className="hover:bg-muted transition-all border-x-0 border-t-0 rounded-none"
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
					{application.candidate.first_name} {application.candidate.last_name}
				</CardTitle>
				<CardDescription>{application.candidate.email}</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="flex items-center justify-between">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<div className="flex items-center gap-2">
									<Icons.CalendarFill className="h-4 w-4 " />
									<p className="text-sm ">
										{moment(application.created_at).format("DD MMM YYYY")}
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
					<FaLinkedinIn strokeWidth={2} size={16} className="text-blue-500" />
					<span>LinkedIn</span>
				</Link>
				<DropdownMenu>
					<DropdownMenuTrigger className="ml-auto" asChild>
						<Button variant="ghost" size="iconSm">
							<MoreHorizontalIcon strokeWidth={2} size={16} />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="bg-muted">
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
	);
}
