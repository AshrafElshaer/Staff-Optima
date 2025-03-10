import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@optima/ui/components/sheet";

export default function CalendarPage() {
	return (
		<Sheet>
			<SheetTrigger>Open</SheetTrigger>
			<SheetContent side="left">
				<SheetHeader>
					<SheetTitle>Calendar</SheetTitle>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	);
}
