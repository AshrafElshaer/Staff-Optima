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
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Calendar</SheetTitle>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	);
}
