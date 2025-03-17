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
export function NewDepartment() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="secondary">
					<Plus className="size-4" />
					New Department
				</Button>
			</DialogTrigger>
			<DialogContent className="p-0 bg-sidebar">
				<DialogHeader className="p-4 pb-0">
					<DialogTitle>New Department</DialogTitle>
					<DialogDescription>
						Create a new department to organize your jobs.
					</DialogDescription>
				</DialogHeader>
				<Separator />
				<DepartmentForm />
			</DialogContent>
		</Dialog>
	);
}
