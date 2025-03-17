import { DepartmentSearch } from "@/features/organization/departments/views/department-search";
import { NewDepartment } from "@/features/organization/departments/views/new-department";
export default function OrganizationDepartmentsPage() {
	return (
		<main className="flex flex-col gap-4 flex-1">
			<div className="flex items-center gap-4 justify-between">
				<DepartmentSearch />
				<NewDepartment />
			</div>
		</main>
	);
}
