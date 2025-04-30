"use client";
import {
	applicationInsertSchema,
	candidateInsertSchema,
} from "@optima/supabase/validations";
import { Button } from "@optima/ui/components/button";
import { AiBeautifyIcon, Loading03Icon, Pdf02Icon } from "hugeicons-react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

import { extractTranscriptData } from "@/lib/ai/parse-trascript";
import { parseDateFromString } from "@/lib/date/parse-date-from-string";

import {
	Alert,
	AlertDescription,
	AlertTitle,
} from "@optima/ui/components/alert";
import { useMutation } from "@tanstack/react-query";
import type { UseFormReturn } from "react-hook-form";

import type { formSchema } from "@/features/application/application.schema";
import { attachmentTypeEnum } from "@optima/supabase/types";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";
import type { z } from "zod";
import { zfd } from "zod-form-data";

export function UploadTranscript({
	form,
}: {
	form: UseFormReturn<z.infer<typeof formSchema>>;
}) {
	const [isSuccess, setIsSuccess] = useState(false);

	const { mutate: extractTranscript, isPending } = useMutation({
		mutationFn: extractTranscriptData,
		onSuccess: (data) => {
			setIsSuccess(true);
			form.setValue(
				"education",
				data?.length
					? data.map(
							(education: {
								school: string;
								degree: string;
								graduation_date: string;
								gpa: string;
							}) => ({
								company_id: "", // Required field
								candidate_id: "", // Required field
								institution:
									education.school !== "null" ? education.school : "",
								degree: education.degree !== "null" ? education.degree : "",
								field_of_study: "",
								grade: education.gpa !== "null" ? education.gpa : "",
								start_date: "",
								end_date: education.graduation_date
									? (parseDateFromString(
											education.graduation_date,
										)?.toISOString() ?? "")
									: "",
							}),
						)
					: [
							{
								company_id: "",
								candidate_id: "",
								institution: "",
								degree: "",
								field_of_study: "",
								grade: "",
								start_date: "",
								end_date: "",
							},
						],
			);
		},
	});

	const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
		disabled: isPending,
		noClick: true,
		noKeyboard: true,
		accept: {
			"application/pdf": [".pdf"],
		},
		maxFiles: 1,
		maxSize: 10 * 1024 * 1024, // 10MB
		async onDropAccepted(acceptedFiles) {
			if (!acceptedFiles.length) return;

			form.setValue("attachments", [
				...form.getValues("attachments"),
				{ fileType: "transcript", file: acceptedFiles[0] as File },
			]);
			extractTranscript(acceptedFiles);
		},
		onDropRejected(fileRejections, event) {
			toast.error(fileRejections[0]?.errors[0]?.message ?? "Invalid file type");
		},
	});

	return (
		<div
			{...getRootProps()}
			className="relative flex items-center gap-2 p-4 border rounded-md"
		>
			<input {...getInputProps()} />
			<div className="space-y-4 w-full">
				<div className="flex items-center gap-2 w-full">
					<AnimatePresence mode="wait">
						{isPending ? (
							<motion.div
								key="loading"
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								className="flex items-center gap-2"
							>
								<Loading03Icon className="size-5 animate-spin" />
								<span>Extracting education information...</span>
							</motion.div>
						) : (
							<motion.div
								key="ready"
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								className="flex items-center gap-2"
							>
								<AiBeautifyIcon className="size-5" />
								<span>Autofill from transcript</span>
							</motion.div>
						)}
					</AnimatePresence>
					<Button
						size="sm"
						onClick={open}
						disabled={isPending}
						type="button"
						className="ml-auto"
					>
						Upload
					</Button>
				</div>
				<p className="text-sm text-muted-foreground">
					Please upload your academic transcript to autofill your education
					details.
					<br />
					Only PDF files are supported.
				</p>
				{isSuccess && (
					<Alert variant="warning">
						<AlertTitle>
							The education information has been extracted from the transcript.
						</AlertTitle>
						<AlertDescription>
							Please verify the education details before submitting the
							application.
						</AlertDescription>
					</Alert>
				)}
			</div>

			<AnimatePresence>
				{isDragActive && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-md flex items-center justify-center border border-primary/70"
					>
						<div className="text-center">
							<Pdf02Icon className="size-8 mx-auto mb-2" />
							<p className="text-lg font-medium">Drop your transcript here</p>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
