import { zodResolver } from "@hookform/resolvers/zod";
import type { AccessRole } from "@optima/supabase/types";
import { roleUpdateSchema } from "@optima/supabase/validations";
import { Button } from "@optima/ui/components/button";
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
import { Input } from "@optima/ui/components/inputs";
import { Separator } from "@optima/ui/components/separator";
import { Loader } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { updateRoleAction } from "../roles.actions";

type RenameRoleProps = {
	children: React.ReactNode;
	role: AccessRole;
};

export function RenameRole({ children: trigger, role }: RenameRoleProps) {
	const [open, setOpen] = useState(false);
	const form = useForm<z.infer<typeof roleUpdateSchema>>({
		resolver: zodResolver(roleUpdateSchema),
		defaultValues: {
			id: role.id,
			name: role.name,
		},
	});

	const { execute, isExecuting } = useAction(updateRoleAction, {
		onSuccess: () => {
			setOpen(false);
			toast.success("Role renamed Succesfully");
		},
		onError: ({ error }) => {
			toast.error(error?.serverError);
		},
	});

	function onSubmit(data: z.infer<typeof roleUpdateSchema>) {
		execute(data);
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Rename Role</DialogTitle>
				</DialogHeader>
				<Separator />
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem className="p-4">
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Separator />
						<DialogFooter className="flex-row *:flex-1">
							<DialogClose asChild>
								<Button variant="outline" type="button" disabled={isExecuting}>
									Cancel
								</Button>
							</DialogClose>
							<Button type="submit" disabled={isExecuting}>
								{isExecuting ? (
									<Loader className=" size-4 animate-spin" />
								) : null}
								Save
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
