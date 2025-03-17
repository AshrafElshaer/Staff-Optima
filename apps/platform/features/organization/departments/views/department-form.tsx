"use client";
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@optima/ui/components/select";
import { Separator } from "@optima/ui/components/separator";
import { Textarea } from "@optima/ui/components/textarea";
import { useForm } from "react-hook-form";
import type { z } from "zod";
const formSchema = departmentInsertSchema.omit({
	organizationId: true,
});

export function DepartmentForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			description: "",
			headUserId: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
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
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Information Technology"
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
								<FormLabel>Head User</FormLabel>
								<FormControl>
									<Select
										onValueChange={field.onChange}
										value={field.value ?? ""}
									>
										<SelectTrigger className="bg-accent w-full border">
											<SelectValue placeholder="Select a user" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="1">John Doe</SelectItem>
											<SelectItem value="2">Jane Doe</SelectItem>
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Separator />
				<DialogFooter className="p-4 relative ">
					<DialogClose asChild>
						<Button variant="secondary" className="w-full sm:w-1/2">
							Cancel
						</Button>
					</DialogClose>
					<Button className="w-full sm:w-1/2">Create</Button>
				</DialogFooter>
			</form>
		</Form>
	);
}
