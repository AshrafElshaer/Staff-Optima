import { SignOut } from "@/components/sign-out";
import { Badge } from "@optima/ui/components/badge";
import { Button } from "@optima/ui/components/button";
import { Input } from "@optima/ui/components/inputs/input";
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
				<Badge variant="success">success</Badge>
				<Badge variant="warning">warning</Badge>
				<Badge variant="destructive">destructive</Badge>
				<Button variant="secondary">secondary</Button>
				<Button variant="outline">outline</Button>
				<Button variant="ghost">ghost</Button>
				<Button variant="link">link</Button>
				<Button variant="default">default</Button>
				<Button variant="warning">warning</Button>
				<Button variant="success">success</Button>
				<SignOut />
				<Label>Label</Label>
				<Input />
				<Skeleton className="w-full h-10" />
			</div>
		</div>
	);
}
