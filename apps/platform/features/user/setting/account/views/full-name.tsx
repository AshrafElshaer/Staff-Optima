"use client";
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
import { Separator } from "@optima/ui/components/separator";
import { Loader } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

export function FullName({ user }: { user: User }) {
	const { execute: updateUser, isExecuting } = useAction(updateUserAction, {
		onSuccess: ({ data }) => {
			toast.success("Account updated successfully");
			form.reset({
				id: user.id,
				first_name: data?.first_name ?? user.first_name,
				last_name: data?.last_name ?? user.last_name,
			});
			queryClient.invalidateQueries({
				queryKey: ["current-user"],
			});
		},
		onError: ({ error }) => {
			toast.error(error.serverError);
		},
	});

	const form = useForm<z.infer<typeof userUpdateSchema>>({
		resolver: zodResolver(userUpdateSchema),
		defaultValues: {
			id: user.id,
			first_name: user.first_name,
			last_name: user.last_name,
		},
	});

	function onSubmit(values: z.infer<typeof userUpdateSchema>) {
		updateUser(values);
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle className="font-semibold ">Full Name</CardTitle>
			</CardHeader>
			<Separator />
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<CardContent className="flex flex-col md:flex-row items-center justify-between gap-4">
						<FormField
							control={form.control}
							name="first_name"
							render={({ field }) => (
								<FormItem className="space-y-2 w-full md:w-1/3">
									<FormLabel>First Name</FormLabel>
									<FormControl>
										<Input placeholder="Enter your first name" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="last_name"
							render={({ field }) => (
								<FormItem className="space-y-2 w-full md:w-1/3">
									<FormLabel>Last Name</FormLabel>
									<FormControl>
										<Input placeholder="Enter your last name" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>
					<Separator />
					<CardFooter className="flex justify-end gap-2 items-center">
						{form.formState.isDirty && (
							<Button
								variant="outline"
								type="button"
								disabled={!form.formState.isDirty || isExecuting}
								onClick={() => {
									form.reset();
								}}
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
