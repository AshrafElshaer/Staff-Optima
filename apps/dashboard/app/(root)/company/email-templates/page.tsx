import { buttonVariants } from "@optima/ui/components/button";
import Link from "next/link";

export default function CompanyEmailTemplatesPage() {
	return (
		<div className="flex flex-col gap-4 flex-1">
			<h1 className="text-2xl font-bold">Company Email Templates</h1>
			<Link
				href="/company/email-templates/create"
				className={buttonVariants({ variant: "secondary" })}
			>
				Create Template
			</Link>
			<Link
				href="/company/email-templates/sign-up"
				className={buttonVariants({ variant: "secondary" })}
			>
				Sign Up Template
			</Link>
		</div>
	);
}
