
interface MemberPageProps {
	params: Promise<{
		memberId: string;
	}>;
}

export default async function MemberPage({ params }: MemberPageProps) {
	const { memberId } = await params;
	return (
		<div className="flex flex-col gap-4 flex-1">
			<h1 className="text-2xl font-bold">
				Ashraf Elshaer {memberId}
			</h1>
		</div>
	);
}