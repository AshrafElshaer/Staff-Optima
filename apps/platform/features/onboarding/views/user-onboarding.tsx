"use client";

import { TextGenerateEffect } from "@/components/magic-ui/text-animate";
import { PhoneInput } from "@/components/phone-number-input";
import { authClient } from "@/lib/auth/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { userUpdateSchema } from "@optima/database/validations";
import { Button } from "@optima/ui/components/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@optima/ui/components/form";
import { Input } from "@optima/ui/components/inputs/input";
import { AnimatePresence, motion } from "framer-motion";
import type { CountryCode } from "libphonenumber-js";
import { Loader } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCountdown } from "usehooks-ts";
import type { z } from "zod";
import { onboardUserAction } from "../onboarding.actions";
export function UserOnboarding({ countryCode }: { countryCode: string }) {
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
						className: "flex-grow grid place-content-center w-full  p-4",
					}}
				>
					<TextGenerateEffect
						words="First, let's gather basic information about you."
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
					className="w-full p-4 max-w-lg mx-auto"
				>
					<UserForm countryCode={countryCode} />
				</motion.div>
			)}
		</AnimatePresence>
	);
}

function UserForm({ countryCode }: { countryCode: string }) {
	// const { data: session } = useSession();
	const { data: session } = authClient.useSession();
	const router = useRouter();

	const form = useForm<z.infer<typeof userUpdateSchema>>({
		defaultValues: {
			id: session?.user.id ?? "",
			email: session?.user.email ?? "",
			name: session?.user.name ?? "",
			phoneNumber: session?.user.phoneNumber ?? "",
		},
		resolver: zodResolver(userUpdateSchema),
	});

	const { executeAsync: updateUser, status } = useAction(onboardUserAction, {
		onError: ({ error }) => {
			toast.error(error.serverError);
		},
		onSuccess: () => {
			router.push("/onboarding/organization");
		},
	});

	async function onSubmit(data: z.infer<typeof userUpdateSchema>) {
		await updateUser(data);
	}

	useEffect(() => {
		form.setValue("email", session?.user.email ?? "");
		form.setValue("name", session?.user.name ?? "");
		form.setValue("phoneNumber", session?.user.phoneNumber ?? "");
		form.setValue("id", session?.user.id ?? "");
	}, [session?.user]);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem className="space-y-2">
							<FormLabel>Full Name</FormLabel>
							<FormControl>
								<Input placeholder="John Doe" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="phoneNumber"
					render={({ field }) => (
						<FormItem className="space-y-2">
							<FormLabel>Phone Number</FormLabel>
							<FormControl>
								<PhoneInput
									className="w-full"
									value={field.value ?? ""}
									onChange={(value) => field.onChange(value ?? "")}
									placeholder="+1234567890"
									defaultCountry={countryCode as CountryCode}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem className="space-y-2">
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder="john.doe@example.com" {...field} disabled />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					type="submit"
					className="w-full"
					disabled={form.formState.isSubmitting || status === "hasSucceeded"}
				>
					{form.formState.isSubmitting ? (
						<Loader className="size-4 animate-spin " />
					) : null}
					Continue
				</Button>
			</form>
		</Form>
	);
}
