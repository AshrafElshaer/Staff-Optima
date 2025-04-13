import { Button } from "@optima/ui/components/button";
import { Input } from "@optima/ui/components/inputs";
import { Skeleton } from "@optima/ui/components/skeleton";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@optima/ui/components/table";
import { FilterAddIcon, UserAdd02Icon } from "hugeicons-react";
import { Search } from "lucide-react";

export default function TeamLoading() {
	return (
		<div className="flex flex-col gap-4 flex-1">
			<section className="flex items-center gap-4 ">
				<Input
					startIcon={<Search className="size-4" />}
					placeholder="Search by name"
					disabled
				/>
				<Button variant="outline" className="min-w-fit py-2 mr-auto">
					<FilterAddIcon className="size-4" strokeWidth={2} />
				</Button>
				<Button variant="secondary" className="ml-auto" disabled>
					<UserAdd02Icon className="h-4 w-4" />
					Invite Member
				</Button>
			</section>
			<div className="rounded-md border flex-1">
				<Table>
					<TableHeader>
						<TableRow className="bg-accent hover:bg-accent">
							<TableHead>Name</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Role</TableHead>
							<TableHead>Phone Number</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{Array.from({ length: 10 }).map((_, index) => (
							<TableRow key={index.toString()}>
								<TableCell>
									<div className="flex items-center gap-4">
										<Skeleton className="size-6 rounded-full" />
										<Skeleton className="h-4 w-40" />
									</div>
								</TableCell>
								<TableCell>
									<Skeleton className="h-4 w-40" />
								</TableCell>
								<TableCell>
									<Skeleton className="h-4 w-40" />
								</TableCell>
								<TableCell>
									<Skeleton className="h-4 w-40" />
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
