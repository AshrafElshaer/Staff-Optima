interface EmailTemplatePageProps {
	params: Promise<{
		templateId: string;
	}>;
}

export default async function EmailTemplatePage({
	params,
}: EmailTemplatePageProps) {
	const { templateId } = await params;
	return (
		<div className="flex flex-col gap-4 flex-1">
			<h1 className="text-2xl font-bold">Email Template {templateId}</h1>
		</div>
	);
}
