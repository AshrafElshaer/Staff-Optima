"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { jobPostCampaignInsertSchema } from "@optima/supabase/validations";
import { Button } from "@optima/ui/components/button";
import { Checkbox } from "@optima/ui/components/checkbox";
import { DatePicker } from "@optima/ui/components/date-picker";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@optima/ui/components/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@optima/ui/components/form";
import { Input } from "@optima/ui/components/inputs";
import { Label } from "@optima/ui/components/label";
import moment from "moment";
import { useForm } from "react-hook-form";
import { z } from "zod";

type LaunchCampaignProps = {
	jobPostId: string;
};

const formSchema = jobPostCampaignInsertSchema
	.extend({
		start_time: z.string().min(5, { message: "Start time is required" }),
		end_time: z.string().optional(),
	})
	.refine(
		(data) => {
			if (data.end_date && !data.end_time) {
				return false;
			}
			return true;
		},
		{
			message: "End time is required when end date is set",
			path: ["end_time"],
		},
	);

export function LaunchCampaign({ jobPostId }: LaunchCampaignProps) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			job_post_id: jobPostId,
			company_id: "",
			start_date: new Date(),
			end_date: null,
			is_integration_enabled: false,
			status: "active",
			start_time: "",
			end_time: "",
		},
	});
	function onSubmit(data: z.infer<typeof formSchema>) {
		console.log(data);
	}
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="w-fit ml-auto" variant="secondary" size="sm">
					Launch Campaign
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Launch Campaign</DialogTitle>
					<DialogDescription>
						Launch a campaign for your job post.
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className="p-4 space-y-8">
							<div className="grid grid-cols-2 items-start gap-4">
								<FormField
									control={form.control}
									name="start_date"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Start Date</FormLabel>
											<FormControl>
												<DatePicker
													date={
														field.value
															? moment(field.value).toDate()
															: undefined
													}
													setDate={field.onChange}
													fromDate={moment().toDate()}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="start_time"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Start Time</FormLabel>
											<FormControl>
												<Input
													type="time"
													{...field}
													disabled={!form.watch("start_date")}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className="grid grid-cols-2 items-start gap-4">
								<FormField
									control={form.control}
									name="end_date"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												End Date
												<span className="text-xs text-muted-foreground">
													(Optional)
												</span>
											</FormLabel>
											<FormControl>
												<DatePicker
													date={
														field.value
															? moment(field.value).toDate()
															: undefined
													}
													setDate={field.onChange}
													fromDate={moment(form.watch("start_date")).toDate()}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="end_time"
									render={({ field }) => (
										<FormItem>
											<FormLabel>End Time</FormLabel>
											<FormControl>
												<Input
													type="time"
													{...field}
													disabled={!form.watch("end_date")}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<FormField
								control={form.control}
								name="is_integration_enabled"
								render={({ field }) => (
									<FormItem className="flex items-start gap-2">
										<FormControl>
											<div className="flex items-start gap-2 ">
												<Checkbox
													id="publish-job-checkbox"
													checked={field.value}
													onCheckedChange={(isChecked) =>
														field.onChange(!!isChecked)
													}
													// disabled={true}
													aria-describedby="publish-job-checkbox-description"
													aria-controls="publish-job-checkbox-input"
												/>
												<div className="grow">
													<div className="grid gap-2">
														<Label htmlFor="publish-job-checkbox">
															Launch with Integrated Apps{" "}
															<span className="text-xs text-muted-foreground">
																(Optional)
															</span>
														</Label>
														<p
															id="publish-job-checkbox-description"
															className="text-sm text-muted-foreground"
														>
															Publish your job posting through connected
															platforms.
														</p>
													</div>
												</div>
											</div>
										</FormControl>
									</FormItem>
								)}
							/>
						</div>
						<DialogFooter className="flex-row">
							<DialogClose asChild>
								<Button variant="outline" className="flex-1" type="button">
									Cancel
								</Button>
							</DialogClose>
							<Button
								type="submit"
								className="flex-1"
								disabled={form.formState.isSubmitting}
							>
								Launch
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
