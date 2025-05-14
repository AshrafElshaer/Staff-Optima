import { Icons } from "@optima/ui/components/icons";
import type { ReactNode } from "react";
const FILES_EXTENSIONS = {
	pdf: Icons.Pdf,
	//   doc: Icons.Doc,
	//   docx: Icons.Docx,
	//   xls: Icons.Xls,
	//   xlsx: Icons.Xlsx,
};

export function getFileIcon(extension: string): ReactNode {
	const Icon = FILES_EXTENSIONS[extension as keyof typeof FILES_EXTENSIONS];
	return Icon ? <Icon className="size-4" /> : null;
}
