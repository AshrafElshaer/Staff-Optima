"use client";
import { PhoneInput } from "@/components/phone-number-input";
import { updateUserAction } from "@/features/user/user.actions";
import { queryClient } from "@/lib/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import type { User } from "@optima/supabase/types";
import { userUpdateSchema } from "@optima/supabase/validations";
import { Button } from "@optima/ui/components/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@optima/ui/components/card";
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
import { Separator } from "@optima/ui/components/separator";
import { Skeleton } from "@optima/ui/components/skeleton";
import { Loader } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { parsePhoneNumber } from "react-phone-number-input";
import { toast } from "sonner";
import type { z } from "zod";

export function ContactInfo({ user }: { user: User }) {
	const { execute: updateUser, isExecuting } = useAction(updateUserAction, {
		onSuccess: () => {
			toast.success("Account updated successfully");
			queryClient.invalidateQueries({
				queryKey: ["current-user"],
			});
		},
		onError: ({ error }) => {
			toast.error(error.serverError);
		},
	});
	const phoneNumberCountry = parsePhoneNumber(user.phone_number)?.country;

	const form = useForm<z.infer<typeof userUpdateSchema>>({
		resolver: zodResolver(userUpdateSchema),
		defaultValues: {
			id: user.id,
			email: user.email,
			phone_number: user.phone_number,
		},
	});

	function onSubmit(data: z.infer<typeof userUpdateSchema>) {
		updateUser(data);
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle className="font-semibold ">Contact Information</CardTitle>
			</CardHeader>
			<Separator />
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<CardContent className="flex flex-col md:flex-row items-center justify-between gap-4">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem className=" w-full md:w-1/3">
									<FormLabel>Email Address</FormLabel>
									<FormControl>
										<Input placeholder="example@domain.com" inputMode="email" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="phone_number"
							render={({ field }) => (
								<FormItem className=" w-full md:w-1/3">
									<FormLabel>Phone Number</FormLabel>
									<FormControl>
										<PhoneInput
											value={field.value?.replace(/\s+/g, "")}
											onChange={(value) =>
												form.setValue("phone_number", value, {
													shouldDirty: true,
												})
											}
											defaultCountry={phoneNumberCountry}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>
					<Separator />
					<CardFooter className="flex justify-end  gap-2 items-center">
						{form.formState.isDirty && (
							<Button
								variant="outline"
								disabled={isExecuting}
								onClick={() => form.reset()}
								type="button"
							>
								Reset
							</Button>
						)}
						<Button
							disabled={!form.formState.isDirty || isExecuting}
							type="submit"
						>
							{isExecuting ? <Loader className="w-4 h-4 animate-spin" /> : null}
							Save
						</Button>
					</CardFooter>
				</form>
			</Form>
		</Card>
	);
}

export function ContactInfoLoading() {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="font-semibold ">Contact Information</CardTitle>
			</CardHeader>
			<Separator />
			<CardContent className="flex flex-col md:flex-row items-center justify-between gap-4">
				<div className="grid gap-3  w-full md:w-1/3">
					<Label>Email</Label>
					<Skeleton className="h-9 w-full" />
				</div>
				<div className="grid gap-3  w-full md:w-1/3">
					<Label>Phone Number</Label>
					<Skeleton className="h-9 w-full" />
				</div>
			</CardContent>
			<Separator />
			<CardFooter className="flex justify-end gap-2 items-center">
				<Button disabled>Save</Button>
			</CardFooter>
		</Card>
	);
}
