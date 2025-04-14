import { buttonVariants } from "@optima/ui/components/button";
import Link from "next/link";

export default function OrganizationEmailTemplatesPage() {
	return (
		<div className="flex flex-col gap-4 flex-1">
			<h1 className="text-2xl font-bold">Organization Email Templates</h1>
			<Link
				href="/organization/email-templates/create"
				className={buttonVariants({ variant: "secondary" })}
			>
				Create Template
			</Link>
			<Link
				href="/organization/email-templates/sign-up"
				className={buttonVariants({ variant: "secondary" })}
			>
				Sign Up Template
			</Link>
		</div>
	);
}
