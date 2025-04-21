"use client";

import { Button } from "@optima/ui/components/button";
import { Checkbox } from "@optima/ui/components/checkbox";

import { Label } from "@optima/ui/components/label";
import { Skeleton } from "@optima/ui/components/skeleton";
import { CheckmarkBadge03Icon } from "hugeicons-react";
import { PlusIcon } from "lucide-react";

const COMPANY_BENEFITS = [
	"Health Insurance",
	"Dental Insurance",
	"Vision Insurance",
	"Mental Health Resources",
	"401(k) Retirement Plan",
	"Competitive Salary with Performance Bonuses",
	"Stock Options / Equity Grants",
	"Profit Sharing or Revenue Sharing",
	"Paid Time Off (PTO)",
	"Flexible Spending Accounts (FSAs)",
	"Employee Assistance Program (EAP)",
	"Employee Discounts",
];

export function JobPostFormLoading() {
	return (
		<div className="flex flex-col gap-12 flex-1 w-full">
			<section className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
				{/* <BackButton /> */}
				<div className="flex items-center gap-4 sm:ml-auto w-full sm:w-auto">
					<Button size="sm" className="w-full sm:w-auto" disabled>
						<CheckmarkBadge03Icon className="size-4" strokeWidth={2} />
						Save
					</Button>
				</div>
			</section>

			<section className="flex flex-col lg:flex-row items-start gap-8 pl-px">
				<div className="flex-1 space-y-6 w-full">
					<div className="flex flex-col md:flex-row items-start gap-8 w-full">
						<div className="space-y-3 w-full">
							<Label>Job Title</Label>
							<Skeleton className="h-9 w-full border" />
						</div>
						<div className="space-y-3 w-full">
							<Label>Department</Label>
							<Skeleton className="h-9 w-full border" />
						</div>
					</div>

					<div className="flex flex-col md:flex-row items-start gap-8">
						<div className="space-y-3 w-full">
							<Label>Work Mode</Label>
							<Skeleton className="h-9 w-full border" />
						</div>
						<div className="space-y-3 w-full">
							<Label>Employment Type</Label>
							<Skeleton className="h-9 w-full border" />
						</div>
					</div>

					<div className="flex flex-col md:flex-row items-start gap-8">
						<div className="space-y-3 w-full">
							<Label>Salary Range</Label>
							<Skeleton className="h-9 w-full border" />
						</div>
						<div className="space-y-3 w-full">
							<Label>Experience Level</Label>
							<Skeleton className="h-9 w-full border" />
						</div>
					</div>
					<div className="space-y-3 w-full">
						<Label>Location</Label>
						<Skeleton className="h-9 w-full border" />
					</div>
					<div className="space-y-3 w-full">
						<Label>Required Skills</Label>
						<Skeleton className="h-24 w-full border" />
					</div>
				</div>

				<div className="w-full flex-1 flex flex-col h-full">
					<Label className="mb-2">
						Screening Questions
						<span className="text-muted-foreground ml-2">(Optional)</span>
					</Label>
					<span className="text-muted-foreground text-sm mb-4">
						These questions will be added to the job application and the
						candidate will be able to answer them.
					</span>
					<div className="flex flex-col flex-1 gap-4 border rounded-md p-4">
						<Button className="w-full mt-auto" variant="secondary" disabled>
							<PlusIcon className="size-4" />
							Add Question
						</Button>
					</div>
				</div>
			</section>

			<section className="w-full space-y-8">
				<div className="space-y-8">
					<Label className="font-medium text-base">
						Company Benefits
						<span className="text-muted-foreground text-sm ml-2">
							(Optional)
						</span>
					</Label>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{COMPANY_BENEFITS.map((benefit) => (
							<div className="flex items-start gap-2" key={benefit}>
								<Checkbox id={benefit} disabled />
								<Label htmlFor={benefit}>{benefit}</Label>
							</div>
						))}
					</div>
				</div>
			</section>
			<div className="space-y-3">
				<Label>Job Details</Label>
				<p className="text-muted-foreground">
					Provide the location of the job posting.
				</p>
				<Skeleton className="min-h-96 w-full border" />
			</div>
		</div>
	);
}
