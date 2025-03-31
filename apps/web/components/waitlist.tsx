"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@optima/ui/components/button";
import { Input } from "@optima/ui/components/inputs";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@optima/ui/components/form";
// import { addToWaitlistAction } from "@/actions/add-to-waitlist";
import { cn } from "@optima/ui/lib/utils";
import { Loading03Icon, Mail01Icon } from "hugeicons-react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
const waitlistSchema = z.object({
	email: z.string().email(),
});

export function Waitlist() {
	// const { execute, isExecuting } = useAction(addToWaitlistAction, {
	// 	onSuccess: () => {
	// 		toast.success("You've been added to the waitlist");
	// 		form.reset();
	// 	},
	// 	onError: ({ error }) => {
	// 		if (error?.serverError?.includes("You're already on the waitlist")) {
	// 			toast.info(error.serverError);
	// 		} else {
	// 			toast.error(error.serverError);
	// 		}
	// 	},
	// });
	const form = useForm<z.infer<typeof waitlistSchema>>({
		resolver: zodResolver(waitlistSchema),
		defaultValues: {
			email: "",
		},
	});

	const onSubmit = (data: z.infer<typeof waitlistSchema>) => {
		// execute(data);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className="flex items-start justify-center gap-2 max-w-md mx-auto">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										type="email"
										placeholder="Email for waitlist"
										id="waitlist-email"
										wrapperClassName={cn(
											form.formState.errors.email &&
												"border-destructive outline-none",
										)}
										startIcon={<Mail01Icon className="size-5" />}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						variant="default"
						className="min-w-fit"
						// disabled={isExecuting}
					>
						{/* {isExecuting ? (
							<Loading03Icon className="size-4 animate-spin" />
						) : null} */}
						Join Waitlist
					</Button>
				</div>
			</form>
		</Form>
	);
}
