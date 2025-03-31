import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Updates",
	description: "Change log for Staff Optima application",
};

export default function Updates() {
	return (
		<div className="min-h-screen min-w-screen flex flex-col p-4 mx-auto max-w-3xl pt-20">
			<h1 className="text-2xl font-bold">Updates</h1>
		</div>
	);
}
