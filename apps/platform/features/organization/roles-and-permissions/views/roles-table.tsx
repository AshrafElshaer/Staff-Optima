"use client";

import { OnChangeToast } from "@/components/toasts/on-change-toast";
import { useActionToast } from "@/hooks/use-action-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { PERMISSIONS } from "@optima/constants";
import type { AccessRole } from "@optima/supabase/types";
import { roleSchema } from "@optima/supabase/validations";
import { Button } from "@optima/ui/components/button";
import { Checkbox } from "@optima/ui/components/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@optima/ui/components/dropdown-menu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@optima/ui/components/table";
import { PencilEdit02Icon } from "hugeicons-react";
import { MoreVertical, Trash } from "lucide-react";
import React, { useCallback, useEffect } from "react";

import { Separator } from "@optima/ui/components/separator";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { updateBulkRolesAction } from "../roles.actions";
import { DeleteRole } from "./delete-role";
import { RenameRole } from "./rename-role";

const formSchema = z.object({
	roles: z.array(roleSchema),
});

type Props = {
	roles: AccessRole[];
};

export function RolesTable({ roles }: Props) {
	const groupedByName = roles.reduce<Record<string, AccessRole[]>>(
		(acc, role) => {
			acc[role.name] = [...(acc[role.name] || []), role];
			return acc;
		},
		{},
	);

	const form = useForm<z.infer<typeof formSchema>>({
		defaultValues: { roles },
		resolver: zodResolver(formSchema),
	});

	useEffect(() => {
		form.reset({ roles }, { keepDirty: false });
	}, [roles, form]);

	const {
		execute,
		status,
		result,
		reset: resetAction,
	} = useAction(updateBulkRolesAction, {
		onError: ({ error }) => {
			toast.error(error?.serverError);
		},
		onSuccess: ({ data }) => {
			setTimeout(() => {
				data &&
					form.reset(
						{ roles: data },
						{
							keepDirty: false,
						},
					);
				resetAction();
			}, 3000);
		},
	});

	function onCheckedChange(
		roleId: string,
		permission: string,
		isChecked: boolean,
	) {
		// Get the current roles
		const updatedRoles = form.getValues("roles").map((r) => {
			if (r.id === roleId) {
				// Directly modify only the affected role
				const newPermissions = isChecked
					? [...new Set([...(r.permissions || []), permission])] // Ensure uniqueness
					: (r.permissions || []).filter((perm) => perm !== permission);
				return { ...r, permissions: newPermissions };
			}
			return r;
		});

		// Update form state efficiently
		form.setValue("roles", updatedRoles, {
			shouldValidate: false,
			shouldDirty: true,
		});
	}

	const RoleCheckbox = React.memo(
		({
			roleId,
			permission,
			checked,
			disabled,
		}: {
			roleId: string;
			permission: string;
			checked: boolean;
			disabled?: boolean;
		}) => {
			return (
				<Checkbox
					checked={checked}
					disabled={disabled}
					onCheckedChange={(isChecked) =>
						onCheckedChange(roleId, permission, isChecked as boolean)
					}
				/>
			);
		},
	);

	const ToastContent = useCallback(
		({ toastId }: { toastId: string | number }) => {
			return (
				<OnChangeToast
					state={status}
					onReset={() => form.reset()}
					onSave={() => execute(form.getValues("roles"))}
					errorMessage={result?.serverError}
				/>
			);
		},
		[status, result?.serverError],
	);

	useActionToast({
		show: form.formState.isDirty,
		ToastContent,
	});

	return (
		<div className="flex-1 border rounded-md flex flex-col max-h-[calc(100svh_-_8.25rem)]">
			<Table>
				<TableHeader className="">
					<TableRow className="bg-accent hover:bg-accent divide-x sticky top-0">
						<TableHead className="text-foreground bg-accent hover:bg-accent">Permissions</TableHead>
						{Object.keys(groupedByName).map((roleName) => (
							<TableHead key={roleName} className="text-foreground w-fit">
								<div className="flex items-center justify-between gap-2 w-full">
									{roleName}
									{roleName !== "Owner" ? (
										<RoleDropdown role={groupedByName[roleName]?.[0] || null} />
									) : null}
								</div>
							</TableHead>
						))}
					</TableRow>
				</TableHeader>
				<TableBody>
					{PERMISSIONS.map((perm) => (
						<React.Fragment key={perm.key}>
							<TableRow className="bg-muted hover:bg-muted">
								<TableCell className="font-medium text-center" colSpan={roles.length + 1}>
									{perm.category}
								</TableCell>
							</TableRow>
							{perm.permissions.map((p) => (
								<TableRow key={p.value} className="divide-x">
									<TableCell className="text-muted-foreground">
										{p.label}
									</TableCell>
									{Object.keys(groupedByName).map((roleName) => {
										const role = form
											.watch("roles")
											.find((r) => r.name === roleName);
										return (
											<TableCell
												key={`${p.value}-${role?.id}`}
												className="text-center"
											>
												<div className="flex items-center justify-center w-full">
													<RoleCheckbox
														roleId={role?.id || ""}
														permission={p.value}
														disabled={roleName === "Owner"}
														checked={
															role?.permissions?.includes(p.value) ?? false
														}
													/>
												</div>
											</TableCell>
										);
									})}
								</TableRow>
							))}
						</React.Fragment>
					))}
				</TableBody>
			</Table>
		</div>
	);
}

function RoleDropdown({ role }: { role: AccessRole | null }) {
	if (!role) return null;
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon" className="ml-auto p-0 size-auto">
					<MoreVertical className="h-4 w-4" strokeWidth={2} />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel>Actions</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<RenameRole role={role}>
					<DropdownMenuItem asDialogTrigger>
						<PencilEdit02Icon
							className="size-4 text-foreground"
							strokeWidth={2}
						/>
						Rename
					</DropdownMenuItem>
				</RenameRole>
				<DeleteRole role={role}>
					<DropdownMenuItem asDialogTrigger>
						<Trash className="size-4 text-foreground" strokeWidth={2} />
						Delete
					</DropdownMenuItem>
				</DeleteRole>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
