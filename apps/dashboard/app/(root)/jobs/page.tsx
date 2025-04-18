import { PermissionGuard } from "@/components/permission-gaurd";
import { buttonVariants } from "@optima/ui/components/button";
import Link from "next/link";

export default function JobsPage() {
	return (
		<div className="flex flex-col items-start flex-1 gap-4">
			<PermissionGuard requiredPermissions={["job:create"]}>
				<Link
					href="/jobs/create"
					className={buttonVariants({
						variant: "secondary",
						className: "ml-auto",
					})}
				>
					Create Job
				</Link>
			</PermissionGuard>
			{/* <section className="flex justify-end w-full">
			</section> */}
		</div>
	);
}
