import { Button } from "@optima/ui/components/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@optima/ui/components/card";
import { Separator } from "@optima/ui/components/separator";
import { MailSend01Icon } from "hugeicons-react";
import { SiVisa } from "react-icons/si";
export function PaymentInUse() {
	return (
		<Card className="gap-2">
			<CardHeader>
				<CardTitle className="flex items-center gap-4">
					Payment Details
				</CardTitle>
				<CardDescription>Change how would you pay for service.</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="flex items-center justify-between gap-4">
					<SiVisa size={80} />
					<div className="w-full text-sm font-semibold">
						<p>Visa ending with 6499</p>
						<span className="text-secondary-foreground">expiry 12/29</span>
					</div>
					<Button size="sm" variant="outline">
						Change
					</Button>
				</div>
			</CardContent>

			<Separator />
			<CardFooter className="flex-1 flex items-center gap-2 text-muted-foreground">
				<MailSend01Icon size={24} strokeWidth={2} />
				<span className="font-medium">ashrafelshaer98@gmail.com</span>
			</CardFooter>
		</Card>
	);
}
