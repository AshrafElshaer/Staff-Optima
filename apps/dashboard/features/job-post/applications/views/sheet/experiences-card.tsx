import { useSupabase } from "@/hooks/use-supabase";
import { getCandidateExperiences } from "@optima/supabase/queries";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@optima/ui/components/card";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";

export function ExperiencesCard({ candidateId }: { candidateId: string }) {
	const supabase = useSupabase();
	const { data: experiences } = useQuery({
		queryKey: ["candidate-experiences", candidateId],
		queryFn: async () => {
			const { data, error } = await getCandidateExperiences(
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
				<CardTitle>Experiences</CardTitle>
			</CardHeader>
			<CardContent className="space-y-6">
				{experiences?.length === 0 ? (
					<div className="grid grid-cols-1 sm:grid-cols-3  gap-4 text-sm">
						<div className="space-y-1">
							<p className="text-muted-foreground ">Company</p>
							<p className="">-</p>
						</div>
						<div className="space-y-1">
							<p className="text-foreground">Position</p>
							<p>-</p>
						</div>
						<div className="space-y-1">
							<p className="text-muted-foreground">Experience</p>
							<p>-</p>
						</div>
					</div>
				) : (
					experiences?.map((experience, index) => (
						<div
							className="grid grid-cols-1 sm:grid-cols-3  gap-4 text-sm"
							key={index.toString()}
						>
							<div className="space-y-1">
								<p className="text-muted-foreground ">Company</p>
								<p className="">{experience.company}</p>
							</div>
							<div className="space-y-1">
								<p className="text-muted-foreground">Position</p>
								<p>{experience.job_title}</p>
							</div>
							<div className="space-y-1">
								<p className="text-muted-foreground">Experience</p>
								<p>
									{experience.end_date
										? moment
												.duration(
													moment(experience.end_date).diff(
														moment(experience.start_date),
													),
												)
												.humanize()
										: moment
												.duration(moment().diff(moment(experience.start_date)))
												.humanize()}
								</p>
							</div>
						</div>
					))
				)}
			</CardContent>
		</Card>
	);
}
