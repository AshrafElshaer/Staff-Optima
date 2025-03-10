import { SignOut } from "@/components/sign-out";
import { Button } from "@optima/ui/components/button";
import { Input } from "@optima/ui/components/input";
import { Label } from "@optima/ui/components/label";
import { Skeleton } from "@optima/ui/components/skeleton";

export default async function Page() {
	return (
		<div className="flex items-center justify-center flex-1">
			<div className="flex flex-col items-center justify-center gap-4">
				<h1 className="text-2xl font-bold text-muted-foreground">
					Hello World
				</h1>
				<h1 className="text-2xl font-bold text-secondary-foreground">
					platform
				</h1>
				<Button variant="secondary">secondary</Button>
				<Button variant="outline">outline</Button>
				<Button variant="ghost">ghost</Button>
				<Button variant="link">link</Button>
				<Button variant="default">default</Button>

				<SignOut />
				<Label>Label</Label>
				<Input />
				<Skeleton className="w-full h-10" />
			</div>
		</div>
	);
}
