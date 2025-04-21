"use client";

import { DepartmentSelector } from "@/components/selectors/department-selector";
import { EmploymentTypeSelector } from "@/components/selectors/employment-type-selector";
import { ExperienceLevelSelector } from "@/components/selectors/experience-level-selector";
import { WorkModeSelector } from "@/components/selectors/work-mode-selector";
import Editor from "@optima/editor";
import { Button } from "@optima/ui/components/button";
import { Checkbox } from "@optima/ui/components/checkbox";

import { queryClient } from "@/lib/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import type { JobPost } from "@optima/supabase/types";
import { jobPostSchema } from "@optima/supabase/validations";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@optima/ui/components/form";
import { Icons } from "@optima/ui/components/icons";
import { Input, TagsInput } from "@optima/ui/components/inputs";
import { Label } from "@optima/ui/components/label";
import { CheckmarkBadge03Icon } from "hugeicons-react";
import { X } from "lucide-react";
import { useAction } from "next-safe-action/hooks";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import {
	createJobPostAction,
	updateJobPostAction,
} from "../../job-post.actions";
import { ScreeningQuestionSheet } from "./screening-question-sheet";
// import { PublishJobDialog } from "./publish-job-dialog";

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

type JobPostFormProps = {
	job: JobPost | null;
};
export function JobPostForm({ job }: JobPostFormProps) {
	const { execute: createJobPost, isExecuting: isCreating } = useAction(
		createJobPostAction,
		{
			onSuccess: () => {
				toast.success("Job post created successfully");
			},
			onError: ({ error }) => {
				toast.error(error.serverError);
			},
		},
	);

	const { execute: updateJobPost, isExecuting: isUpdating } = useAction(
		updateJobPostAction,
		{
			onSuccess: () => {
				toast.success("Job post updated successfully");
				queryClient.invalidateQueries({ queryKey: ["job-post", job?.id] });
			},
			onError: ({ error }) => {
				toast.error(error.serverError);
			},
		},
	);

	const form = useForm<z.infer<typeof jobPostSchema>>({
		resolver: zodResolver(jobPostSchema),
		defaultValues: {
			id: job?.id ?? "",
			benefits: job?.benefits ?? [],
			screening_questions: job?.screening_questions ?? null,
			required_skills: job?.required_skills ?? [],
			salary_range: job?.salary_range ?? "",
			title: job?.title ?? "",
			department_id: job?.department_id ?? "",
			job_details: job?.job_details ?? "",
			created_at: job?.created_at ?? "",
			updated_at: job?.updated_at ?? "",
			company_id: job?.company_id ?? "",
			created_by: job?.created_by ?? "",
			work_mode: job?.work_mode ?? undefined,
			experience_level: job?.experience_level ?? undefined,
			employment_type: job?.employment_type ?? undefined,
			status: job?.status ?? "draft",
			location: job?.location ?? "",
		},
	});

	function handleSubmit(data: z.infer<typeof jobPostSchema>) {
		if (data.id.length > 0) {
			updateJobPost(data);
		} else {
			const { id, created_at, updated_at, company_id, created_by, ...rest } =
				data;
			createJobPost({
				...rest,
			});
		}
	}
	return (
		<Form {...form}>
			<form
				className="flex flex-col gap-12 flex-1 w-full"
				onSubmit={form.handleSubmit(handleSubmit)}
			>
				<section className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
					{/* <BackButton /> */}
					<div className="flex items-center gap-4 sm:ml-auto w-full sm:w-auto">
						<Button
							size="sm"
							className="w-full sm:w-auto"
							type="submit"
							disabled={isCreating || isUpdating}
						>
							{isCreating || isUpdating ? (
								<Icons.Loader className="size-4 animate-spin" />
							) : (
								<CheckmarkBadge03Icon className="size-4" strokeWidth={2} />
							)}
							Save
						</Button>
					</div>
				</section>

				<section className="flex flex-col lg:flex-row items-start gap-8 pl-[3px]">
					<div className="flex-1 space-y-6 w-full">
						<div className="flex flex-col md:flex-row items-start gap-8 w-full">
							<FormField
								control={form.control}
								name="title"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Job Title</FormLabel>
										<FormControl>
											<Input
												placeholder="Senior Software Engineer"
												{...field}
												value={field.value || ""}
												onChange={(e) => field.onChange(e.target.value)}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="department_id"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Department</FormLabel>
										<FormControl>
											<DepartmentSelector
												onChange={field.onChange}
												value={field.value || ""}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className="flex flex-col md:flex-row items-start gap-8">
							<FormField
								control={form.control}
								name="work_mode"
								render={({ field }) => (
									<FormItem className="flex-1 w-full">
										<FormLabel>Work Mode</FormLabel>
										<FormControl>
											<WorkModeSelector
												onChange={field.onChange}
												value={field.value || ""}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="employment_type"
								render={({ field }) => (
									<FormItem className="flex-1 w-full">
										<FormLabel>Employment Type</FormLabel>
										<FormControl>
											<EmploymentTypeSelector
												onChange={field.onChange}
												value={field.value}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className="flex flex-col md:flex-row items-start gap-8">
							<FormField
								control={form.control}
								name="salary_range"
								render={({ field }) => (
									<FormItem className="flex-1 w-full">
										<FormLabel>
											Salary Range
											<span className="text-muted-foreground text-sm ml-2">
												(Optional)
											</span>
										</FormLabel>
										<FormControl>
											<Input
												placeholder="$100,000 - $150,000"
												{...field}
												value={field.value || ""}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="experience_level"
								render={({ field }) => (
									<FormItem className="flex-1 gap-4 w-full">
										<FormLabel>Experience Level</FormLabel>
										<FormControl>
											<ExperienceLevelSelector
												onChange={field.onChange}
												value={field.value}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<FormField
							control={form.control}
							name="location"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>
										Location
										<span className="text-muted-foreground text-sm ml-2">
											(Optional)
										</span>
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											value={field.value || ""}
											placeholder="San Francisco, CA"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="required_skills"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>
										Required Skills
										<span className="text-muted-foreground text-sm ml-2">
											(Optional) Separated by enter key
										</span>
									</FormLabel>
									<FormControl>
										<TagsInput
											onChange={(value) =>
												// @ts-ignore
												field.onChange(value.map((tag) => tag.text))
											}
											tags={
												field.value?.map((skill: string) => ({
													id: skill,
													text: skill,
												})) || []
											}
											placeholder="Add a skill"
											containerClassName="min-h-20 items-start justify-start"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
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
							{form.watch("screening_questions")?.map((question, index) => (
								<div
									className="relative bg-accent flex items-center rounded-md p-2 border"
									key={index.toString()}
								>
									<ScreeningQuestionSheet
										jobPostForm={form}
										question={question}
										index={index}
									>
										<div className="text-sm flex-col items-start pr-8 font-medium flex-1 cursor-pointer">
											<span className="flex-1">{question.question}</span>
											<div className="flex items-center gap-2">
												<span className="text-muted-foreground text-sm capitalize">
													{question.type.replace("-", " ")}
												</span>

												<span className="text-muted-foreground text-sm ">
													- {question.is_required ? "Required" : "Optional"}
												</span>
											</div>
										</div>
									</ScreeningQuestionSheet>

									<Button
										variant="ghost"
										size="icon"
										type="button"
										className="size-4 absolute right-2 top-3"
										onClick={() =>
											form.setValue(
												"screening_questions",
												form
													.getValues("screening_questions")
													?.filter((_, i) => i !== index) || [],
											)
										}
									>
										<X className="size-4" />
									</Button>
								</div>
							))}
							<ScreeningQuestionSheet jobPostForm={form} />
						</div>
					</div>
				</section>

				<section className="w-full space-y-8">
					<FormField
						control={form.control}
						name="benefits"
						render={({ field }) => (
							<FormItem className="space-y-8">
								<FormLabel className="font-medium text-base ">
									Company Benefits
									<span className="text-muted-foreground text-sm ml-2">
										(Optional)
									</span>
								</FormLabel>
								<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
									{COMPANY_BENEFITS.map((benefit) => (
										<div className="flex items-start gap-2" key={benefit}>
											<Checkbox
												id={benefit}
												checked={
													form.watch("benefits")?.includes(benefit) || false
												}
												onCheckedChange={(checked) =>
													form.setValue(
														"benefits",
														checked
															? [...(form.watch("benefits") || []), benefit]
															: (form.watch("benefits") || []).filter(
																	(b) => b !== benefit,
																),
														{
															shouldDirty: true,
														},
													)
												}
											/>
											<Label htmlFor={benefit}>{benefit}</Label>
										</div>
									))}
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>
				</section>

				<FormField
					control={form.control}
					name="job_details"
					render={({ field }) => (
						<FormItem className="w-full flex-1 flex flex-col ">
							<FormLabel className="font-medium text-base">
								Job Description
							</FormLabel>
							<p className="text-muted-foreground ">
								Provide a detailed description of the job posting.
							</p>
							<FormMessage />
							<FormControl>
								<div className="flex flex-col flex-1 border rounded-md [&>*:first-child]:flex-1 p-4 min-h-96">
									<Editor
										content={field.value || ""}
										onChange={(content) => {
											form.setValue("job_details", content, {
												shouldDirty: true,
												shouldTouch: true,
											});
										}}
										companyId={job?.company_id ?? ""}
									/>
								</div>
							</FormControl>
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
}
