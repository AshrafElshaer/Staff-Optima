import { CopyToClipboard } from "@/components/copy-to-clipboard";
import { Button } from "@optima/ui/components/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@optima/ui/components/card";
import { Label } from "@optima/ui/components/label";
import { Separator } from "@optima/ui/components/separator";
import { Skeleton } from "@optima/ui/components/skeleton";
import { cn } from "@optima/ui/lib/utils";
import { MailSend02Icon } from "hugeicons-react";

export default function OrganizationProfileLoading() {
	return (
		<div className="space-y-8 w-full max-w-3xl mx-auto px-4">
			<section className="flex flex-col md:flex-row justify-between items-start w-full gap-4">
				<div className="space-y-2 w-full">
					<Label className="font-semibold text-base">Organization Logo</Label>
					<p className="text-muted-foreground text-sm">
						Accepts : PNG, JPG, or SVG.
						<br />
						Max size : 1MB
						<br />
						Recommended dimensions: 200x200 pixels.
					</p>
				</div>
				<Skeleton className="size-28 rounded-md" />
			</section>
			<Separator />

			<section className="flex flex-col md:flex-row justify-between items-start w-full gap-4">
				<div className="space-y-2 w-full md:w-1/2">
					<Label className="font-semibold text-base">Legal Name</Label>
					<p className="text-muted-foreground text-sm">
						Organization's registered legal name
					</p>
				</div>
				<div className="w-full md:w-1/2">
					<Skeleton className="w-full h-9 rounded-md" />
				</div>
			</section>
			<Separator />

			<section className="flex flex-col md:flex-row justify-between items-start w-full gap-4">
				<div className="space-y-2 w-full md:w-1/2">
					<Label className="font-semibold text-base">Domain</Label>
					<p className="text-muted-foreground text-sm">
						organization's official website domain.
					</p>
				</div>
				<div className="w-full md:w-1/2">
					<Skeleton className="w-full h-9 rounded-md" />
				</div>
			</section>
			<Card className={cn("bg-sidebar")}>
				<CardHeader>
					<CardTitle className="flex items-start gap-2">
						<div className="flex flex-col gap-2 sm:flex-row sm:items-center">
							<span className="min-w-fit">Domain Verification</span>

							<Skeleton className="w-18 h-7" />
						</div>
						<Button
							variant="outline"
							className="ml-auto"
							type="button"
							disabled
						>
							Verify
						</Button>
						<Button variant="outline" size="icon" disabled>
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
			<Separator />

			<section className="flex flex-col w-full gap-4">
				<div className="space-y-2 w-full">
					<Label className="font-semibold text-base">Location</Label>
					<p className="text-muted-foreground text-sm">
						organization's headquarter address
					</p>
				</div>
				<div className="grid gap-8 md:grid-cols-2">
					<div className="space-y-2">
						<Label className="font-semibold">Address 1</Label>
						<Skeleton className="w-full h-9 rounded-md" />
					</div>
					<div className="space-y-2">
						<Label className="font-semibold">Address 2</Label>
						<Skeleton className="w-full h-9 rounded-md" />
					</div>
					<div className="space-y-2">
						<Label className="font-semibold">City</Label>
						<Skeleton className="w-full h-9 rounded-md" />
					</div>
					<div className="space-y-2">
						<Label className="font-semibold">State</Label>
						<Skeleton className="w-full h-9 rounded-md" />
					</div>
					<div className="space-y-2">
						<Label className="font-semibold">Zip Code</Label>
						<Skeleton className="w-full h-9 rounded-md" />
					</div>
					<div className="space-y-2">
						<Label className="font-semibold">Country</Label>
						<Skeleton className="w-full h-9 rounded-md" />
					</div>
				</div>
			</section>

			<Separator />

			<section className="flex flex-col w-full gap-4">
				<div className="flex flex-col md:flex-row items-center justify-between gap-4">
					<div className="space-y-2 w-full">
						<Label className="font-semibold text-base">Profile</Label>
						<p className="text-muted-foreground text-sm md:w-3/4">
							Write a detailed profile showcasing your organization's mission,
							values, services, and achievements.
						</p>
					</div>
					<div className="flex items-center gap-4 w-full md:w-auto">
						<Button disabled variant="secondary">
							Preview
						</Button>
					</div>
				</div>
				<Skeleton className="w-full h-96 rounded-md" />
			</section>
		</div>
	);
}
