"use client";
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
import { Plus } from "lucide-react";
import { DepartmentForm } from "./department-form";
import { Separator } from "@optima/ui/components/separator";
import { useState } from "react";
export function NewDepartment() {
	const [open, setOpen] = useState(false);
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="secondary" size="sm">
					<Plus className="size-4" />
					New Department
				</Button>
			</DialogTrigger>
			<DialogContent className="p-0">
				<DialogHeader className="p-4 pb-0">
					<DialogTitle>New Department</DialogTitle>
					<DialogDescription>
						Create a new department to organize your jobs.
					</DialogDescription>
				</DialogHeader>
				{/* <Separator /> */}
				<DepartmentForm setOpen={setOpen} />
			</DialogContent>
		</Dialog>
	);
}
