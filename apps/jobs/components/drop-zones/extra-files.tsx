"use client";

import type { formSchema } from "@/features/application/application.schema";
import { formatBytes } from "@/lib/format-bytes";

import { attachmentTypeEnum } from "@optima/supabase/types";
import {
	applicationInsertSchema,
	candidateInsertSchema,
} from "@optima/supabase/validations";
import { Button } from "@optima/ui/components/button";
import { Cancel01Icon, Pdf02Icon, PlusMinus01Icon } from "hugeicons-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo } from "react";
import { useDropzone } from "react-dropzone";
import type { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { zfd } from "zod-form-data";

interface ExtraFilesProps {
	form: UseFormReturn<z.infer<typeof formSchema>>;
}
export function ExtraFiles({ form }: ExtraFilesProps) {
	const attachments = useMemo(
		() => form.watch("attachments"),
		[form.watch("attachments")],
	);
	const totalSize = useMemo(
		() => attachments.reduce((acc, curr) => acc + curr.file.size, 0),
		[attachments],
	);
	const remainingSize = useMemo(() => 9 * 1024 * 1024 - totalSize, [totalSize]);
	const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
		noClick: true,
		noKeyboard: true,

		maxSize: remainingSize, // max 9MB
		onDropAccepted(acceptedFiles, event) {
			if (!acceptedFiles.length) return;
			form.setValue("attachments", [
				...form.getValues("attachments"),
				...acceptedFiles.map((file) => ({ fileType: "other" as const, file })),
			]);
		},
		onDropRejected(fileRejections, event) {
			toast.error(fileRejections[0]?.errors[0]?.message ?? "Invalid file type");
		},
	});

	function handleRemoveFile(file: File) {
		form.setValue(
			"attachments",
			form.getValues("attachments").filter((f) => f.file !== file),
		);
	}

	return (
		<div
			{...getRootProps()}
			className="relative  min-h-40 border rounded-md p-4 "
		>
			<input {...getInputProps()} />
			<div className="space-y-4 w-full">
				<div className="flex items-center justify-between gap-2 w-full">
					<div className="space-y-2">
						<p className="text-sm text-secondary-foreground">
							Drag and drop your files here{" "}
						</p>
						<p className="text-xs text-secondary-foreground">
							Remaining Space: {formatBytes(remainingSize)}
						</p>
					</div>
					<Button variant="outline" size="icon" type="button" onClick={open}>
						<PlusMinus01Icon className="size-4" />
					</Button>
				</div>

				{attachments.length > 0 && (
					<div className="space-y-2">
						{attachments.map((file) => (
							<div
								key={file.file.name}
								className="text-sm flex items-center gap-2 w-full border rounded-md p-2"
							>
								<p>{file.file.name}</p>
								<p className="text-xs text-muted-foreground">
									{formatBytes(file.file.size)}
								</p>

								<Button
									variant="ghost"
									className="ml-auto"
									type="button"
									size="iconSm"
									onClick={() => handleRemoveFile(file.file)}
								>
									<Cancel01Icon className="size-4" />
								</Button>
							</div>
						))}
					</div>
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
							<p className="text-lg font-medium">Drop your files here</p>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
