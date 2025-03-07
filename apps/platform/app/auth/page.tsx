"use client";
import { authClient } from "@/lib/auth/auth-client";
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
import { Input } from "@optima/ui/components/input";
import { Label } from "@optima/ui/components/label";
import { Separator } from "@optima/ui/components/separator";

export default function AuthPage() {
	return (
		<main className="flex h-screen w-screen items-center justify-center">
			<Card className="w-96">
				<CardHeader className="items-center gap-4">
					<CardTitle>
						<Icons.Logo className="size-16" />
					</CardTitle>
					<CardDescription>Welcome back! Sign in to continue.</CardDescription>
				</CardHeader>
				<CardContent>
					{/* <AuthForm /> */}
					<form className="space-y-4">
						<Label>Email Address</Label>
						<Input
							inputMode="email"
							className="bg-accent"
							placeholder="example@domain.com"
							startIcon={<Icons.Mail className="size-5" />}
						/>
						<Button className="w-full">Sign in</Button>
					</form>
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
		</main>
	);
}
