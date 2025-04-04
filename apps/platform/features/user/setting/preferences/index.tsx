"use client";
import { useActionToast } from "@/hooks/use-action-toast";

import { zodResolver } from "@hookform/resolvers/zod";
import type {
	// UserAvailability,
	UserPreferences as UserPreferencesType,
} from "@optima/supabase/types";
import {
	userPreferencesSchema,
	// userAvailabilityUpdateSchema,
	userPreferencesUpdateSchema,
} from "@optima/supabase/validations";
import { Button } from "@optima/ui/components/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@optima/ui/components/card";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@optima/ui/components/select";
import { DaysSelector } from "@optima/ui/components/selectors/days-selector";
import { TimezoneSelector } from "@optima/ui/components/selectors/timezone-selector";
import { Separator } from "@optima/ui/components/separator";
import { AlertDiamondIcon } from "hugeicons-react";
import { Loader, MonitorCog, Moon, Sun } from "lucide-react";

import moment from "moment";

import { OnChangeToast } from "@/components/toasts/on-change-toast";
import {
	getLocalTimeFromUtc,
	getUtcTimeFromLocal,
} from "@/lib/formatters/dates";
import { useAction } from "next-safe-action/hooks";
import { useTheme } from "next-themes";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import {
	createUserPreferencesAction,
	updateUserPreferencesAction,
} from "../../user.actions";

const formSchema = userPreferencesSchema.omit({ user_id: true });

type UserPreferencesProps = {
	preferences: UserPreferencesType | null;
};
export function UserPreferences({ preferences }: UserPreferencesProps) {
	const { theme, setTheme } = useTheme();
	const {
		execute: createPreferences,
		status: createStatus,
		isExecuting: isCreating,
		result: createResult,
	} = useAction(createUserPreferencesAction, {
		onSuccess: ({ data }) => {
			toast.success("Preferences updated successfully");
			// dismissToast();
			if (data) {
				setTimeout(() => {
					form.reset(
						{
							...data,
						},
						{
							keepDirty: false,
							keepDirtyValues: false,
							keepDefaultValues: false,
						},
					);
				}, 200);
			}
		},
		onError: ({ error }) => {
			toast.error(error.serverError);
		},
	});
	const {
		execute: updatePreferences,
		status: updateStatus,
		isExecuting: isUpdating,
		result: updateResult,
	} = useAction(updateUserPreferencesAction, {
		onSuccess: ({ data }) => {
			toast.success("Preferences updated successfully");
			// dismissToast();
			if (data) {
				setTimeout(() => {
					form.reset(
						{
							...data,
						},
						{
							keepDirty: false,
							keepDirtyValues: false,
							keepDefaultValues: false,
						},
					);
				}, 200);
			}
		},
		onError: ({ error }) => {
			toast.error(error.serverError);
		},
	});
	// const startTime = getLocalTimeFromUtc(
	//   availability?.work_day_start_time ?? "",
	// );
	// const endTime = getLocalTimeFromUtc(availability?.work_day_end_time ?? "");

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			timezone: preferences?.timezone ?? "",
			date_format: preferences?.date_format ?? "",
			reminder_period: preferences?.reminder_period ?? 15,
		},
	});

	const ToastContent = useCallback(
		({ toastId }: { toastId: string | number }) => {
			return (
				<OnChangeToast
					state={preferences?.user_id ? updateStatus : createStatus}
					onReset={() => form.reset()}
					onSave={() =>
						preferences?.user_id
							? updatePreferences(form.getValues())
							: createPreferences(form.getValues())
					}
					errorMessage={
						preferences?.user_id
							? updateResult?.serverError
							: createResult?.serverError
					}
				/>
			);
		},
		[
			createStatus,
			updateStatus,
			createResult?.serverError,
			updateResult?.serverError,
		],
	);
	useActionToast({
		show: form.formState.isDirty,
		ToastContent,
	});

	return (
		<section className="space-y-8 flex-1 max-w-3xl">
			<Card>
				<CardHeader>
					<CardTitle>Appearance</CardTitle>
				</CardHeader>
				<Separator />
				<CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
					<CardDescription>
						Choose how Optima looks and feels. This affects the color scheme and
						overall appearance of the app.
					</CardDescription>
					<Select value={theme} onValueChange={setTheme}>
						<SelectTrigger className="w-48 bg-accent">
							<SelectValue placeholder="Select a theme" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="light">
								<p className="flex items-center gap-2">
									<Sun className="size-4" />
									Light
								</p>
							</SelectItem>
							<SelectItem value="dark">
								<p className="flex items-center gap-2">
									<Moon className="size-4" />
									Dark
								</p>
							</SelectItem>
							<SelectItem value="system">
								<p className="flex items-center gap-2">
									<MonitorCog className="size-4" />
									System
								</p>
							</SelectItem>
						</SelectContent>
					</Select>
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Time Zone</CardTitle>
				</CardHeader>
				<Separator />
				<CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
					<CardDescription>
						Defines the default time zone used for displaying times in the app.
					</CardDescription>
					<TimezoneSelector
						value={form.watch("timezone") ?? ""}
						onValueChange={(value) => {
							form.setValue("timezone", value, {
								shouldDirty: true,
							});
						}}
						triggerClassName="w-fit bg-accent"
					/>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Date Format</CardTitle>
				</CardHeader>
				<Separator />
				<CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
					<CardDescription>
						Select the format used to display dates throughout the app.
					</CardDescription>
					<Select
						value={form.watch("date_format") ?? ""}
						onValueChange={(value) => {
							form.setValue("date_format", value, {
								shouldDirty: true,
							});
						}}
					>
						<SelectTrigger className="w-48 bg-accent">
							<SelectValue placeholder="Select a date format" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
							<SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
							<SelectItem value="YYYY/MM/DD">YYYY/MM/DD</SelectItem>
						</SelectContent>
					</Select>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Reminders Period</CardTitle>
				</CardHeader>
				<Separator />
				<CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
					<CardDescription>
						Select the period of time before your appointments to receive
						reminders.
					</CardDescription>
					<Select
						value={form.watch("reminder_period")?.toString() ?? ""}
						onValueChange={(value) => {
							form.setValue("reminder_period", Number.parseInt(value), {
								shouldDirty: true,
							});
						}}
					>
						<SelectTrigger className="w-52 bg-accent">
							<SelectValue placeholder="Select a reminder period" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="15">15 minutes before</SelectItem>
							<SelectItem value="30">30 minutes before</SelectItem>
							<SelectItem value="45">45 minutes before</SelectItem>
							<SelectItem value="60">1 hour before</SelectItem>
							<SelectItem value="120">2 hours before</SelectItem>
							<SelectItem value="180">3 hours before</SelectItem>
							<SelectItem value="240">4 hours before</SelectItem>
							<SelectItem value="300">5 hours before</SelectItem>
							<SelectItem value="360">6 hours before</SelectItem>
							<SelectItem value="420">7 hours before</SelectItem>
							<SelectItem value="480">8 hours before</SelectItem>
						</SelectContent>
					</Select>
				</CardContent>
			</Card>
		</section>
	);
}
