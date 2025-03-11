import { buttonVariants } from "@optima/ui/components/button";
import Link from "next/link";

export default function JobsPage() {
	return (
		<main className="flex flex-col items-start flex-1 gap-4">
			<Link
				href="/jobs/create"
				className={buttonVariants({ variant: "default" })}
			>
				Create Job
			</Link>
			<Link href="/jobs/123" className={buttonVariants({ variant: "default" })}>
				Job 123
			</Link>
		</main>
	);
}
