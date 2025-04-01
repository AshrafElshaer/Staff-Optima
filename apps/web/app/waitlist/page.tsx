"use client";
import { joinWaitlistAction } from "@/actions/join-waitlist";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@optima/ui/components/button";
import confetti from "canvas-confetti";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@optima/ui/components/card";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@optima/ui/components/form";
import { Input } from "@optima/ui/components/inputs";
import { Separator } from "@optima/ui/components/separator";
import { Loader } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
	name: z.string().min(2, {
		message: "Name is required",
	}),
	email: z.string().email(),
});

export default function Waitlist() {
	const form = useForm<z.infer<typeof formSchema>>({
		defaultValues: {
			name: "",
			email: "",
		},
		resolver: zodResolver(formSchema),
	});
	const router = useRouter();

	const { execute, isExecuting } = useAction(joinWaitlistAction, {
		onError: ({ error }) => {
			if (
				error.serverError?.includes(
					"duplicate key value violates unique constraint",
				)
			) {
				return toast.info("You are already on the list");
			}

			toast.error(error.serverError);
		},
		onSuccess: () => {
			form.reset({
				name: "",
				email: "",
			});
			runConfetti();
			toast.success("You are on the waitlist, stay tuned!");
			setTimeout(() => {
				router.push("/");
			}, 3000);
		},
	});

	function onSubmit(data: z.infer<typeof formSchema>) {
		execute(data);
	}
	return (
		<div className="flex-1 flex flex-col px-4 justify-center items-center">
			<Card className="w-full max-w-sm bg-sidebar">
				<CardHeader className="justify-center items-center">
					<CardTitle>Join the Waitlist – Be the First to Know!</CardTitle>
					<CardDescription>
						Sign up for early access and exclusive updates!
					</CardDescription>
				</CardHeader>
				<Separator />
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
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
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email Address</FormLabel>
										<FormControl>
											<Input placeholder="example@domain.com" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button
								className="w-full"
								variant={"secondary"}
								disabled={isExecuting}
							>
								{isExecuting ? <Loader className="animate-spin" /> : null}
								Join Waitlist
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}

function runConfetti() {
	const end = Date.now() + 3 * 1000; // 3 seconds
	const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

	const frame = () => {
		if (Date.now() > end) return;

		confetti({
			particleCount: 2,
			angle: 60,
			spread: 55,
			startVelocity: 60,
			origin: { x: 0, y: 0.5 },
			colors: colors,
		});
		confetti({
			particleCount: 2,
			angle: 120,
			spread: 55,
			startVelocity: 60,
			origin: { x: 1, y: 0.5 },
			colors: colors,
		});

		requestAnimationFrame(frame);
	};

	frame();
}
