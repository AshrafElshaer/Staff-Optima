"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@optima/ui/components/dialog";
import { Input } from "@optima/ui/components/inputs";
import { Separator } from "@optima/ui/components/separator";

import { PhoneInput } from "@/components/phone-number-input";
import { RoleSelector } from "@/components/selectors/role-selsctor";
import { userInsertSchema } from "@optima/supabase/validations";
import { Button } from "@optima/ui/components/button";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@optima/ui/components/form";
import { UserAdd02Icon } from "hugeicons-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { inviteMemberAction } from "../team.actions";
import { Icons } from "@optima/ui/components/icons";

const formSchema = userInsertSchema.extend({
	role_id: z.string().uuid(),
});
export function InviteTeamMember() {
	const [open, setOpen] = useState(false);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	const { execute, isExecuting } = useAction(inviteMemberAction, {
		onSuccess: () => {
			toast.success("Member invited successfully");
			setOpen(false);
		},
		onError: ({ error }) => {
			toast.error(error.serverError);
		},
	});

	function onSubmit(data: z.infer<typeof formSchema>) {
		execute(data);
	}
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="secondary" className="ml-auto">
					<UserAdd02Icon className="h-4 w-4" />
					Invite Member
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Invite Member</DialogTitle>
				</DialogHeader>
				<Separator />
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className="p-4 space-y-4">
							<div className="flex flex-col sm:flex-row items-start  gap-4">
								<FormField
									control={form.control}
									name="first_name"
									render={({ field }) => (
										<FormItem className="w-full">
											<FormLabel>First Name</FormLabel>
											<FormControl>
												<Input {...field} placeholder="John" />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="last_name"
									render={({ field }) => (
										<FormItem className="w-full">
											<FormLabel>Last Name</FormLabel>
											<FormControl>
												<Input {...field} placeholder="Doe" />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												{...field}
												inputMode="email"
												placeholder="example@domain.com"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="phone_number"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Phone Number</FormLabel>
										<FormControl>
											<PhoneInput
												className="w-full"
												value={field.value ?? ""}
												onChange={(value) => field.onChange(value ?? "")}
												placeholder="+1234567890"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="role_id"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Role</FormLabel>
										<FormControl>
											<RoleSelector
												value={field.value ?? ""}
												onChange={(value) => field.onChange(value ?? "")}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<Separator />
						<DialogFooter>
							<DialogClose asChild>
								<Button variant="outline" disabled={isExecuting}>
									Cancel
								</Button>
							</DialogClose>
							<Button type="submit" disabled={isExecuting}>
								{isExecuting ? (
									<Icons.Loader className="size-4 animate-spin" />
								) : null}
								Invite
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
