import { departmentSearchLoader } from "@/features/organization/departments/departments.search-params";
import { DepartmentCard } from "@/features/organization/departments/views/department-card";
import { DepartmentSearch } from "@/features/organization/departments/views/department-search";
import { NewDepartment } from "@/features/organization/departments/views/new-department";
import { getDepartments, getUserOrganization } from "@optima/database/queries";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { SearchParams } from "nuqs";

type Params = {
	searchParams: Promise<SearchParams>;
};

export default async function OrganizationDepartmentsPage({
	searchParams,
}: Params) {
	const filters = await departmentSearchLoader(searchParams);

	const headersList = await headers();
	const userId = headersList.get("x-user-id");
	if (!userId) {
		redirect("/auth");
	}
	const organization = await getUserOrganization(userId);
	const departments = await getDepartments(organization?.id ?? "", filters);


	return (
		<main className="flex flex-col gap-4 flex-1">
			<section className="flex items-center gap-4 justify-between">
				<DepartmentSearch />
				<NewDepartment />
			</section>
			{departments.length === 0 ? (
				<div className="flex flex-col gap-2 flex-1 items-center justify-center">
					<p className="text-sm text-muted-foreground">No departments found</p>
					<p className="text-muted-foreground">
						Start by creating a new department
					</p>
				</div>
			) : (
				<section className=" flex-1 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
					{departments.map((department) => (
						<DepartmentCard key={department.id} department={department} />
					))}
				</section>
			)}
		</main>
	);
}
