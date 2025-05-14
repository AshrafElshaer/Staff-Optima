import { useQuery } from "@tanstack/react-query";
import type { Application, CandidateEducation } from "@optima/supabase/types";
import { getCandidateEducations } from "@optima/supabase/queries";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@optima/ui/components/card";
import moment from "moment";
import { useSupabase } from "@/hooks/use-supabase";

export function EducationsCard({ candidateId }: { candidateId: string }) {
	const supabase = useSupabase();
	const { data: educations } = useQuery({
		queryKey: ["candidate-educations", candidateId],
		queryFn: async () => {
			const { data, error } = await getCandidateEducations(
				supabase,
				candidateId,
			);
			if (error) throw error;
			return data;
		},
	});
	return (
		<Card className="bg-accent">
			<CardHeader>
				<CardTitle>Educations</CardTitle>
			</CardHeader>
			<CardContent className="space-y-6">
				{educations?.length === 0 ? (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
						<div className="space-y-1">
							<p className="text-secondary-foreground">School</p>
							<p className="">-</p>
						</div>
						<div className="space-y-1">
							<p className="text-secondary-foreground">Degree</p>
							<p>-</p>
						</div>
						<div className="space-y-1">
							<p className="text-secondary-foreground">Graduation</p>
							<p>-</p>
						</div>
						<div className="space-y-1">
							<p className="text-secondary-foreground">GPA</p>
							<p>-</p>
						</div>
					</div>
				) : (
					educations?.map((education, index) => (
						<div
							className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 text-sm"
							key={index.toString()}
						>
							<div className="space-y-1 w-full md:col-span-2">
								<p className="text-secondary-foreground ">Institution</p>
								<p>{education.institution}</p>
							</div>
							<div className="space-y-1 w-full md:col-span-2">
								<p className="text-secondary-foreground">Degree</p>
								<p>{education.degree}</p>
							</div>

							<div className="space-y-1 w-full">
								<p className="text-secondary-foreground">Graduation</p>
								<p>{moment(education.end_date).format("MMM YYYY")}</p>
							</div>

							<div className="space-y-1 w-full">
								<p className="text-secondary-foreground">GPA</p>
								<p>{education.grade}</p>
							</div>
						</div>
					))
				)}
			</CardContent>
		</Card>
	);
}
