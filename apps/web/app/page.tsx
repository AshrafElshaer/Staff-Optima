import { Button } from "@optima/ui/components/button";
import { Input } from "@optima/ui/components/inputs";
export default function Page() {
	return (
		<div className="flex items-center justify-center min-h-svh">
			<div className="flex flex-col items-center justify-center gap-4">
				<h1 className="text-2xl font-bold text-muted-foreground">
					Hello World
				</h1>
				<h1 className="text-2xl font-bold text-secondary-foreground">
					Hello World
				</h1>
				<Button size="sm">Button</Button>
				<Input />
			</div>
		</div>
	);
}
