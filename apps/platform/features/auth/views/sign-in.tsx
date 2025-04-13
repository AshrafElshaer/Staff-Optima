"use client";

import { Button } from "@optima/ui/components/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@optima/ui/components/card";
import { Icons } from "@optima/ui/components/icons";
import { Input } from "@optima/ui/components/inputs";
import { Label } from "@optima/ui/components/label";
import { Separator } from "@optima/ui/components/separator";
import { AnimatePresence, motion } from "motion/react";

import { useAction } from "next-safe-action/hooks";
import { useQueryStates } from "nuqs";
import { toast } from "sonner";

import { z } from "zod";
import { authSearchParams } from "../auth-search-params";
import { signInAction } from "../auth.actions";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@optima/ui/components/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
	email: z.string().email(),
});

export function SignIn() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
		},
	});

	const { execute, isExecuting } = useAction(signInAction, {
		onError: ({ error }) => {
			toast.error(error.serverError);
		},
		onSuccess: (res) => {
			setAuthParams({
				auth_type: res?.data?.properties?.verification_type as
					| "signup"
					| "magiclink",
				email: res?.data?.user?.email,
				active_tab: "verify-otp",
			});
		},
	});
	const [_, setAuthParams] = useQueryStates(authSearchParams, {
		shallow: true,
	});

	async function onSubmit(data: z.infer<typeof formSchema>) {
		execute(data);
	}

	return (
		<Card className="w-full max-w-sm pt-8 mx-auto">
			<CardHeader className="items-center">
				<Icons.Logo className="size-16" />
				<CardTitle className="mt-6">Welcome back</CardTitle>
				<CardDescription>Sign in to your account to continue.</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email Address</FormLabel>
									<FormControl>
										<Input
											inputMode="email"
											className="bg-accent"
											placeholder="example@domain.com"
											startIcon={<Icons.Mail className="size-5" />}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							type="submit"
							className="w-full"
							variant={"secondary"}
							disabled={isExecuting}
						>
							<AnimatePresence mode="wait" initial={false}>
								{!isExecuting ? (
									<motion.span
										key="continue"
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										transition={{ duration: 0.3 }}
									>
										Continue
									</motion.span>
								) : (
									<motion.span
										key="sending"
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										transition={{ duration: 0.3 }}
										className="flex items-center gap-2"
									>
										<Icons.Loader className="size-4 animate-spin " />
										Sending one time code...
									</motion.span>
								)}
							</AnimatePresence>
						</Button>
					</form>
				</Form>
			</CardContent>
			<Separator />
			<CardFooter className="flex-col items-start">
				<div className="flex items-center gap-2">
					<p className=" text-sm text-secondary-foreground">
						By signing in you agree to our{" - "}
					</p>
					<Button variant="link" className="p-0">
						Terms of Service
					</Button>
				</div>
				<div className="flex items-center gap-2">
					<p className=" text-sm text-secondary-foreground">Need help ?</p>
					<Button variant="link" className="p-0">
						Contact Support
					</Button>
				</div>
			</CardFooter>
		</Card>
	);
}
