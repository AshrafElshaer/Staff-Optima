import { zodResolver } from "@hookform/resolvers/zod";
import {
	type jobPostSchema,
	screeningQuestionSchema,
} from "@optima/supabase/validations";
import { Button } from "@optima/ui/components/button";
import { Checkbox } from "@optima/ui/components/checkbox";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@optima/ui/components/form";
import { AutoResizeTextArea } from "@optima/ui/components/inputs";
import { Input } from "@optima/ui/components/inputs/input";
import { Label } from "@optima/ui/components/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@optima/ui/components/select";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@optima/ui/components/sheet";
import { Plus, PlusIcon, X } from "lucide-react";
import { useEffect, useState } from "react";
import { type UseFormReturn, useForm } from "react-hook-form";
import type { z } from "zod";

export function ScreeningQuestionSheet({
	jobPostForm,
	question,
	index,
	children: trigger,
}: {
	jobPostForm: UseFormReturn<z.infer<typeof jobPostSchema>>;
	question?: z.infer<typeof screeningQuestionSchema>;
	index?: number;
	children?: React.ReactNode;
}) {
	const [isOpen, setIsOpen] = useState(false);
	const form = useForm<z.infer<typeof screeningQuestionSchema>>({
		resolver: zodResolver(screeningQuestionSchema),
		defaultValues: question ?? {
			question: "",
			is_required: false,
			options: undefined,
			type: "text",
		},
	});

	useEffect(() => {
		if (form.getValues("type") === "text") {
			form.setValue("options", undefined);
		} else {
			form.setValue("options", [""]);
		}
	}, [form.watch("type")]);

	function onSubmit(data: z.infer<typeof screeningQuestionSchema>) {
		const isNewQuestion = !question;
		if (isNewQuestion) {
			const currentQuestions =
				jobPostForm.getValues("screening_questions") ?? [];
			jobPostForm.setValue(
				"screening_questions",
				[...currentQuestions, data].flat(),
			);
			form.reset({
				question: "",
				is_required: false,
				options: undefined,
				type: "text",
			});
		} else {
			const questions = jobPostForm.getValues("screening_questions") ?? [];
			// Ensure index is defined before using it
			if (typeof index === "number") {
				questions[index] = data;
				jobPostForm.setValue("screening_questions", questions);
			}
			form.reset(data);
		}

		setIsOpen(false);
	}

	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetTrigger asChild>
				{trigger ? (
					trigger
				) : (
					<Button className="w-full mt-auto" variant="secondary" type="button">
						<PlusIcon className="size-4" />
						Add Question
					</Button>
				)}
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>New Screening Question</SheetTitle>
					<SheetDescription>
						Add a question to the screening process.
					</SheetDescription>
				</SheetHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="px-4 space-y-4 overflow-y-auto flex-1"
					>
						<FormField
							control={form.control}
							name="type"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Question Type</FormLabel>
									<FormControl>
										<Select onValueChange={field.onChange} value={field.value}>
											<SelectTrigger className="w-full bg-accent">
												<SelectValue placeholder="Select a question type" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="text">Text</SelectItem>
												<SelectItem value="single-choice">
													Single Choice
												</SelectItem>
												<SelectItem value="multiple-choice">
													Multiple Choice
												</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="question"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Question</FormLabel>
									<FormControl>
										<AutoResizeTextArea
											{...field}
											placeholder="How many years of experience do you have?"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{form.watch("type") !== "text" ? (
							<FormField
								control={form.control}
								name="options"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Options</FormLabel>
										<FormControl>
											<div className="space-y-2 w-full">
												{field.value?.map((option, index) => (
													<div
														key={index.toString()}
														className="flex gap-2 w-full"
													>
														<Input
															value={option}
															onChange={(e) => {
																const newOptions = [...(field.value || [])];
																newOptions[index] = e.target.value;
																field.onChange(newOptions);
															}}
															placeholder={`Option ${index + 1}`}
															className="flex-1"
															wrapperClassName="w-full"
														/>
														{index === 0 ? null : (
															<Button
																type="button"
																variant="outline"
																size="icon"
																onClick={() => {
																	const newOptions = field.value?.filter(
																		(_, i) => i !== index,
																	);
																	field.onChange(newOptions);
																}}
															>
																<X className="h-4 w-4" />
															</Button>
														)}
													</div>
												))}
												{form.formState.errors.options && (
													<span className="text-destructive text-sm">
														One or more options are missing
													</span>
												)}
											</div>
										</FormControl>
										<Button
											type="button"
											variant="outline"
											className="mt-2"
											onClick={() =>
												field.onChange([...(field.value || []), ""])
											}
										>
											Add Option
										</Button>
									</FormItem>
								)}
							/>
						) : null}

						<FormField
							control={form.control}
							name="is_required"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Label className="flex items-center gap-2">
											<Checkbox
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
											This question is required
										</Label>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</form>
				</Form>
				<SheetFooter className="flex-row *:flex-1">
					<SheetClose asChild>
						<Button variant="secondary" type="button">
							Cancel
						</Button>
					</SheetClose>
					<Button
						type="button"
						className="w-full"
						onClick={form.handleSubmit(onSubmit)}
					>
						{question ? "Save Changes" : "Add Question"}
					</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
