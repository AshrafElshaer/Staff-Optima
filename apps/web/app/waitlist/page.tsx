"use client";
import { joinWaitlistAction } from "@/actions/join-waitlist";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, buttonVariants } from "@optima/ui/components/button";
import confetti from "canvas-confetti";

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@optima/ui/components/form";
import { Icons } from "@optima/ui/components/icons";
import { Input } from "@optima/ui/components/inputs";
import { Separator } from "@optima/ui/components/separator";
import { useAction } from "next-safe-action/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { BsGithub } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
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
		<div className="flex-1 flex flex-col px-4 pt-10 justify-center items-center">
			<h1 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold  md:text-center mb-4">
				Join the Waitlist – Be the First to Know!
			</h1>
			<p className="w-2/3 mx-auto text-sm text-center mb-8 hidden md:block">
				Sign up for early access and stay ahead! Be the first to get updates,
				exclusive features, and launch details.
			</p>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-4 w-full max-w-sm mb-12"
				>
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
									<Input
										placeholder="example@domain.com"
										inputMode="email"
										{...field}
									/>
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
						{isExecuting ? <Icons.Loader className="animate-spin" /> : null}
						Join Waitlist
					</Button>
				</form>
			</Form>

			<div className="flex flex-col items-center gap-4 justify-center">
				<p className="text-lg text-center">Follow Us On</p>
				<div className="flex items-center justify-center gap-4">
					<Link
						href="https://github.com/AshrafElshaer/staff-Optima"
						className={buttonVariants({
							variant: "outline",
							className: "h-auto",
						})}
						target="_blank"
					>
						<BsGithub className="size-10" />
					</Link>
					<Link
						href="https://x.com/staffoptima"
						className={buttonVariants({
							variant: "outline",
							className: "h-auto",
						})}
						target="_blank"
					>
						<FaXTwitter className="size-10 " />
					</Link>
				</div>
			</div>
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
