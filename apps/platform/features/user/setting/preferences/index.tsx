// "use client";
// import { useActionBar } from "@/hooks/use-action-bar";
// import { useUserPreferences } from "@/hooks/use-user-preferences";
// import { zodResolver } from "@hookform/resolvers/zod";
// import type {
// 	UserAvailability,
// 	UserPreferences as UserPreferencesType,
// } from "@optima/supabase/types";
// import {
// 	userAvailabilityUpdateSchema,
// 	userPreferencesUpdateSchema,
// } from "@optima/supabase/validations";
// import { Button } from "@optima/ui/button";
// import {
// 	Card,
// 	CardContent,
// 	CardDescription,
// 	CardHeader,
// 	CardTitle,
// } from "@optima/ui/card";
// import { Input } from "@optima/ui/inputs";
// import { Label } from "@optima/ui/label";
// import {
// 	Select,
// 	SelectContent,
// 	SelectItem,
// 	SelectTrigger,
// 	SelectValue,
// } from "@optima/ui/select";
// import { TimezoneSelector } from "@optima/ui/selectors";
// import { DaysSelector } from "@optima/ui/selectors";
// import { Separator } from "@optima/ui/separator";
// import { AlertDiamondIcon } from "hugeicons-react";
// import { Loader, MonitorCog, Moon, Sun } from "lucide-react";

// import moment from "moment";
// import momenttz from "moment-timezone";
// import { useAction } from "next-safe-action/hooks";
// import { useTheme } from "next-themes";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";
// import type { z } from "zod";
// import { updateUserPreferencesAction } from "../../user.actions";
// import {
// 	getLocalTimeFromUtc,
// 	getUtcTimeFromLocal,
// } from "@/lib/formatters/dates";

// const formSchema = userPreferencesUpdateSchema;

// type UserPreferencesProps = {
// 	preferences: UserPreferencesType | null;
// };
// export function UserPreferences({ preferences }: UserPreferencesProps) {
// 	const { theme, setTheme } = useTheme();
// 	const { execute, status, isExecuting } = useAction(
// 		updateUserPreferencesAction,
// 		{
// 			onSuccess: ({ data }) => {
// 				toast.success("Preferences updated successfully");
// 				// dismissToast();
// 				if (data) {
// 					setTimeout(() => {
// 						form.reset(
// 							{
// 								...data,
// 							},
// 							{
// 								keepDirty: false,
// 								keepDirtyValues: false,
// 								keepDefaultValues: false,
// 							},
// 						);
// 					}, 200);
// 				}
// 			},
// 			onError: ({ error }) => {
// 				toast.error(error.serverError);
// 			},
// 		},
// 	);
// 	// const startTime = getLocalTimeFromUtc(
// 	//   availability?.work_day_start_time ?? "",
// 	// );
// 	// const endTime = getLocalTimeFromUtc(availability?.work_day_end_time ?? "");

// 	const form = useForm<z.infer<typeof formSchema>>({
// 		resolver: zodResolver(formSchema),
// 		defaultValues: {
// 			timezone: preferences?.timezone ?? "",
// 			date_format: preferences?.date_format ?? "",
// 			reminder_period: preferences?.reminder_period ?? 15,
// 			user_id: preferences?.user_id ?? "",
// 		},
// 	});

// 	useActionBar({
// 		show: form.formState.isDirty,
// 		ToastContent(props) {
// 			return (
// 				<div className="flex items-center gap-2 py-2 px-4 shadow-xl bg-primary text-primary-foreground rounded-full">
// 					<AlertDiamondIcon
// 						size={20}
// 						strokeWidth={2}
// 						className="text-tag-warning-icon "
// 					/>
// 					<span className="font-medium mr-auto">Unsaved changes! </span>
// 					<Button
// 						variant="destructive"
// 						size="sm"
// 						className="rounded-full"
// 						onClick={() => {
// 							form.reset();
// 						}}
// 						disabled={isExecuting}
// 					>
// 						Reset
// 					</Button>
// 					<Button
// 						variant="success"
// 						size="sm"
// 						className="rounded-full"
// 						onClick={() => {
// 							// const startTimeUtc = getUtcTimeFromLocal(
// 							//   form.getValues().work_day_start_time ?? "",
// 							// );
// 							// const endTimeUtc = getUtcTimeFromLocal(
// 							//   form.getValues().work_day_end_time ?? "",
// 							// );

// 							execute({
// 								...form.getValues(),
// 							});
// 						}}
// 						disabled={isExecuting}
// 					>
// 						{isExecuting ? <Loader className="size-4 animate-spin" /> : "Save"}
// 					</Button>
// 				</div>
// 			);
// 		},
// 		toastConfig: {
// 			position: "top-center",
// 		},
// 	});

// 	return (
// 		<section className="space-y-8 flex-1 max-w-3xl">
// 			<Card>
// 				<CardHeader>
// 					<CardTitle>Appearance</CardTitle>
// 				</CardHeader>
// 				<Separator />
// 				<CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
// 					<CardDescription>
// 						Choose how Optima looks and feels. This affects the color scheme and
// 						overall appearance of the app.
// 					</CardDescription>
// 					<Select value={theme} onValueChange={setTheme}>
// 						<SelectTrigger className="w-48 bg-accent">
// 							<SelectValue placeholder="Select a theme" />
// 						</SelectTrigger>
// 						<SelectContent>
// 							<SelectItem value="light">
// 								<p className="flex items-center gap-2">
// 									<Sun className="size-4" />
// 									Light
// 								</p>
// 							</SelectItem>
// 							<SelectItem value="dark">
// 								<p className="flex items-center gap-2">
// 									<Moon className="size-4" />
// 									Dark
// 								</p>
// 							</SelectItem>
// 							<SelectItem value="system">
// 								<p className="flex items-center gap-2">
// 									<MonitorCog className="size-4" />
// 									System
// 								</p>
// 							</SelectItem>
// 						</SelectContent>
// 					</Select>
// 				</CardContent>
// 			</Card>
// 			<Card>
// 				<CardHeader>
// 					<CardTitle>Time Zone</CardTitle>
// 				</CardHeader>
// 				<Separator />
// 				<CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
// 					<CardDescription>
// 						Defines the default time zone used for displaying times in the app.
// 					</CardDescription>
// 					<TimezoneSelector
// 						value={form.watch("timezone") ?? ""}
// 						onValueChange={(value) => {
// 							form.setValue("timezone", value, {
// 								shouldDirty: true,
// 							});
// 						}}
// 						triggerClassName="w-fit bg-accent"
// 					/>
// 				</CardContent>
// 			</Card>

// 			<Card>
// 				<CardHeader>
// 					<CardTitle>Date Format</CardTitle>
// 				</CardHeader>
// 				<Separator />
// 				<CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
// 					<CardDescription>
// 						Select the format used to display dates throughout the app.
// 					</CardDescription>
// 					<Select
// 						value={form.watch("date_format") ?? ""}
// 						onValueChange={(value) => {
// 							form.setValue("date_format", value, {
// 								shouldDirty: true,
// 							});
// 						}}
// 					>
// 						<SelectTrigger className="w-48 bg-accent">
// 							<SelectValue placeholder="Select a date format" />
// 						</SelectTrigger>
// 						<SelectContent>
// 							<SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
// 							<SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
// 							<SelectItem value="YYYY/MM/DD">YYYY/MM/DD</SelectItem>
// 						</SelectContent>
// 					</Select>
// 				</CardContent>
// 			</Card>

// 			<Card>
// 				<CardHeader>
// 					<CardTitle>Reminders Period</CardTitle>
// 				</CardHeader>
// 				<Separator />
// 				<CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
// 					<CardDescription>
// 						Select the period of time before your appointments to receive
// 						reminders.
// 					</CardDescription>
// 					<Select
// 						value={form.watch("reminder_period")?.toString() ?? ""}
// 						onValueChange={(value) => {
// 							form.setValue("reminder_period", Number.parseInt(value), {
// 								shouldDirty: true,
// 							});
// 						}}
// 					>
// 						<SelectTrigger className="w-52 bg-accent">
// 							<SelectValue placeholder="Select a reminder period" />
// 						</SelectTrigger>
// 						<SelectContent>
// 							<SelectItem value="15">15 minutes before</SelectItem>
// 							<SelectItem value="30">30 minutes before</SelectItem>
// 							<SelectItem value="45">45 minutes before</SelectItem>
// 							<SelectItem value="60">1 hour before</SelectItem>
// 							<SelectItem value="120">2 hours before</SelectItem>
// 							<SelectItem value="180">3 hours before</SelectItem>
// 							<SelectItem value="240">4 hours before</SelectItem>
// 							<SelectItem value="300">5 hours before</SelectItem>
// 							<SelectItem value="360">6 hours before</SelectItem>
// 							<SelectItem value="420">7 hours before</SelectItem>
// 							<SelectItem value="480">8 hours before</SelectItem>
// 						</SelectContent>
// 					</Select>
// 				</CardContent>
// 			</Card>
// 		</section>
// 	);
// }
