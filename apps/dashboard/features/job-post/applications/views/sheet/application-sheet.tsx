"use client";
import { countriesMap } from "@optima/location";
import type { Application, Candidate } from "@optima/supabase/types";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@optima/ui/components/avatar";

import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@optima/ui/components/sheet";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@optima/ui/components/tabs";
import { cn } from "@optima/ui/lib/utils";

import { Button, buttonVariants } from "@optima/ui/components/button";
import { Separator } from "@optima/ui/components/separator";
import moment from "moment";
import Link from "next/link";
import { useState } from "react";
import {
	BiSolidCircleHalf,
	BiSolidCircleQuarter,
	BiSolidCircleThreeQuarter,
} from "react-icons/bi";
import { IoDocuments, IoDocumentsOutline } from "react-icons/io5";
import {
	ApplicationCard,
	type ApplicationCardProps,
} from "../application-card";
import { EducationsCard } from "./tabs/application/educations-card";
import { ExperiencesCard } from "./tabs/application/experiences-card";
// import { EducationsCard } from "./application-tab/educations-card";
// import { ExperiencesCard } from "./application-tab/experiences-card";
import { HiringStages } from "./tabs/application/hiring-stages";
import { ScreeningQuestionsCard } from "./tabs/application/screening-questions-card";
import { AttachmentsList } from "./tabs/attachments/attachments-list";
import { InterviewsList } from "./tabs/interviews/interviews-list";
// import { ScreeningQuestionsCard } from "./application-tab/screening-questions-card";
// import { Attachments } from "./attachments";
// import { CandidateCard } from "./candidate-card";
// import { InterviewsTab } from "./interviews-tab";

export function ApplicationSheet({
	application,
}: Omit<ApplicationCardProps, "setOpenSheet">) {
	const [open, setOpen] = useState(false);

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger className="w-full" asChild>
				<ApplicationCard application={application} setOpenSheet={setOpen} />
			</SheetTrigger>
			<SheetContent className="sm:max-w-xl w-[92%] sm:w-full">
				<SheetHeader>
					<SheetTitle>Application Details</SheetTitle>
				</SheetHeader>
				<Separator />
				<div className="overflow-y-scroll flex flex-col h-full gap-4">
					<section className="p-4 pb-0 space-y-4">
						<div className="flex items-center gap-4 ">
							{/* <Avatar>
								<AvatarImage
									src={application.candidate.avatar_url ?? undefined}
								/>
								<AvatarFallback>
									{(application.candidate.first_name?.[0] ?? "") +
										(application.candidate.last_name?.[0] ?? "")}
								</AvatarFallback>
							</Avatar> */}
							<div>
								<h3 className=" font-semibold text-lg">
									{application.candidate.first_name}{" "}
									{application.candidate.last_name}
								</h3>
								<Link
									href={`mailto:${application.candidate.email}`}
									className={buttonVariants({
										variant: "link",
										size: "sm",
										className: "!p-0 ",
									})}
								>
									{application.candidate.email}
								</Link>
							</div>
							<div className="flex flex-col sm:flex-row gap-1 ml-auto">
								<Button variant="success" size="xs">
									Hire
								</Button>
								<Button variant="destructive" size="xs">
									Reject
								</Button>
							</div>
						</div>
						<div className="flex items-center justify-between gap-2 flex-wrap text-sm">
							<div>
								<p className="text-muted-foreground">Phone Number</p>
								<Link
									href={`tel:${application.candidate.phone_number}`}
									className={buttonVariants({
										variant: "link",
										size: "sm",
										className: "!p-0",
									})}
								>
									<p>{application.candidate.phone_number}</p>
								</Link>
							</div>
							<div className="space-y-1">
								<p className="text-muted-foreground">
									Location{" "}
									{countriesMap.get(application.candidate.country)?.flag}
								</p>
								<p className="flex items-center gap-2">
									{application.candidate.country} , {application.candidate.city}
								</p>
							</div>
						</div>
					</section>
					<section className="flex items-center justify-between flex-wrap gap-4 p-4 text-sm">
						<div className="space-y-1">
							<p className="text-muted-foreground">Applied At</p>
							<p>{moment(application.created_at).format("MMM DD YYYY")}</p>
						</div>
						<div
							className={cn(
								"flex items-center gap-2 ",
								application.candidate_match &&
									(application.candidate_match >= 75
										? "text-success"
										: application.candidate_match >= 50
											? "text-warning"
											: "text-destructive"),
							)}
						>
							<span className="text-sm text-foreground">Candidate Match:</span>

							{application.candidate_match &&
								(application.candidate_match >= 75 ? (
									<BiSolidCircleThreeQuarter className="border rounded-full border-current size-3" />
								) : application.candidate_match >= 50 ? (
									<BiSolidCircleHalf className="border rounded-full border-current size-3" />
								) : (
									<BiSolidCircleQuarter className="border rounded-full border-current size-3" />
								))}
							<span className="text-sm">{application.candidate_match}%</span>
						</div>
						<div className="space-y-1">
							<p className="text-muted-foreground">Origin</p>
							<p>{application.source}</p>
						</div>
					</section>

					<Tabs defaultValue="application" className="flex-1 flex flex-col">
						<TabsList className="bg-transparent p-4 my-2 justify-start">
							<TabsTrigger
								value="application"
								className="group data-[state=active]:bg-accent data-[state=active]:border data-[state=active]:shadow-none"
							>
								Application
							</TabsTrigger>
							<TabsTrigger
								value="attachment"
								className=" data-[state=active]:bg-accent data-[state=active]:border data-[state=active]:shadow-none"
							>
								Attachments
							</TabsTrigger>
							<TabsTrigger
								value="interviews"
								className=" data-[state=active]:bg-accent data-[state=active]:border data-[state=active]:shadow-none"
							>
								Interviews
							</TabsTrigger>
						</TabsList>

						<TabsContent
							value="application"
							className="flex-1 px-4 pb-4 space-y-4"
						>
							<HiringStages application={application} />
							<EducationsCard candidateId={application.candidate_id} />
							<ExperiencesCard candidateId={application.candidate_id} />
							<ScreeningQuestionsCard application={application} />
						</TabsContent>
						<TabsContent value="attachment" className="flex-1 px-4 pb-4">
							<AttachmentsList applicationId={application.id} />
						</TabsContent>
						<TabsContent value="interviews" className="h-full  flex-col flex ">
							<InterviewsList />
						</TabsContent>
					</Tabs>
				</div>
			</SheetContent>
		</Sheet>
	);
}
