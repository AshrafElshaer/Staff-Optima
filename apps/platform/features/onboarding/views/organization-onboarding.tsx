"use client";

import { TextGenerateEffect } from "@/components/magic-ui/text-animate";

import { zodResolver } from "@hookform/resolvers/zod";
import { organizationInsertSchema } from "@optima/supabase/validations";
import { Button, buttonVariants } from "@optima/ui/components/button";
import { Input } from "@optima/ui/components/inputs/input";
import { UrlInput } from "@optima/ui/components/inputs/url-input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@optima/ui/components/select";
import { AnimatePresence, motion } from "motion/react";
import { useAction } from "next-safe-action/hooks";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { countries } from "@optima/location";
import { CountrySelector } from "@optima/ui/components/selectors/country-selector";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCountdown } from "usehooks-ts";
import type { z } from "zod";
import { onboardOrganizationAction } from "../onboarding.actions";

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@optima/ui/components/form";
import { TimezoneSelector } from "@optima/ui/components/selectors/timezone-selector";
import { Icons } from "@optima/ui/components/icons";
export function OrganizationOnboarding() {
	const [counter, { startCountdown }] = useCountdown({
		countStart: 3,
		intervalMs: 1000,
	});

	useEffect(() => {
		startCountdown();
	}, [startCountdown]);

	return (
		<AnimatePresence mode="wait">
			{counter !== 0 ? (
				<motion.div
					key={"welcome-message"}
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -10 }}
					transition={{ duration: 0.4 }}
					custom={{
						className: "flex-grow grid place-content-center w-full p-4",
					}}
				>
					<TextGenerateEffect
						words="Now, let's set up your organization."
						className="w-full"
					/>
				</motion.div>
			) : (
				<motion.div
					key={"onboarding-form"}
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -10 }}
					transition={{ duration: 0.4 }}
					custom={{ className: "w-full p-4" }}
				>
					<OrganizationForm />
				</motion.div>
			)}
		</AnimatePresence>
	);
}

function OrganizationForm() {
	const router = useRouter();

	const form = useForm<z.infer<typeof organizationInsertSchema>>({
		resolver: zodResolver(organizationInsertSchema),
		defaultValues: {
			country: "",
			address_1: "",
			address_2: "",
			city: "",
			state: "",
			zip_code: "",
			industry: "",
			domain: "",
			name: "",
			profile: "",
			timezone: "",
			employee_count: "",
			tax_id: "",
		},
	});

	const { executeAsync: createOrganization, status } = useAction(
		onboardOrganizationAction,
		{
			onError: ({ error }) => {
				if (error.serverError?.includes("please use a different domain")) {
					form.setError("domain", {
						message: "This domain is already taken",
					});
				}
				toast.error(error?.serverError);
			},
			onSuccess: () => {
				router.push("/onboarding/congrats");
			},
		},
	);

	async function onSubmit(data: z.infer<typeof organizationInsertSchema>) {
		await createOrganization({ ...data });
	}

	useEffect(() => {
		const countryCode = navigator.language.split("-")[1];
		const country = countries.find((country) => country.cca2 === countryCode);
		form.setValue("country", country?.name ?? "");
	}, [form.setValue]);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
				<div className="flex flex-col sm:flex-row gap-6">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Company Name</FormLabel>
								<FormControl>
									<Input placeholder="Acme Corp" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="domain"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Website</FormLabel>
								<FormControl>
									<UrlInput placeholder="domain.example" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="flex flex-col sm:flex-row gap-6">
					<FormField
						control={form.control}
						name="industry"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Industry</FormLabel>
								<FormControl>
									<Input placeholder="Technology" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="employee_count"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>
									Company Size
									<span className="text-muted-foreground text-sm">
										( Optional )
									</span>
								</FormLabel>
								<FormControl>
									<Select
										value={field.value ?? undefined}
										onValueChange={field.onChange}
									>
										<SelectTrigger
											className={buttonVariants({
												variant: "secondary",
												className: "w-full !justify-between",
											})}
										>
											<SelectValue placeholder="Select Company Size" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="1-10">1-10</SelectItem>
											<SelectItem value="11-50">11-50</SelectItem>
											<SelectItem value="51-200">51-200</SelectItem>
											<SelectItem value="201-500">201-500</SelectItem>
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="tax_id"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>
									Tax ID
									<span className="text-muted-foreground text-sm">
										( Optional )
									</span>
								</FormLabel>
								<FormControl>
									<Input
										placeholder="123456789"
										{...field}
										value={field.value || ""}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<FormField
					control={form.control}
					name="address_1"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormLabel>
								Address 1{" "}
								<span className="text-muted-foreground">( Optional )</span>
							</FormLabel>
							<FormControl>
								<Input
									placeholder="123 Main st"
									{...field}
									value={field.value || ""}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex flex-col sm:flex-row gap-6">
					<FormField
						control={form.control}
						name="address_2"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>
									Address 2{" "}
									<span className="text-muted-foreground">( Optional )</span>
								</FormLabel>
								<FormControl>
									<Input
										placeholder="suite #512"
										{...field}
										value={field.value || ""}
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
							<FormItem className="w-full">
								<FormLabel>
									City{" "}
									<span className="text-muted-foreground">( Optional )</span>
								</FormLabel>
								<FormControl>
									<Input
										placeholder="New York"
										{...field}
										value={field.value || ""}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="flex flex-col sm:flex-row gap-6">
					<FormField
						control={form.control}
						name="state"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>
									State{" "}
									<span className="text-muted-foreground">( Optional )</span>
								</FormLabel>
								<FormControl>
									<Input
										placeholder="Texas"
										{...field}
										value={field.value || ""}
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
							<FormItem className="w-full">
								<FormLabel>
									Zip Code{" "}
									<span className="text-muted-foreground">( Optional )</span>
								</FormLabel>
								<FormControl>
									<Input
										placeholder="12345"
										{...field}
										value={field.value || ""}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="flex flex-col sm:flex-row gap-6">
					<FormField
						control={form.control}
						name="country"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Country</FormLabel>
								<FormControl>
									<CountrySelector
										value={field.value}
										setValue={(value) => {
											field.onChange(value);
											form.clearErrors("country");
										}}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="timezone"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Timezone</FormLabel>
								<FormControl>
									<TimezoneSelector
										value={field.value}
										onValueChange={(value) => {
											field.onChange(value);
											form.clearErrors("timezone");
										}}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<Button
					type="submit"
					className="w-full"
					disabled={form.formState.isSubmitting || status === "hasSucceeded"}
				>
					{form.formState.isSubmitting ? (
						<Icons.Loader className="size-4 animate-spin mr-2" />
					) : null}
					Complete Setup
				</Button>
			</form>
		</Form>
	);
}
