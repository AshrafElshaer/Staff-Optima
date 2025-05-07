"use client";
import { DropZone, type DropzoneOptions } from "@/components/drop-zone";

import { queryClient } from "@/lib/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import Editor from "@optima/editor";
import type { Company } from "@optima/supabase/types";
import { companySchema } from "@optima/supabase/validations";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@optima/ui/components/avatar";
import { Button, buttonVariants } from "@optima/ui/components/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@optima/ui/components/form";
import { Input, UrlInput } from "@optima/ui/components/inputs";
import { Label } from "@optima/ui/components/label";
import { AlertDiamondIcon } from "hugeicons-react";

import { OnChangeToast } from "@/components/toasts/on-change-toast";
import { useActionToast } from "@/hooks/use-action-toast";
import { createBrowserClient } from "@/lib/supabase/browser";
import { uploadCompanyLogo } from "@/lib/supabase/storage";
import { CountrySelector } from "@optima/ui/components/selectors/country-selector";
import { Separator } from "@optima/ui/components/separator";

import { useAction } from "next-safe-action/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { Plus } from "lucide-react";
import { toast } from "sonner";
import type { z } from "zod";
import { updateOrganizationAction } from "../company.actions";
import { DomainVerification } from "./domain-verification";

const DROP_ZONE_OPTIONS: DropzoneOptions = {
	accept: {
		"image/png": [".png"],
		"image/jpeg": [".jpg", ".jpeg"],
		"image/svg+xml": [".svg"],
		"image/webp": [".webp"],
		"image/x-icon": [".ico"],
	},
	maxSize: 1000000,
	maxFiles: 1,
	multiple: false,
};

export function CompanyProfileForm({
	company,
}: {
	company: Company;
}) {
	const [resetKey, setResetKey] = useState(0);
	const formSubmitRef = useRef<HTMLButtonElement | null>(null);

	const router = useRouter();

	const {
		execute: updateOrganization,
		executeAsync: updateOrganizationAsync,
		status,
		result,
		reset: resetAction,
		isExecuting,
	} = useAction(updateOrganizationAction, {
		onError: () => {
			queryClient.invalidateQueries({
				queryKey: ["domain-verification"],
			});
			queryClient.invalidateQueries({
				queryKey: ["company"],
			});
			setTimeout(() => {
				resetAction();
			}, 3000);
		},
		onSuccess: ({ data, input }) => {
			queryClient.invalidateQueries({
				queryKey: ["company"],
			});
			queryClient.invalidateQueries({
				queryKey: ["domain-verification"],
			});
			if (input.domain) {
				toast.warning(
					"Domain verification is required. Please re-verify your domain.",
				);
			}
			setTimeout(() => {
				form.reset(
					data
						? {
								...data,
								profile: data.profile ?? undefined,
								logo: data.logo ?? null,
								admin_id: data.admin_id ?? "",
								address_1: data.address_1 ?? null,
								address_2: data.address_2 ?? null,
								city: data.city ?? null,
								created_at: data.created_at ?? "",
								updated_at: data.updated_at ?? "",
								name: data.name ?? "",
								domain: data.domain ?? "",
								industry: data.industry ?? "",
								country: data.country ?? "",
								timezone: data.timezone ?? "",
							}
						: undefined,
					{
						keepDirty: false,
					},
				);
				setResetKey((prev) => prev + 1);
				resetAction();
			}, 3000);
		},
	});

	const defaultValues = useMemo(() => {
		if (!company) return undefined;
		return Object.fromEntries(
			Object.entries(company).map(([key, value]) => [
				key,
				value === null ? undefined : value,
			]),
		);
	}, [company]);

	const form = useForm<z.infer<typeof companySchema>>({
		resolver: zodResolver(companySchema),
		defaultValues,
	});

	function onSubmit(values: z.infer<typeof companySchema>) {
		const dirtyFields = Object.keys(form.formState.dirtyFields).map((key) => {
			return {
				[key]: values[key as keyof typeof values],
			};
		});
		const payload = {
			id: values.id,
			...Object.assign({}, ...dirtyFields),
		};

		updateOrganization(payload);
	}

	async function uploadLogo(file: File) {
		const supabase = createBrowserClient();
		toast.promise(
			async () => {
				const { publicUrl } = await uploadCompanyLogo({
					supabase,
					companyId: form.getValues("id") ?? "",
					file,
				});
				form.setValue("logo", publicUrl, {
					shouldDirty: false,
				});
				return await updateOrganizationAsync({
					id: company?.id ?? "",
					logo: publicUrl,
				});
			},
			{
				loading: "Uploading logo...",
				success: "Logo uploaded successfully",
				error: ({ error }) => error,
			},
		);
	}

	const handleReset = () => {
		form.reset(
			company
				? {
						...company,
						profile: company.profile ?? undefined,
						logo: company.logo ?? null,
						admin_id: company.admin_id ?? "",
						address_1: company.address_1 ?? null,
						address_2: company.address_2 ?? null,
						city: company.city ?? null,
						created_at: company.created_at ?? "",
						updated_at: company.updated_at ?? "",
						name: company.name ?? "",
						domain: company.domain ?? "",
						industry: company.industry ?? "",
						country: company.country ?? "",
						timezone: company.timezone ?? "",
						tax_id: company.tax_id ?? "",
					}
				: undefined,
			{
				keepDirty: false,
			},
		);
		setResetKey((prev) => prev + 1);
	};

	const ToastContent = useCallback(
		({ toastId }: { toastId: string | number }) => {
			return (
				<OnChangeToast
					state={status}
					onReset={handleReset}
					onSave={() => {
						formSubmitRef.current?.click();
					}}
					errorMessage={result?.serverError}
				/>
			);
		},
		[status, result?.serverError],
	);

	useActionToast({
		show: form.formState.isDirty,
		ToastContent,
	});

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-8 w-full max-w-3xl mx-auto px-4"
			>
				<section className="flex flex-col md:flex-row justify-between items-start w-full gap-4">
					<div className="space-y-2 w-full">
						<Label className="font-semibold text-base">Company Logo</Label>
						<p className="text-muted-foreground text-sm">
							Accepts : PNG, JPG, or SVG.
							<br />
							Max size : 1MB
							<br />
							Recommended dimensions: 200x200 pixels.
						</p>
					</div>
					<DropZone
						options={{
							...DROP_ZONE_OPTIONS,
							onDrop: async (acceptedFiles) => {
								const file = acceptedFiles[0];
								if (file) {
									await uploadLogo(file);
								}
							},
							onDropRejected: (rejectedFiles) => {
								for (const file of rejectedFiles) {
									toast.error(file.errors[0]?.message);
								}
							},
						}}
					>
						<Avatar className="size-28 rounded-md">
							<AvatarImage src={company?.logo ?? undefined} />
							<AvatarFallback className="text-7xl rounded-md">
								{`${company?.name[0]}${company?.name[1]}`}
							</AvatarFallback>
						</Avatar>
						<div className="absolute inset-0 bg-background/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 grid place-items-center">
							<Plus className="size-10 text-secondary-foreground" />
						</div>
					</DropZone>
				</section>
				<Separator />

				<section className="flex flex-col md:flex-row justify-between items-start w-full gap-4">
					<div className="space-y-2 w-full md:w-1/2">
						<Label className="font-semibold text-base">Legal Name</Label>
						<p className="text-muted-foreground text-sm">
							Company's registered legal name
						</p>
					</div>
					<div className="w-full md:w-1/2">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input placeholder="Acme Corp" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</section>
				<Separator />

				<section className="flex flex-col md:flex-row justify-between items-start w-full gap-4">
					<div className="space-y-2 w-full md:w-1/2">
						<Label className="font-semibold text-base">Industry</Label>
						<p className="text-muted-foreground text-sm">Company's industry</p>
					</div>
					<div className="w-full md:w-1/2">
						<FormField
							control={form.control}
							name="industry"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input placeholder="Technology" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</section>
				<Separator />
				<section className="flex flex-col md:flex-row justify-between items-start w-full gap-4">
					<div className="space-y-2 w-full md:w-1/2">
						<Label className="font-semibold text-base">
							Tax ID
							<span className="text-muted-foreground text-sm">
								( Optional )
							</span>
						</Label>
						<p className="text-muted-foreground text-sm">
							Company's tax identification number
						</p>
						<p className="text-warning text-sm">
							Private and will not be shared with anyone.
						</p>
					</div>
					<div className="w-full md:w-1/2">
						<FormField
							control={form.control}
							name="tax_id"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											placeholder="1234567890"
											{...field}
											value={field.value ?? ""}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</section>
				<Separator />

				<section className="flex flex-col md:flex-row justify-between items-start w-full gap-4">
					<div className="space-y-2 w-full md:w-1/2">
						<Label className="font-semibold text-base">Domain</Label>
						<p className="text-muted-foreground text-sm">
							Company's official website domain.
						</p>
					</div>
					<div className="w-full md:w-1/2">
						<FormField
							control={form.control}
							name="domain"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<UrlInput placeholder="domain.com" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</section>
				<DomainVerification companyId={form.getValues("id") ?? ""} />
				<Separator />

				<section className="flex flex-col w-full gap-4">
					<div className="space-y-2 w-full">
						<Label className="font-semibold text-base">Location</Label>
						<p className="text-muted-foreground text-sm">
							Company's headquarter address
						</p>
					</div>
					<div className="grid gap-8 md:grid-cols-2">
						<FormField
							control={form.control}
							name="address_1"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Address 1{" "}
										<span className="text-muted-foreground">( Optional )</span>
									</FormLabel>
									<FormControl>
										<Input
											placeholder="123 Main st"
											{...field}
											value={field.value ?? ""}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="address_2"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Address 2{" "}
										<span className="text-muted-foreground">( Optional )</span>
									</FormLabel>
									<FormControl>
										<Input
											placeholder="suite 542"
											{...field}
											value={field.value ?? ""}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="city"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										City{" "}
										<span className="text-muted-foreground">( Optional )</span>
									</FormLabel>
									<FormControl>
										<Input
											placeholder="San Francisco"
											{...field}
											value={field.value ?? ""}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="state"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										State{" "}
										<span className="text-muted-foreground">( Optional )</span>
									</FormLabel>
									<FormControl>
										<Input
											placeholder="California"
											{...field}
											value={field.value ?? ""}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="zip_code"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Zip Code{" "}
										<span className="text-muted-foreground">( Optional )</span>
									</FormLabel>
									<FormControl>
										<Input
											placeholder="12345"
											{...field}
											value={field.value ?? ""}
											inputMode="numeric"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="country"
							render={({ field }) => (
								<FormItem className="">
									<FormLabel>Country</FormLabel>
									<FormControl>
										<CountrySelector
											value={field.value ?? null}
											setValue={(value) => {
												form.setValue("country", value, {
													shouldDirty: true,
												});
												if (form.formState.errors.country) {
													form.clearErrors("country");
												}
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</section>

				<Separator />

				<section className="flex flex-col w-full gap-4">
					<div className="flex flex-col md:flex-row items-center justify-between gap-4">
						<div className="space-y-2 w-full">
							<Label className="font-semibold text-base">Profile</Label>
							<p className="text-muted-foreground text-sm md:w-3/4">
								Write a detailed profile showcasing your company's mission,
								values, services, and achievements.
							</p>
						</div>
						<div className="flex items-center gap-4 w-full md:w-auto">
							<Link
								href={`https://jobs.staffoptima.co/${company?.domain}`}
								className={buttonVariants({ variant: "secondary" })}
								target="_blank"
							>
								Preview
							</Link>
						</div>
					</div>
					<FormField
						control={form.control}
						name="profile"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<div className="w-full border rounded-md min-h-96 p-4 grid">
										<Editor
											content={field.value ?? ""}
											onChange={(content) => {
												form.setValue("profile", content, {
													shouldDirty: true,
													shouldTouch: true,
												});
											}}
											key={resetKey}
										/>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</section>

				<button type="submit" ref={formSubmitRef} className="hidden">
					save
				</button>
			</form>
		</Form>
	);
}
