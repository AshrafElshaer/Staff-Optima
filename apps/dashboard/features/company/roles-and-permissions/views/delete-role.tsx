import type { AccessRole } from "@optima/supabase/types";

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

import { Input } from "@optima/ui/components/inputs";
import { Separator } from "@optima/ui/components/separator";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";

import { toast } from "sonner";

import { Label } from "@optima/ui/components/label";
import { deleteRoleActions } from "../roles.actions";
import { Icons } from "@optima/ui/components/icons";

type DeleteRoleProps = {
	children: React.ReactNode;
	role: AccessRole;
};

export function DeleteRole({ children: trigger, role }: DeleteRoleProps) {
	const [open, setOpen] = useState(false);
	const [confirmation, setConfirmation] = useState("");

	const { execute, isExecuting } = useAction(deleteRoleActions, {
		onSuccess: () => {
			setOpen(false);
			toast.success("Role deleted Succesfully");
		},
		onError: ({ error }) => {
			toast.error(error?.serverError);
		},
	});

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Delete Role</DialogTitle>
					<DialogDescription>
						Are you sure you want to delete this role? this action can be undo.
					</DialogDescription>
				</DialogHeader>
				<Separator />
				<div className="p-4 space-y-4">
					<Label>
						Type <span className="p-1 rouneded-md bg-accent">{role.name}</span>
						to confirm the delete
					</Label>
					<Input
						value={confirmation}
						onChange={(e) => setConfirmation(e.target.value)}
					/>
				</div>
				<Separator />
				<DialogFooter className="flex-row *:flex-1">
					<DialogClose asChild>
						<Button
							size="sm"
							variant="outline"
							type="button"
							disabled={isExecuting}
						>
							Cancel
						</Button>
					</DialogClose>
					<Button
						onClick={() => execute({ roleId: role.id })}
						disabled={isExecuting || confirmation !== role.name}
						variant="destructive"
						size="sm"
					>
						{isExecuting ? (
							<Icons.Loader className=" size-4 animate-spin" />
						) : null}
						Confirm
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
