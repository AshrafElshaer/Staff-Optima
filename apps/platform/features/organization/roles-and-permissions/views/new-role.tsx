"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { roleInsertSchema } from "@optima/supabase/validations";
import { Button } from "@optima/ui/components/button";
import { Checkbox } from "@optima/ui/components/checkbox";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@optima/ui/components/form";
import { Label } from "@optima/ui/components/label";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@optima/ui/components/sheet";
import { FingerPrintAddIcon } from "hugeicons-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { PERMISSIONS } from "@optima/constants";
import { Input } from "@optima/ui/components/inputs";
import { Separator } from "@optima/ui/components/separator";
import { Loader } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { createRoleAction } from "../roles.actions";
export default function NewRole() {
	const [open, setOpen] = useState(false);
	const form = useForm<z.infer<typeof roleInsertSchema>>({
		defaultValues: {
			name: "",
			permissions: [],
		},
		resolver: zodResolver(roleInsertSchema),
	});
	const { execute, isExecuting } = useAction(createRoleAction, {
		onError: ({ error }) => {
			toast.error(error.serverError);
		},
		onSuccess: () => {
			toast.success("Role Created Successfully");
			setOpen(false);
		},
	});
	function onSubmit(data: z.infer<typeof roleInsertSchema>) {
		execute(data);
	}
	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button className="w-fit ml-auto" variant="secondary">
					<FingerPrintAddIcon className="h-4 w-4" strokeWidth={2} /> Create Role
				</Button>
			</SheetTrigger>
			<SheetContent className="">
				<SheetHeader>
					<SheetTitle>New Role</SheetTitle>
					<SheetDescription>
						Add a new role to your organization
					</SheetDescription>
				</SheetHeader>
				<Separator />
				<Form {...form}>
					<form
						onSubmit={(e) => {
							e.preventDefault();
						}}
						className="flex-1 flex flex-col overflow-y-auto p-4 space-y-4"
					>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-base">Name</FormLabel>
									<FormControl>
										<Input {...field} placeholder="Enter role name" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="permissions"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-base">
										Access & Permissions
									</FormLabel>
									<FormMessage />
									<FormControl>
										<div className="space-y-4">
											{PERMISSIONS.map((category) => (
												<div key={category.key} className="space-y-4">
													<h3 className="text-sm font-medium text-muted-foreground">
														{category.category}
													</h3>
													<div className="grid grid-cols-2 gap-4">
														{category.permissions.map((perm) => (
															<Label
																key={perm.value}
																className="flex items-start"
															>
																<Checkbox
																	onCheckedChange={(isChecked) =>
																		form.setValue(
																			"permissions",
																			isChecked
																				? [
																						...form.getValues("permissions"),
																						perm.value,
																					]
																				: form
																						.getValues("permissions")
																						.filter((v) => v !== perm.value),
																		)
																	}
																	value={perm.value}
																	checked={form
																		.getValues("permissions")
																		.includes(perm.value)}
																/>
																{perm.label}
															</Label>
														))}
													</div>
												</div>
											))}
										</div>
									</FormControl>
								</FormItem>
							)}
						/>
					</form>
				</Form>
				<Separator className="mt-auto" />
				<SheetFooter className="flex flex-row mt-0">
					<SheetClose asChild>
						<Button
							variant="secondary"
							disabled={isExecuting}
							className="flex-1"
						>
							Cancel
						</Button>
					</SheetClose>
					<Button
						disabled={isExecuting}
						className="flex-1"
						onClick={form.handleSubmit(onSubmit)}
					>
						{isExecuting ? <Loader className="h-4 w-4 animate-spin" /> : null}
						Create
					</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
