"use client";
import { Button } from "@optima/ui/components/button";
import { AnimatePresence, type Variant, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useCompany } from "@/hooks/use-company";
import { useSession } from "@/hooks/use-session";
import { useSupabase } from "@/hooks/use-supabase";
import { useUserPreferences } from "@/hooks/use-user-preferences";
import { useUserRole } from "@/hooks/use-user-role";
import { hasPermission } from "@/lib/auth/has-permission";
import { getDomainVerificationByCompanyId } from "@optima/supabase/queries";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@optima/ui/components/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@optima/ui/components/dropdown-menu";
import { Separator } from "@optima/ui/components/separator";
import { cn } from "@optima/ui/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle, Circle, Menu } from "lucide-react";
import Link from "next/link";

export function SetupMenu() {
	const supabase = useSupabase();
	const { data: session } = useSession();
	const { data: userRole } = useUserRole();
	const hasCompanyPermission = hasPermission(userRole?.permissions ?? [], [
		"settings:company",
	]);
	const { data: domainVerification, isLoading } = useQuery({
		queryKey: ["domain-verification"],
		enabled: hasCompanyPermission,
		queryFn: async () => {
			const { data, error } = await getDomainVerificationByCompanyId(
				supabase,
				session?.user.user_metadata.company_id,
			);
			if (error) {
				throw error;
			}
			return data;
		},
	});

	const { data: company, isLoading: isCompanyLoading } = useCompany();
	const { data: userPreferences, isLoading: isUserPreferencesLoading } =
		useUserPreferences();
	if (isCompanyLoading || isUserPreferencesLoading) {
		return null;
	}

	if (!hasCompanyPermission && userPreferences) {
		return null;
	}

	if (
		hasCompanyPermission &&
		userPreferences &&
		domainVerification?.verification_status === "verified" &&
		company?.profile &&
		company.profile.length > 0
	) {
		return null;
	}

	// TODO: Add user availability when it's implemented

	return (
		<Card className="fixed z-50 right-4 bottom-4 gap-2 py-2">
			<CardHeader>
				<CardTitle className="text-sm">Complete Setup</CardTitle>
			</CardHeader>
			<CardContent className="px-0">
				<Separator />
				<div className="flex flex-col gap-2 pt-2">
					{hasCompanyPermission ? (
						<>
							<Link href="/company">
								<div className="flex items-center gap-2 px-2">
									{domainVerification?.verification_status === "verified" ? (
										<CheckCircle className="size-4 text-success" />
									) : (
										<Circle className="size-4 text-muted-foreground" />
									)}
									<span
										className={cn(
											"text-sm",
											domainVerification?.verification_status === "verified"
												? "line-through"
												: "",
										)}
									>
										Verify your company domain
									</span>
								</div>
							</Link>
							<Separator />
							<Link href="/company">
								<div className="flex items-center gap-2 px-2">
									{company?.profile && company.profile.length > 0 ? (
										<CheckCircle className="size-4 text-success" />
									) : (
										<Circle className="size-4 text-muted-foreground" />
									)}
									<span
										className={cn(
											"text-sm",
											company?.profile && company.profile.length > 0
												? "line-through"
												: "",
										)}
									>
										Setup company public profile
									</span>
								</div>
							</Link>
						</>
					) : null}
					<Separator />
					<Link href="/account/preferences">
						<div className="flex items-center gap-2 px-2">
							{userPreferences ? (
								<CheckCircle className="size-4 text-success" />
							) : (
								<Circle className="size-4 text-muted-foreground" />
							)}
							<span
								className={cn("text-sm", userPreferences ? "line-through" : "")}
							>
								Setup your preferences
							</span>
						</div>
					</Link>
					<Separator />
					<Link href="/account/availability">
						<div className="flex items-center gap-2 px-2">
							<Circle className="size-4 text-muted-foreground" />
							<span className="text-sm">Setup your availability</span>
						</div>
					</Link>
				</div>
			</CardContent>
		</Card>
	);
}
