"use client";

import { createBrowserClient } from "@/lib/supabase/browser";
import { getCompanyByDomain } from "@optima/supabase/queries";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@optima/ui/components/avatar";
import { Button } from "@optima/ui/components/button";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
export default function OrganizationLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();
	const pathname = usePathname();
	const domain = pathname.split("/")[1];
	const supabase = createBrowserClient();
	const { data: company, error } = useQuery({
		queryKey: ["company", domain],
		queryFn: async () => {
			const { data, error } = await getCompanyByDomain(supabase, domain ?? "");
			if (error) {
				throw new Error(error.message);
			}
			return data;
		},
	});

	return (
		<div className="flex flex-col min-h-[calc(100svh-53px)]">
			<header className="flex items-center justify-center w-full  sticky top-0 bg-secondary z-10 p-4">
				{pathname !== `/${domain}` ? (
					<Button
						onClick={() => router.back()}
						variant="link"
						className="absolute left-4"
						size="icon"
					>
						<ChevronLeft className="size-6" />
					</Button>
				) : null}
				<Link
					href={`https://${company?.domain}`}
					target="_blank"
					className="flex items-center gap-4"
				>
					<Avatar className="size-10">
						<AvatarImage src={company?.logo ?? undefined} />
						<AvatarFallback>{company?.name.slice(0, 2)}</AvatarFallback>
					</Avatar>

					<h1 className="text-3xl font-bold">{company?.name}</h1>
				</Link>
			</header>
			{children}
		</div>
	);
}
