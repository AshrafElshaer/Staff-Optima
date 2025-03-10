import { Skeleton } from "@optima/ui/components/skeleton";
import { cn } from "@optima/ui/lib/utils";
import dynamic from "next/dynamic";

const OrganizationLogoClient = dynamic(
	() =>
		import("./organization-logo-client").then(
			(mod) => mod.OrganizationLogoClient,
		),
	{
		ssr: false,
		loading: () => (
			<div className={cn("flex items-center gap-2 p-2")}>
				<Skeleton className="size-6 rounded-sm" />
				<Skeleton className="w-full h-6 rounded-sm" />
			</div>
		),
	},
);

export function OrganizationLogo() {
	return <OrganizationLogoClient />;
}
