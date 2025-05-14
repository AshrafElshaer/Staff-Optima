import type { Application } from "@optima/supabase/types";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@optima/ui/components/card";

export function ScreeningQuestionsCard({
	application,
}: { application: Application }) {
	return (
		<Card className="bg-accent">
			<CardHeader>
				<CardTitle>Screening Questions</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				{(
					application.screening_question_answers as {
						question: string;
						answer: string | string[];
					}[]
				)?.map((question) => (
					<div key={question.question} className="space-y-1">
						<p className="text-sm font-medium text-muted-foreground">
							{question.question}
						</p>
						<p className="text-sm">
							{Array.isArray(question.answer)
								? question.answer.join(", ")
								: question.answer}
						</p>
					</div>
				))}
			</CardContent>
		</Card>
	);
}
