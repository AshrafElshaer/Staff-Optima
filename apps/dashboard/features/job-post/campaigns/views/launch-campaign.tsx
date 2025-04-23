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
import { Icons } from "@optima/ui/components/icons";
import { Input } from "@optima/ui/components/inputs";
import { Label } from "@optima/ui/components/label";
import moment from "moment";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { launchCampaignAction } from "../campaigns.actions";

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
	const [open, setOpen] = useState(false);
	const { execute, isExecuting } = useAction(launchCampaignAction, {
		onSuccess: () => {
			toast.success("Campaign scheduled successfully");
			setOpen(false);
			form.reset();
		},
		onError: ({ error }) => {
			toast.error(error.serverError || "Something went wrong");
		},
	});
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			job_post_id: jobPostId,
			company_id: "",
			start_date: new Date(),
			end_date: null,
			is_integration_enabled: false,
			status: "scheduled",
			start_time: "",
			end_time: "",
		},
	});
	function onSubmit(data: z.infer<typeof formSchema>) {
		const start_date = moment(data.start_date)
			.hour(Number.parseInt(data.start_time.split(":")[0] ?? "0"))
			.minute(Number.parseInt(data.start_time.split(":")[1] ?? "0"))
			.toDate();

		const end_date = data.end_date
			? moment(data.end_date)
					.hour(Number.parseInt(data.end_time?.split(":")[0] ?? "0"))
					.minute(Number.parseInt(data.end_time?.split(":")[1] ?? "0"))
					.toDate()
			: null;

		const payload = {
			job_post_id: data.job_post_id,
			is_integration_enabled: data.is_integration_enabled,
			status: data.status,
			start_date,
			end_date,
		};
		if (payload.start_date < new Date()) {
			toast.error("Start date cannot be in the past");
			return;
		}

		if (payload.end_date && payload.end_date < payload.start_date) {
			toast.error("End date cannot be before start date");
			return;
		}
		execute(payload);
	}
	return (
		<Dialog
			open={open}
			onOpenChange={(value) => {
				if (!isExecuting) setOpen(value);
			}}
		>
			<DialogTrigger asChild>
				<Button
					className="w-full sm:w-fit ml-auto"
					variant="secondary"
					size="sm"
				>
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
													wrapperClassName="w-full"
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
													wrapperClassName="w-full"
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
													disabled={true}
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
															Launch your job posting through connected
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
								<Button
									variant="outline"
									className="flex-1"
									type="button"
									disabled={isExecuting}
								>
									Cancel
								</Button>
							</DialogClose>
							<Button type="submit" className="flex-1" disabled={isExecuting}>
								{isExecuting ? (
									<Icons.Loader className="w-4 h-4 animate-spin" />
								) : null}
								Launch
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
