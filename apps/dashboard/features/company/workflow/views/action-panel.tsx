import { useStagesStore } from "@/stores/stages-pipeline";
import { cn } from "@optima/ui/lib/utils";
import { Panel } from "@xyflow/react";
import { Layers2, Sparkles } from "lucide-react";
import { useState } from "react";
import { StageForm } from "./stage-form";

export function ActionPanel() {
	const [isOpen, setIsOpen] = useState(true);

	return (
		<Panel
			position={"top-right"}
			className={cn(
				"transition-all duration-500 ease-in-out overflow-hidden",
				isOpen ? "h-[95%]" : "h-10",
			)}
		>
			<div
				className={cn(
					"flex flex-col gap-4 p-2 bg-background rounded-md border  w-72 h-full transition-all duration-500 ease-in-out ",
				)}
			>
				<section className={cn("flex justify-between items-center")}>
					<span className="text-sm font-semibold">Action Panel</span>

					<MenuButton open={isOpen} setOpen={setIsOpen} />
				</section>
				<section
					className={cn(
						"flex flex-col gap-4 transition-all duration-500 ease-in-out h-full",
						isOpen ? "opacity-100" : "opacity-0",
					)}
				>
					<PanelTabs />
				</section>
			</div>
		</Panel>
	);
}

function MenuButton({
	open,
	setOpen,
}: { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
	return (
		<button
			type="button"
			className="group cursor-pointer"
			onClick={() => setOpen((prevState) => !prevState)}
			aria-expanded={open}
			aria-label={open ? "Close menu" : "Open menu"}
		>
			<svg
				className="pointer-events-none"
				width={16}
				height={16}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				xmlns="http://www.w3.org/2000/svg"
			>
				<title>Toggle menu</title>
				<path
					d="M4 12L20 12"
					className="origin-center -translate-y-[7px] transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
				/>
				<path
					d="M4 12H20"
					className="origin-center transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
				/>
				<path
					d="M4 12H20"
					className="origin-center translate-y-[7px] transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
				/>
			</svg>
		</button>
	);
}

import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@optima/ui/components/animate-ui/radix-tabs";

function PanelTabs() {
	return (
		<Tabs defaultValue="tab-1" className="flex-1 flex flex-col">
			<TabsList className="h-auto rounded-none border-b border-border bg-transparent p-0 w-full">
				<TabsTrigger
					value="tab-1"
					className="w-full relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary space-x-2"
				>
					<Layers2 className="size-4" />
					<span>Stage Details</span>
				</TabsTrigger>
				<TabsTrigger
					value="tab-2"
					className="w-full relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary space-x-2"
					// disabled
				>
					<Sparkles className="size-4" />
					<span>Actions</span>
				</TabsTrigger>
			</TabsList>

			<TabsContent value="tab-1" className="flex-1 flex flex-col pt-4">
				<StageForm />
			</TabsContent>
			<TabsContent value="tab-2">
				<p className="p-4 text-center text-xs text-muted-foreground">
					Content for Tab 2
				</p>
			</TabsContent>
		</Tabs>
	);
}
