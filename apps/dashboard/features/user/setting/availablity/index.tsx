// "use client";

// import { useActionBar } from "@/hooks/use-action-bar";
// import {
// 	getLocalTimeFromUtc,
// 	getUtcTimeFromLocal,
// } from "@/lib/formatters/dates";
// import type { TimeSlot, UserAvailability } from "@optima/supabase/types";
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
// import { Separator } from "@optima/ui/separator";
// import { Switch } from "@optima/ui/switch";
// import {
// 	Add01Icon,
// 	AlertDiamondIcon,
// 	Delete01Icon,
// 	MinusSignIcon,
// } from "hugeicons-react";
// import { Loader } from "lucide-react";
// import moment from "moment";
// import { useAction } from "next-safe-action/hooks";
// import { useEffect, useState } from "react";
// import { toast } from "sonner";
// import {
// 	createUserAvailabilityAction,
// 	updateUserAvailabilityAction,
// } from "../../user.actions";

// const DAYS_OF_WEEK = [
// 	{ label: "Sunday", value: 0 },
// 	{ label: "Monday", value: 1 },
// 	{ label: "Tuesday", value: 2 },
// 	{ label: "Wednesday", value: 3 },
// 	{ label: "Thursday", value: 4 },
// 	{ label: "Friday", value: 5 },
// 	{ label: "Saturday", value: 6 },
// ];

// const DEFAULT_AVAILABILITY: UserAvailability = {
// 	user_id: "",
// 	created_at: "",
// 	updated_at: "",
// 	available_slots: [],
// };

// export function AvailabilitySetting({
// 	userAvailability,
// }: { userAvailability: UserAvailability | null }) {
// 	const initialAvailability = userAvailability
// 		? {
// 				...userAvailability,
// 				available_slots: userAvailability?.available_slots.map((slot) => ({
// 					...slot,
// 					time_slots: slot.time_slots.map((timeSlot) => ({
// 						start_time: getLocalTimeFromUtc(timeSlot.start_time),
// 						end_time: getLocalTimeFromUtc(timeSlot.end_time),
// 					})),
// 				})),
// 			}
// 		: DEFAULT_AVAILABILITY;
// 	const [availability, setAvailability] =
// 		useState<UserAvailability>(initialAvailability);
// 	const [isDirty, setIsDirty] = useState(false);

// 	const {
// 		execute: executeUpdate,
// 		isExecuting: isUpdating,
// 		status: updateStatus,
// 		reset: resetUpdate,
// 	} = useAction(updateUserAvailabilityAction, {
// 		onSuccess: ({ data }) => {
// 			const payload = data as UserAvailability | undefined;

// 			if (payload) {
// 				setAvailability({
// 					...payload,
// 					available_slots: payload.available_slots?.map((slot) => ({
// 						...slot,
// 						time_slots: slot.time_slots.map((timeSlot) => ({
// 							...timeSlot,
// 							start_time: getLocalTimeFromUtc(timeSlot.start_time),
// 							end_time: getLocalTimeFromUtc(timeSlot.end_time),
// 						})),
// 					})),
// 				});
// 				toast.success("Availability updated successfully", {
// 					position: "bottom-right",
// 				});
// 			}
// 		},
// 		onError: ({ error }) => {
// 			toast.error(error.serverError ?? "Something went wrong", {
// 				position: "bottom-right",
// 			});
// 		},
// 	});
// 	const {
// 		execute: executeCreate,
// 		isExecuting: isCreating,
// 		status: createStatus,
// 		reset: resetCreate,
// 	} = useAction(createUserAvailabilityAction, {
// 		onSuccess: ({ data }) => {
// 			const payload = data as UserAvailability | undefined;

// 			if (payload) {
// 				setAvailability({
// 					...payload,
// 					available_slots: payload.available_slots?.map((slot) => ({
// 						...slot,
// 						time_slots: slot.time_slots.map((timeSlot) => ({
// 							...timeSlot,
// 							start_time: getLocalTimeFromUtc(timeSlot.start_time),
// 							end_time: getLocalTimeFromUtc(timeSlot.end_time),
// 						})),
// 					})),
// 				});
// 				toast.success("Availability updated successfully", {
// 					position: "bottom-right",
// 				});
// 			}
// 		},
// 		onError: ({ error }) => {
// 			toast.error(error.serverError ?? "Something went wrong", {
// 				position: "bottom-right",
// 			});
// 		},
// 	});

// 	useEffect(() => {
// 		if (createStatus === "hasSucceeded" || updateStatus === "hasSucceeded") {
// 			setIsDirty(false);
// 		} else {
// 			const hasChanges =
// 				JSON.stringify(availability) !== JSON.stringify(initialAvailability);
// 			setIsDirty(hasChanges);
// 		}
// 	}, [availability, initialAvailability, createStatus, updateStatus]);

// 	function handleDayToggle(day: number, checked: boolean) {
// 		if (checked) {
// 			setAvailability({
// 				...availability,
// 				available_slots: [
// 					...(availability.available_slots ?? []),
// 					{
// 						day,
// 						time_slots: [{ start_time: "09:00", end_time: "17:00" }],
// 					},
// 				],
// 			});
// 		} else {
// 			setAvailability({
// 				...availability,
// 				available_slots: (availability.available_slots ?? []).filter(
// 					(slot) => slot.day !== day,
// 				),
// 			});
// 		}
// 	}

// 	function handleTimeChange(
// 		day: number,
// 		slotIndex: number,
// 		field: keyof TimeSlot,
// 		value: string,
// 	) {
// 		setAvailability({
// 			...availability,
// 			available_slots: (availability.available_slots ?? []).map((slot) => {
// 				if (slot.day === day) {
// 					const newTimeSlots = [...slot.time_slots];
// 					if (newTimeSlots[slotIndex]) {
// 						newTimeSlots[slotIndex] = {
// 							...newTimeSlots[slotIndex],
// 							[field]: value,
// 						};
// 					}
// 					return { ...slot, time_slots: newTimeSlots };
// 				}
// 				return slot;
// 			}),
// 		});
// 	}

// 	function addTimeSlot(day: number) {
// 		setAvailability({
// 			...availability,
// 			available_slots: (availability.available_slots ?? []).map((slot) => {
// 				if (slot.day === day) {
// 					return {
// 						...slot,
// 						time_slots: [
// 							...slot.time_slots,
// 							{ start_time: "09:00", end_time: "17:00" },
// 						],
// 					};
// 				}
// 				return slot;
// 			}),
// 		});
// 	}

// 	function deleteTimeSlot(day: number, slotIndex: number) {
// 		setAvailability({
// 			...availability,
// 			available_slots: (availability.available_slots ?? []).map((slot) => {
// 				if (slot.day === day) {
// 					const newTimeSlots = [...slot.time_slots];
// 					newTimeSlots.splice(slotIndex, 1);
// 					return { ...slot, time_slots: newTimeSlots };
// 				}
// 				return slot;
// 			}),
// 		});
// 	}

// 	function handleReset() {
// 		setAvailability(initialAvailability);
// 		resetUpdate();
// 		resetCreate();
// 	}

// 	function handleSave() {
// 		if (!(availability.available_slots ?? []).length) {
// 			toast.error("Please add at least one day of availability", {
// 				position: "bottom-right",
// 			});
// 		}
// 		const { isValid, invalidSlots } = validateAvailability(availability);
// 		if (isValid) {
// 			if (userAvailability) {
// 				executeUpdate({
// 					...availability,
// 					available_slots: availability.available_slots?.map((slot) => ({
// 						...slot,
// 						time_slots: slot.time_slots.map((timeSlot) => ({
// 							...timeSlot,
// 							start_time: getUtcTimeFromLocal(timeSlot.start_time),
// 							end_time: getUtcTimeFromLocal(timeSlot.end_time),
// 						})),
// 					})),
// 				});
// 			} else {
// 				executeCreate({
// 					...availability,
// 					available_slots: availability.available_slots?.map((slot) => ({
// 						...slot,
// 						time_slots: slot.time_slots.map((timeSlot) => ({
// 							...timeSlot,
// 							start_time: getUtcTimeFromLocal(timeSlot.start_time),
// 							end_time: getUtcTimeFromLocal(timeSlot.end_time),
// 						})),
// 					})),
// 				});
// 			}
// 		} else {
// 			for (const slot of invalidSlots) {
// 				const dayLabel = DAYS_OF_WEEK[slot.day]?.label ?? "Unknown";
// 				toast.error(
// 					`Invalid availability for ${dayLabel} from ${moment(slot.startTime, "HH:mm").format("hh:mm a")} to ${moment(slot.endTime, "HH:mm").format("hh:mm a")}`,
// 					{
// 						position: "bottom-right",
// 					},
// 				);
// 			}
// 		}
// 	}

// 	useActionBar({
// 		show: isDirty,
// 		ToastContent: ({ toastId }) => (
// 			<div className="flex items-center gap-2 py-2 px-3 shadow-xl bg-primary text-primary-foreground rounded-full">
// 				<AlertDiamondIcon
// 					size={20}
// 					strokeWidth={2}
// 					className="text-tag-warning-icon "
// 				/>
// 				<span className="font-medium mr-auto">Unsaved changes! </span>
// 				<Button
// 					variant="destructive"
// 					size="sm"
// 					className="rounded-full"
// 					onClick={handleReset}
// 					disabled={isUpdating || isCreating}
// 				>
// 					Reset
// 				</Button>
// 				<Button
// 					variant="success"
// 					size="sm"
// 					className="rounded-full"
// 					disabled={isUpdating || isCreating}
// 					onClick={handleSave}
// 				>
// 					{isUpdating || isCreating ? (
// 						<Loader className="size-4 animate-spin" />
// 					) : (
// 						"Save"
// 					)}
// 				</Button>
// 			</div>
// 		),
// 		toastConfig: {
// 			position: "top-center",
// 		},
// 	});

// 	return (
// 		<Card className="w-full max-w-xl">
// 			<CardHeader>
// 				<CardTitle>Work Availability</CardTitle>
// 				<CardDescription>
// 					Select the days and times you are available to work.
// 				</CardDescription>
// 			</CardHeader>
// 			<Separator />
// 			<CardContent>
// 				<div className="flex flex-col divide-y">
// 					{DAYS_OF_WEEK.map((day) => {
// 						const daySlot = (availability.available_slots ?? []).find(
// 							(slot) => slot.day === day.value,
// 						);
// 						const timeSlots = daySlot?.time_slots ?? [];

// 						return (
// 							<div
// 								key={day.value}
// 								className="flex flex-col sm:flex-row items-start justify-between gap-4 py-4"
// 							>
// 								<div className="flex items-center gap-2 pt-2">
// 									<Switch
// 										id={day.value.toString()}
// 										checked={(availability.available_slots ?? []).some(
// 											(slot) => slot.day === day.value,
// 										)}
// 										onCheckedChange={(checked) =>
// 											handleDayToggle(day.value, checked)
// 										}
// 									/>
// 									<Label htmlFor={day.value.toString()} className="text-base">
// 										{day.label}
// 									</Label>
// 								</div>
// 								<div className="flex flex-col gap-2">
// 									{timeSlots.map((slot, slotIndex) => (
// 										<div
// 											key={`${day.value}-${slotIndex}`}
// 											className="flex items-start gap-2"
// 										>
// 											<div className="flex items-center gap-4">
// 												<Input
// 													type="time"
// 													value={slot.start_time}
// 													onChange={(e) =>
// 														handleTimeChange(
// 															day.value,
// 															slotIndex,
// 															"start_time",
// 															e.target.value,
// 														)
// 													}
// 												/>
// 												-
// 												<Input
// 													type="time"
// 													value={slot.end_time}
// 													onChange={(e) =>
// 														handleTimeChange(
// 															day.value,
// 															slotIndex,
// 															"end_time",
// 															e.target.value,
// 														)
// 													}
// 												/>
// 											</div>
// 											{slotIndex === 0 ? (
// 												<Button
// 													type="button"
// 													variant="secondary"
// 													size="icon"
// 													onClick={() => addTimeSlot(day.value)}
// 												>
// 													<Add01Icon className="size-4" />
// 												</Button>
// 											) : (
// 												<Button
// 													type="button"
// 													variant="destructive"
// 													size="icon"
// 													onClick={() => deleteTimeSlot(day.value, slotIndex)}
// 												>
// 													<Delete01Icon className="size-4" />
// 												</Button>
// 											)}
// 										</div>
// 									))}
// 								</div>
// 							</div>
// 						);
// 					})}
// 				</div>
// 			</CardContent>
// 		</Card>
// 	);
// }

// function validateAvailability(availability: UserAvailability) {
// 	const invalidSlots: {
// 		day: number;
// 		slotIndex: number;
// 		startTime: string;
// 		endTime: string;
// 	}[] = [];

// 	for (const daySlot of availability.available_slots ?? []) {
// 		for (const [slotIndex, timeSlot] of daySlot.time_slots.entries()) {
// 			// Check if start time is after or equal to end time
// 			if (timeSlot.start_time >= timeSlot.end_time) {
// 				invalidSlots.push({
// 					day: daySlot.day,
// 					slotIndex,
// 					startTime: timeSlot.start_time,
// 					endTime: timeSlot.end_time,
// 				});
// 			}

// 			// Check if start time is before previous slot's end time
// 			if (slotIndex > 0) {
// 				const previousSlot = daySlot.time_slots[slotIndex - 1];
// 				if (previousSlot && timeSlot.start_time < previousSlot.end_time) {
// 					invalidSlots.push({
// 						day: daySlot.day,
// 						slotIndex,
// 						startTime: timeSlot.start_time,
// 						endTime: timeSlot.end_time,
// 					});
// 				}
// 			}
// 		}
// 	}

// 	return {
// 		isValid: invalidSlots.length === 0,
// 		invalidSlots,
// 	};
// }
