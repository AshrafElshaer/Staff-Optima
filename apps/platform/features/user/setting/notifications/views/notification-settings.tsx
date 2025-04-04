"use client";
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
import { Switch } from "@optima/ui/components/switch";

export function NotificationSettings() {
	return (
		<Card className="max-w-3xl ">
			<CardHeader>
				<CardTitle>Notification Settings</CardTitle>
				<CardDescription>
					Manage your personal notification settings for this account.
				</CardDescription>
			</CardHeader>
			<Separator />
			<CardContent className="flex flex-col gap-4">
				<h3 className="font-medium mb-4">In-App Notifications</h3>

				<div className="flex items-center justify-between gap-2 ">
					<div className="space-y-1">
						<Label htmlFor="interview-scheduling">Interview Scheduling</Label>
						<p className="text-sm text-muted-foreground">
							Get notified when interviews are scheduled, rescheduled or
							cancelled.
						</p>
					</div>
					<Switch id="interview-scheduling" />
				</div>
				<Separator />

				<div className="flex items-center justify-between gap-2 ">
					<div className="space-y-1">
						<Label htmlFor="interview-reminders">Interview Reminders</Label>
						<p className="text-sm text-muted-foreground">
							Receive notifications 24 hours before scheduled interviews.
						</p>
					</div>
					<Switch id="interview-reminders" />
				</div>

				<Separator />

				<div className="flex items-center justify-between gap-2 ">
					<div className="space-y-1">
						<Label htmlFor="calendar-updates">Calendar Updates</Label>
						<p className="text-sm text-muted-foreground">
							Get notified about changes to interview calendar invites.
						</p>
					</div>
					<Switch id="calendar-updates" />
				</div>

				<Separator />

				<h3 className="font-medium my-4">Email Notifications</h3>

				<div className="flex items-center justify-between gap-2">
					<div className="space-y-1">
						<Label htmlFor="app-development-updates">
							App Development Updates
						</Label>
						<p className="text-sm text-muted-foreground">
							Get notified about new features, updates and improvements to the
							platform.
						</p>
					</div>
					<Switch id="app-development-updates" />
				</div>
				<Separator />
				<div className="flex items-center justify-between gap-2">
					<div className="space-y-1">
						<Label htmlFor="promotion-updates">Promotion Updates</Label>
						<p className="text-sm text-muted-foreground">
							Get notified about new promotions, discounts and special offers.
						</p>
					</div>
					<Switch id="promotion-updates" />
				</div>
				<Separator />
				<div className="flex items-center justify-between gap-2">
					<div className="space-y-1">
						<Label htmlFor="security-updates">Security Updates</Label>
						<p className="text-sm text-muted-foreground">
							Get notified about important security updates and account
							activity.
						</p>
					</div>
					<Switch id="security-updates" />
				</div>

				<Separator />
				<div className="flex items-center justify-between gap-2">
					<div className="space-y-1">
						<Label htmlFor="newsletter">Newsletter</Label>
						<p className="text-sm text-muted-foreground">
							Receive our monthly newsletter with industry insights and best
							practices.
						</p>
					</div>
					<Switch id="newsletter" />
				</div>

				<Separator />
				<div className="flex items-center justify-between gap-2">
					<div className="space-y-1">
						<Label htmlFor="product-updates">Product Updates</Label>
						<p className="text-sm text-muted-foreground">
							Stay informed about new product features and improvements.
						</p>
					</div>
					<Switch id="product-updates" />
				</div>
			</CardContent>
		</Card>
	);
}

export function NotificationsLoading() {
	return (
		<Card className="max-w-3xl ">
			<CardHeader>
				<CardTitle>Notification Settings</CardTitle>
				<CardDescription>
					Manage your personal notification settings for this account.
				</CardDescription>
			</CardHeader>
			<Separator />
			<CardContent className="flex flex-col gap-4">
				<h3 className="font-medium mb-4">In-App Notifications</h3>

				<div className="flex items-center justify-between gap-2 ">
					<div className="space-y-1">
						<Label htmlFor="interview-scheduling">Interview Scheduling</Label>
						<p className="text-sm text-muted-foreground">
							Get notified when interviews are scheduled, rescheduled or
							cancelled.
						</p>
					</div>
					<Skeleton className="h-5 w-[45px] rounded-full" />
				</div>
				<Separator />

				<div className="flex items-center justify-between gap-2 ">
					<div className="space-y-1">
						<Label htmlFor="interview-reminders">Interview Reminders</Label>
						<p className="text-sm text-muted-foreground">
							Receive notifications 24 hours before scheduled interviews.
						</p>
					</div>
					<Skeleton className="h-5 w-[45px] rounded-full" />
				</div>

				<Separator />

				<div className="flex items-center justify-between gap-2 ">
					<div className="space-y-1">
						<Label htmlFor="calendar-updates">Calendar Updates</Label>
						<p className="text-sm text-muted-foreground">
							Get notified about changes to interview calendar invites.
						</p>
					</div>
					<Skeleton className="h-5 w-[45px] rounded-full" />
				</div>

				<Separator />

				<h3 className="font-medium my-4">Email Notifications</h3>

				<div className="flex items-center justify-between gap-2">
					<div className="space-y-1">
						<Label htmlFor="app-development-updates">
							App Development Updates
						</Label>
						<p className="text-sm text-muted-foreground">
							Get notified about new features, updates and improvements to the
							platform.
						</p>
					</div>
					<Skeleton className="h-5 w-[45px] rounded-full" />
				</div>
				<Separator />
				<div className="flex items-center justify-between gap-2">
					<div className="space-y-1">
						<Label htmlFor="promotion-updates">Promotion Updates</Label>
						<p className="text-sm text-muted-foreground">
							Get notified about new promotions, discounts and special offers.
						</p>
					</div>
					<Skeleton className="h-5 w-[45px] rounded-full" />
				</div>
				<Separator />
				<div className="flex items-center justify-between gap-2">
					<div className="space-y-1">
						<Label htmlFor="security-updates">Security Updates</Label>
						<p className="text-sm text-muted-foreground">
							Get notified about important security updates and account
							activity.
						</p>
					</div>
					<Skeleton className="h-5 w-[45px] rounded-full" />
				</div>

				<Separator />
				<div className="flex items-center justify-between gap-2">
					<div className="space-y-1">
						<Label htmlFor="newsletter">Newsletter</Label>
						<p className="text-sm text-muted-foreground">
							Receive our monthly newsletter with industry insights and best
							practices.
						</p>
					</div>
					<Skeleton className="h-5 w-[45px] rounded-full" />
				</div>

				<Separator />
				<div className="flex items-center justify-between gap-2">
					<div className="space-y-1">
						<Label htmlFor="product-updates">Product Updates</Label>
						<p className="text-sm text-muted-foreground">
							Stay informed about new product features and improvements.
						</p>
					</div>
					<Skeleton className="h-5 w-[45px] rounded-full" />
				</div>
			</CardContent>
		</Card>
	);
}
