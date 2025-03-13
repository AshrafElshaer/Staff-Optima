import { cn } from "@optima/ui/lib/utils";
import { Image, Plus } from "lucide-react";
import { type DropzoneOptions, useDropzone } from "react-dropzone";

export type { DropzoneOptions };

type DropZoneProps = {
	children?: React.ReactNode;
	options?: DropzoneOptions;
} & React.HTMLAttributes<HTMLDivElement>;

export function DropZone({
	children,
	options,
	className,
	...props
}: DropZoneProps) {
	const { getRootProps, getInputProps } = useDropzone(options);

	return (
		<section
			className={cn(
				" border border-dashed rounded-md grid relative group cursor-pointer",
				className,
			)}
			{...props}
		>
			<div
				{...getRootProps({ className: "dropzone" })}
				className="w-full h-full"
			>
				<input {...getInputProps()} />
				{children ?? (
					<p>Drag 'n' drop some files here, or click to select files</p>
				)}
			</div>
		</section>
	);
}
