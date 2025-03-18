"use client";
import { MemberSelector } from "@/components/selectors/member-selector";
import { useOrganizationStore } from "@/stores/organization";
import { zodResolver } from "@hookform/resolvers/zod";
import { departmentInsertSchema } from "@optima/database/validations";
import { Button } from "@optima/ui/components/button";
import { DialogClose, DialogFooter } from "@optima/ui/components/dialog";
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
import { Textarea } from "@optima/ui/components/textarea";
import { Loader } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { createDepartmentAction } from "../departments.actions";
const formSchema = departmentInsertSchema;

export function DepartmentForm({
	setOpen,
}: { setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
	const organization = useOrganizationStore((state) => state.organization);
	const { execute, isExecuting } = useAction(createDepartmentAction, {
		onSuccess: () => {
			toast.success("Department created successfully");
			setOpen(false);
		},
		onError: ({ error }) => {
			toast.error(error.serverError);
		},
	});
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			description: "",
			headUserId: "",
			organizationId: organization?.id,
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		if (!values.headUserId || values.headUserId === "") {
			toast.error("Head of department is required");
			form.setError("headUserId", {
				message: "Head of department is required",
			});
			return;
		}

		execute(values);
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className="p-4 space-y-4">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input placeholder="Information Technology" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Description
									<span className="text-sm text-muted-foreground">
										(optional)
									</span>
								</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Describe the department"
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
						name="headUserId"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Head Of Department</FormLabel>
								<FormControl>
									<MemberSelector
										onChange={field.onChange}
										value={field.value ?? ""}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Separator />
				<DialogFooter className="p-4 relative ">
					<DialogClose asChild>
						<Button
							variant="secondary"
							className="w-full sm:w-1/2"
							disabled={isExecuting}
						>
							Cancel
						</Button>
					</DialogClose>
					<Button className="w-full sm:w-1/2" disabled={isExecuting}>
						{isExecuting ? <Loader className="animate-spin" /> : null}
						Create
					</Button>
				</DialogFooter>
			</form>
		</Form>
	);
}
