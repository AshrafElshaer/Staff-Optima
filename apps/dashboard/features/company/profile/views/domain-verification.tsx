"use client";
import { CopyToClipboard } from "@/components/copy-to-clipboard";
import { useSupabase } from "@/hooks/use-supabase";
import { queryClient } from "@/lib/react-query";
// import { getDomainVerificationByOrganizationId } from "@optima/supabase/queries";
import { Badge } from "@optima/ui/components/badge";
import { Button } from "@optima/ui/components/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@optima/ui/components/card";
import { cn } from "@optima/ui/lib/utils";

import { Separator } from "@optima/ui/components/separator";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
	sendDomainVerificationEmailAction,
	verifyDomainAction,
} from "../company.actions";

import { Input } from "@optima/ui/components/inputs";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@optima/ui/components/popover";
import { MailSend02Icon, SentIcon } from "hugeicons-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export function DomainVerification({
	companyId,
}: {
	companyId: string;
}) {
	const router = useRouter();
	const supabase = useSupabase();
	const { executeAsync: verifyDomain, isExecuting } = useAction(
		verifyDomainAction,
		{
			onSuccess: () => {
				router.refresh();
			},
		},
	);
	const { data: domainVerification, isLoading } = useQuery({
		queryKey: ["domain-verification"],
		queryFn: async () => {
			const { data, error } = await getDomainVerificationByCompanyId(
				supabase,
				companyId,
			);
			if (error) {
				throw error;
			}
			return data;
		},
	});

	const status = domainVerification?.verification_status;

	async function handleVerifyDomain() {
		if (!domainVerification) return;
		toast.promise(
			async () => {
				const result = await verifyDomain({
					...domainVerification,
					// created_at: undefined,
					// updated_at: undefined,
				});
				if (result?.serverError) {
					throw new Error(result.serverError);
				}
				queryClient.invalidateQueries({
					queryKey: ["company"],
				});
				queryClient.invalidateQueries({
					queryKey: ["domain-verification"],
				});
			},
			{
				loading: "Verifying your domain...",
				success: "Domain verified successfully",
				error: (error) => `${error.message}`,
			},
		);
	}

	if (isLoading)
		return (
			<Card className={cn("bg-sidebar")}>
				<CardHeader>
					<CardTitle className="flex items-start gap-2">
						<div className="flex flex-col gap-2 sm:flex-row sm:items-center">
							<span className="min-w-fit">Domain Verification</span>

							<Skeleton className="w-18 h-7" />
						</div>
						<Button
							size="sm"
							variant="outline"
							className="ml-auto"
							type="button"
							disabled
						>
							Verify
						</Button>
						<Button size="sm" variant="outline" disabled>
							<MailSend02Icon className="w-4 h-4" />
						</Button>
					</CardTitle>
					<CardDescription>
						<p>
							Verify your domain to ensure that your organization is properly
							identified.
						</p>
					</CardDescription>
				</CardHeader>
				<Separator />
				<CardContent className="space-y-4">
					<div className="overflow-auto -mx-6 px-6">
						<div className="grid gap-4">
							<div className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-2 rounded-md border p-4">
								<div className="text-sm font-medium text-muted-foreground">
									Name
								</div>
								<div className="flex items-center justify-between text-sm">
									staffoptima_verification
								</div>

								<div className="text-sm font-medium text-muted-foreground">
									Type
								</div>
								<div className="text-sm">TXT</div>

								<div className="text-sm font-medium text-muted-foreground">
									Value
								</div>
								<div className="flex items-center justify-between text-sm overflow-auto">
									<Skeleton className="w-2/3 h-6 rounded-md" />
								</div>

								<div className="text-sm font-medium text-muted-foreground">
									TTL
								</div>
								<div className="text-sm">60</div>

								<div className="text-sm font-medium text-muted-foreground">
									Priority
								</div>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		);

	return (
		<Card
			className={cn(
				"bg-sidebar",
				status === "pending" && "border-warning",
				status === "failed" && "border-destructive",
			)}
		>
			<CardHeader>
				<CardTitle className="flex items-start gap-2">
					<div className="flex flex-col gap-2 sm:flex-row sm:items-center">
						<span className="min-w-fit">Domain Verification</span>
						<Badge
							variant={
								status === "pending"
									? "warning"
									: status === "verified"
										? "success"
										: "destructive"
							}
							className="rounded-sm capitalize"
						>
							{status}
						</Badge>
					</div>
					<Button
						size="sm"
						variant="outline"
						className="ml-auto"
						type="button"
						onClick={handleVerifyDomain}
						disabled={isExecuting}
					>
						{isExecuting ? "Verifying..." : "Verify"}
					</Button>
					<ForwardDnsEmail companyId={companyId} />
				</CardTitle>
				<CardDescription>
					<p>
						Verify your domain to ensure that your organization is properly
						identified.
					</p>
				</CardDescription>
			</CardHeader>
			<Separator />
			<CardContent className="space-y-4">
				{domainVerification?.verification_date ? (
					<p className="text-secondary-foreground">
						Verified at{" "}
						{moment(domainVerification.verification_date).format("MMM D, YYYY")}
					</p>
				) : null}
				<div className="overflow-auto -mx-6 px-6">
					<div className="grid gap-4">
						<div className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-2 rounded-md border p-4">
							<div className="text-sm font-medium text-muted-foreground">
								Name
							</div>
							<div className="flex items-center justify-between text-sm">
								staffoptima_verification
								<CopyToClipboard text="staffoptima_verification" />
							</div>

							<div className="text-sm font-medium text-muted-foreground">
								Type
							</div>
							<div className="text-sm">TXT</div>

							<div className="text-sm font-medium text-muted-foreground">
								Value
							</div>
							<div className="flex items-center justify-between text-sm overflow-auto">
								{domainVerification?.verification_token}
								<CopyToClipboard
									text={domainVerification?.verification_token ?? ""}
								/>
							</div>

							<div className="text-sm font-medium text-muted-foreground">
								TTL
							</div>
							<div className="text-sm">60</div>

							<div className="text-sm font-medium text-muted-foreground">
								Priority
							</div>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

import { zodResolver } from "@hookform/resolvers/zod";
import {
	getDomainVerificationByCompanyId,
	getDomainVerificationByToken,
} from "@optima/supabase/queries";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@optima/ui/components/form";
import { Skeleton } from "@optima/ui/components/skeleton";
import { Check, CheckCircleIcon, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Icons } from "@optima/ui/components/icons";

const formSchema = z.object({
	email: z.string().email(),
});

export function ForwardDnsEmail({
	companyId,
}: {
	companyId: string;
}) {
	const [open, setOpen] = useState(false);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
		},
	});
	const {
		execute: sendDomainVerificationEmail,
		isExecuting,
		status,
		reset,
	} = useAction(sendDomainVerificationEmailAction, {
		onSuccess: () => {
			form.reset();
			setTimeout(() => {
				setOpen(false);
				reset();
			}, 1000);
		},
		onError: ({ error }) => {
			toast.error(error.serverError);
		},
	});

	const onSubmit = (data: z.infer<typeof formSchema>) => {
		sendDomainVerificationEmail({
			company_id: companyId,
			sendTo: data.email,
		});
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button variant="outline" size="icon">
					<MailSend02Icon className="w-4 h-4" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="space-y-2 p-2" align="end">
				<p className="text-sm text-secondary-foreground">
					Forward Instructions to
				</p>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex items-start gap-2"
					>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input placeholder="Email" {...field} inputMode="email" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							variant="secondary"
							size="icon"
							type="submit"
							disabled={isExecuting}
						>
							<AnimatePresence mode="wait">
								{status === "executing" ? (
									<motion.div
										key="loading"
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										transition={{ duration: 0.1 }}
									>
										<Icons.Loader className="w-4 h-4 animate-spin" />
									</motion.div>
								) : status === "hasSucceeded" ? (
									<motion.div
										key="success"
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										transition={{ duration: 0.1 }}
									>
										<Check className="w-4 h-4 text-success" />
									</motion.div>
								) : (
									<motion.div
										key="default"
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										transition={{ duration: 0.1 }}
									>
										<SentIcon className="w-4 h-4" />
									</motion.div>
								)}
							</AnimatePresence>
						</Button>
					</form>
				</Form>
			</PopoverContent>
		</Popover>
	);
}
