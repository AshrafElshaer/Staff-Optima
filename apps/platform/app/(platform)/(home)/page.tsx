import { SignOut } from "@/components/sign-out";
import { Input } from "@optima/ui/components/input";
import { Label } from "@optima/ui/components/label";

export default async function Page() {
	return (
		<div className="flex items-center justify-center min-h-svh">
			<div className="flex flex-col items-center justify-center gap-4">
				<h1 className="text-2xl font-bold text-muted-foreground">
					Hello World
				</h1>
				<h1 className="text-2xl font-bold text-secondary-foreground">
					platform
				</h1>
				<SignOut />
				<Label>Label</Label>
				<Input />
			</div>
		</div>
	);
}
