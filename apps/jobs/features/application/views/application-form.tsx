"use client";
import {
	type AttachmentType,
	type JobPost,
	attachmentTypeEnum,
} from "@optima/supabase/types";
import { Button } from "@optima/ui/components/button";
import { DatePickerWithSelect } from "@optima/ui/components/date-picker-with-select";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@optima/ui/components/dropdown-menu";
import {
	AutoResizeTextArea,
	Input,
	PhoneInput,
	TagsInput,
	UrlInput,
} from "@optima/ui/components/inputs";
import type { Country } from "react-phone-number-input";

import { zodResolver } from "@hookform/resolvers/zod";
import type { candidateSocialLinkInsertSchema } from "@optima/supabase/validations";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@optima/ui/components/form";
import { Label } from "@optima/ui/components/label";
import { CountrySelector } from "@optima/ui/components/selectors/country-selector";
import { GenderSelector } from "@optima/ui/components/selectors/gender-selector";
import { TimezoneSelector } from "@optima/ui/components/selectors/timezone-selector";

import { Separator } from "@optima/ui/components/separator";
import { Loading03Icon } from "hugeicons-react";
import { X } from "lucide-react";
import moment from "moment";
import { useAction } from "next-safe-action/hooks";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosSend } from "react-icons/io";

// import { createApplicationAction } from "@/acttions/apply-for-job";
import { calculateCandidateMatch } from "@/lib/ai/get-candidate-match";
import { countriesMap } from "@optima/location";
import { Checkbox } from "@optima/ui/components/checkbox";
import { RadioGroup, RadioGroupItem } from "@optima/ui/components/radio-group";
import { toast } from "sonner";
import type { z } from "zod";
import { zfd } from "zod-form-data";
import { ExtraFiles } from "../../../components/drop-zones/extra-files";
import { UploadTranscript } from "../../../components/drop-zones/upload-transcript";
import { UploadResume } from "../../../components/drop-zones/uploasd-resume";
import { formSchema, getDefaultValues } from "../application.schema";

type ApplicationFormProps = {
	job: JobPost;
};

export function ApplicationForm({ job }: ApplicationFormProps) {
	const [isSubmitting, setIsSubmitting] = useState(false);

	//   const { executeAsync: applyForJob } = useAction(createApplicationAction);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: getDefaultValues(job),
	});

	const experiences = useMemo(() => {
		return form.watch("experience");
	}, [form.watch("experience")]);

	const educations = useMemo(() => {
		return form.watch("education");
	}, [form.watch("education")]);

	const socialLinks = useMemo(() => {
		return form.watch("social_links");
	}, [form.watch("social_links")]);

	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		setIsSubmitting(true);

		// toast.promise(
		//   async () => {
		//     const { candidate, application, attachments } = data;

		//     const candidateMatch = await calculateCandidateMatch(
		//       job,
		//       {
		//         ...candidate,
		//         id: "",
		//         created_at: new Date().toISOString(),
		//         updated_at: new Date().toISOString(),
		//       },
		//       {
		//         ...application,
		//         id: "",
		//         created_at: new Date().toISOString(),
		//         updated_at: new Date().toISOString(),
		//         candidate_id: "",
		//         stage_id: "",
		//       },
		//     );
		//     const result = await applyForJob({
		//       candidate,
		//       application: {
		//         ...data.application,
		//         candidate_match: candidateMatch,
		//       },
		//       attachments,
		//     });

		//     if (result?.serverError) {
		//       throw new Error(result.serverError);
		//     }
		//   },
		//   {
		//     loading: "Submitting your application... please dont close the page",
		//     success: () => {
		//       form.reset();
		//       return "Application submitted successfully";
		//     },
		//     error: (error) => error.message,
		//     finally: () => {
		//       setIsSubmitting(false);
		//     },
		//   },
		// );
	};

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<section className="flex flex-col gap-4">
						<UploadResume form={form} />

						{/* Personal Information */}
						<div className="flex flex-col md:flex-row items-center gap-8 w-full">
							<FormField
								control={form.control}
								name="candidate.first_name"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>First Name</FormLabel>
										<FormControl>
											<Input placeholder="John" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="candidate.last_name"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Last Name</FormLabel>
										<FormControl>
											<Input placeholder="Doe" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className="flex flex-col md:flex-row items-center gap-8 w-full">
							<FormField
								control={form.control}
								name="candidate.email"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input placeholder="john.doe@example.com" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="candidate.phone_number"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Phone Number</FormLabel>
										<FormControl>
											<PhoneInput
												onChange={(value) => field.onChange(value)}
												value={field.value ?? undefined}
												defaultCountry={
													(countriesMap.get(form.watch("candidate.country"))
														?.cca2 as Country) ?? undefined
												}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className="flex flex-col md:flex-row items-center gap-8 w-full">
							<FormField
								control={form.control}
								name="candidate.country"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Country</FormLabel>
										<FormControl>
											<CountrySelector
												value={field.value}
												setValue={field.onChange}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="candidate.city"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>City, State</FormLabel>
										<FormControl>
											<Input placeholder="Los Angeles, CA" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<FormField
							control={form.control}
							name="candidate.timezone"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Timezone</FormLabel>
									<FormControl>
										<TimezoneSelector
											value={field.value}
											onValueChange={field.onChange}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="flex flex-col md:flex-row items-center gap-8 w-full">
							<FormField
								control={form.control}
								name="candidate.gender"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Gender</FormLabel>
										<FormControl>
											<GenderSelector
												value={field.value}
												setValue={field.onChange}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="candidate.date_of_birth"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Date of Birth</FormLabel>
										<FormControl>
											<DatePickerWithSelect
												date={
													field.value
														? moment(field.value).toDate()
														: moment().subtract(16, "years").toDate()
												}
												setDate={(date) => field.onChange(date?.toISOString())}
												toDate={moment().subtract(16, "years").toDate()}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						{/* Education */}
						<Label className="text-lg font-bold">
							Educations & Certifications
						</Label>
						<UploadTranscript form={form} />

						{educations.map((edu, index) => (
							<div key={index.toString()} className="space-y-4">
								<div className="flex flex-col md:flex-row items-center gap-8 w-full">
									<FormField
										control={form.control}
										name={`education.${index}.institution`}
										render={({ field }) => (
											<FormItem className="w-full">
												<FormLabel>Institution</FormLabel>
												<FormControl>
													<Input
														placeholder="University of California, Los Angeles"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`education.${index}.degree`}
										render={({ field }) => (
											<FormItem className="w-full">
												<FormLabel>Degree</FormLabel>
												<FormControl>
													<Input
														placeholder="Bachelor of Science"
														{...field}
														value={field.value ?? ""}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className="flex flex-col md:flex-row items-center gap-8 w-full mt-4">
									<FormField
										control={form.control}
										name={`education.${index}.field_of_study`}
										render={({ field }) => (
											<FormItem className="w-full">
												<FormLabel>Field of Study</FormLabel>
												<FormControl>
													<Input
														placeholder="Computer Science"
														{...field}
														value={field.value ?? ""}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`education.${index}.grade`}
										render={({ field }) => (
											<FormItem className="w-full">
												<FormLabel>Grade</FormLabel>
												<FormControl>
													<Input
														placeholder="3.5"
														{...field}
														value={field.value ?? ""}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<div className="flex flex-col md:flex-row items-center gap-8 w-full mt-4">
									<FormField
										control={form.control}
										name={`education.${index}.start_date`}
										render={({ field }) => (
											<FormItem className="w-full">
												<FormLabel>Start Date</FormLabel>
												<FormControl>
													<DatePickerWithSelect
														date={
															field.value
																? moment(field.value).toDate()
																: undefined
														}
														setDate={(date) =>
															field.onChange(date?.toISOString() ?? "")
														}
														toDate={moment().toDate()}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`education.${index}.end_date`}
										render={({ field }) => (
											<FormItem className="w-full">
												<FormLabel>End Date</FormLabel>
												<FormControl>
													<DatePickerWithSelect
														date={
															field.value
																? moment(field.value).toDate()
																: undefined
														}
														setDate={(date) =>
															field.onChange(date?.toISOString() ?? "")
														}
														toDate={moment().toDate()}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<div className="flex justify-end">
									<Button
										disabled={isSubmitting}
										type="button"
										variant="destructive"
										size="sm"
										onClick={() => {
											form.setValue(
												"education",
												form
													.getValues("education")
													.filter((_, i) => i !== index),
											);
										}}
									>
										Remove
									</Button>
								</div>

								<Separator />
							</div>
						))}

						<Button
							disabled={isSubmitting}
							type="button"
							variant="outline"
							onClick={() => {
								const currentEducations = form.getValues("education") || [];
								form.setValue("education", [
									...currentEducations,
									{
										institution: "",
										degree: "",
										end_date: "",
										grade: "",
										start_date: "",
										company_id: "",
										candidate_id: "",
										field_of_study: "",
									},
								]);
							}}
						>
							Add Education or Certification
						</Button>

						{/* Experience */}
						<Label className="text-lg font-bold">Experience</Label>

						{experiences.map((exp, index) => (
							<div key={index.toString()} className="space-y-4">
								<div className="flex flex-col md:flex-row items-center gap-8 w-full">
									<FormField
										control={form.control}
										name={`experience.${index}.company`}
										render={({ field }) => (
											<FormItem className="w-full">
												<FormLabel>Company</FormLabel>
												<FormControl>
													<Input placeholder="Google" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`experience.${index}.job_title`}
										render={({ field }) => (
											<FormItem className="w-full">
												<FormLabel>Job Title</FormLabel>
												<FormControl>
													<Input placeholder="Software Engineer" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<div className="flex flex-col md:flex-row items-center gap-8 w-full">
									<FormField
										control={form.control}
										name={`experience.${index}.start_date`}
										render={({ field }) => (
											<FormItem className="w-full">
												<FormLabel>Start Date</FormLabel>
												<FormControl>
													<DatePickerWithSelect
														date={
															field.value
																? moment(field.value).toDate()
																: undefined
														}
														setDate={(date) =>
															field.onChange(date?.toISOString())
														}
														toDate={moment().toDate()}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`experience.${index}.end_date`}
										render={({ field }) => (
											<FormItem className="w-full">
												<FormLabel>
													End Date
													<span className="text-sm text-muted-foreground ml-2">
														if Present, leave blank
													</span>
												</FormLabel>
												<FormControl>
													<DatePickerWithSelect
														date={
															field.value
																? moment(field.value).toDate()
																: undefined
														}
														setDate={(date) =>
															field.onChange(date?.toISOString())
														}
														toDate={moment().toDate()}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<FormField
									control={form.control}
									name={`experience.${index}.description`}
									render={({ field }) => (
										<FormItem className="w-full">
											<FormLabel>Key Responsibilities & Achievements</FormLabel>
											<FormControl>
												<AutoResizeTextArea
													placeholder="I was responsible for..."
													defaultRows={3}
													{...field}
													value={field.value ?? ""}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name={`experience.${index}.skills`}
									render={({ field }) => (
										<FormItem className="w-full">
											<FormLabel>
												Skills & Technologies
												<span className="text-muted-foreground text-sm ml-2">
													(Optional) Separated by enter key
												</span>
											</FormLabel>
											<FormControl>
												<TagsInput
													onChange={(value) => {
														// @ts-ignore
														field.onChange(value.map((tag) => tag.text));
													}}
													tags={
														field.value?.map((skill) => ({
															id: skill,
															text: skill,
														})) ?? []
													}
													placeholder="Add a skill"
													containerClassName="w-full min-h-20 items-start justify-start"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<div className="flex justify-end">
									<Button
										disabled={isSubmitting}
										type="button"
										variant="destructive"
										size="sm"
										onClick={() => {
											form.setValue(
												"experience",
												form
													.getValues("experience")
													.filter((_, i) => i !== index),
											);
										}}
									>
										Remove
									</Button>
								</div>

								<Separator />
							</div>
						))}

						<Button
							disabled={isSubmitting}
							type="button"
							variant="outline"
							onClick={() => {
								form.setValue("experience", [
									...form.getValues("experience"),
									{
										company: "",
										job_title: "",
										start_date: "",
										end_date: null,
										description: "",
										skills: [],
										company_id: "",
										candidate_id: "",
									},
								]);
							}}
						>
							Add Experience
						</Button>

						{/* Social Links */}
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<Label className="text-lg font-bold">Social Links</Label>
								<AddLink
									isSubmitting={isSubmitting}
									setLinks={(value) =>
										form.setValue("social_links", [
											...form.getValues("social_links"),
											value,
										])
									}
								/>
							</div>
							{form.watch("social_links").map((link, index) => (
								<FormField
									key={index.toString()}
									control={form.control}
									name={`social_links.${index}.url`}
									render={({ field }) => (
										<FormItem className="w-full">
											<FormLabel className="capitalize">
												{link.platform}
											</FormLabel>
											<div className="flex items-center gap-2 w-full">
												<FormControl>
													<UrlInput
														className="w-full"
														wrapperClassName="w-full"
														placeholder={`www.${link.platform}.com/john-doe`}
														{...field}
														value={field.value ?? ""}
													/>
												</FormControl>
												{link.platform !== "linkedin" && (
													<Button
														disabled={isSubmitting}
														type="button"
														variant="destructive"
														size="icon"
														onClick={() => {
															const currentLinks =
																form.getValues("social_links");
															form.setValue(
																"social_links",
																currentLinks.filter((_, i) => i !== index),
															);
														}}
													>
														<X />
													</Button>
												)}
											</div>
											<FormMessage />
										</FormItem>
									)}
								/>
							))}
						</div>

						{/* Screening Questions */}
						<div className="space-y-4">
							{job.screening_questions &&
								job.screening_questions?.length > 0 && (
									<Label className="text-lg font-bold">
										Screening Questions
									</Label>
								)}
							{job.screening_questions?.map((question, index) => (
								<FormField
									key={question.question}
									control={form.control}
									name={`application.screening_question_answers.${index}`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												{question.question}
												{question.is_required && (
													<span className="text-sm text-muted-foreground ml-2">
														(Required)
													</span>
												)}
											</FormLabel>
											<FormControl>
												<div className="w-full py-2">
													{question.type === "text" && (
														<AutoResizeTextArea
															defaultRows={3}
															value={field.value.answer}
															placeholder="Type your answer here"
															onChange={(e) => {
																field.onChange({
																	...field.value,
																	answer: e.target.value,
																});
															}}
														/>
													)}
													{question.type === "single-choice" && (
														<RadioGroup
															onValueChange={(value) => {
																field.onChange({
																	...field.value,
																	answer: value,
																});
															}}
															defaultValue={field.value.answer as string}
															className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2"
														>
															{question.options?.map((option) => (
																<FormItem
																	key={option}
																	className="flex items-center space-x-3 space-y-0"
																>
																	<FormControl>
																		<RadioGroupItem value={option} />
																	</FormControl>
																	<FormLabel className="font-normal">
																		{option}
																	</FormLabel>
																</FormItem>
															))}
														</RadioGroup>
													)}
													{question.type === "multiple-choice" && (
														<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-2">
															{question.options?.map((option) => (
																<FormItem
																	key={option}
																	className="flex items-center space-x-2 space-y-0"
																>
																	<FormControl>
																		<Checkbox
																			checked={field.value.answer.includes(
																				option,
																			)}
																			onCheckedChange={(checked) => {
																				const answers = field.value
																					.answer as string[];
																				if (checked) {
																					field.onChange({
																						...field.value,
																						answer: [...answers, option],
																					});
																				} else {
																					field.onChange({
																						...field.value,
																						answer: answers.filter(
																							(a) => a !== option,
																						),
																					});
																				}
																			}}
																		/>
																	</FormControl>
																	<FormLabel className="font-normal">
																		{option}
																	</FormLabel>
																</FormItem>
															))}
														</div>
													)}
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							))}
						</div>

						{/* Attachments */}
						<div className="space-y-4">
							<Label className="text-base">
								Attachments
								<span className="text-sm text-muted-foreground ml-2">
									(Optional) Upload additional documents (cover letter, letter
									of recommendation, etc.)
								</span>
							</Label>

							<ExtraFiles form={form} />
						</div>

						<Button type="submit" className="mt-4" disabled={isSubmitting}>
							{isSubmitting ? (
								<Loading03Icon className="size-4 animate-spin" />
							) : (
								<IoIosSend className="size-4" />
							)}
							Submit Application
						</Button>
					</section>
				</form>
			</Form>
		</>
	);
}

const linkOptions = [
	{ label: "GitHub", value: "github" },
	{ label: "Portfolio", value: "portfolio" },
	{ label: "X (Twitter)", value: "x (twitter)" },
	{ label: "Instagram", value: "instagram" },
	{ label: "Facebook", value: "facebook" },
	{ label: "Other", value: "other" },
];

function AddLink({
	setLinks,
	isSubmitting,
}: {
	setLinks: (value: z.infer<typeof candidateSocialLinkInsertSchema>) => void;
	isSubmitting: boolean;
}) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					type="button"
					size="sm"
					disabled={isSubmitting}
				>
					Add Link
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{linkOptions.map((option) => (
					<DropdownMenuItem
						key={option.value}
						onClick={() =>
							setLinks({
								url: "",
								candidate_id: "",
								company_id: "",
								platform: option.value,
							})
						}
					>
						{option.label}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
