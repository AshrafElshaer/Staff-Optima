import { authSearchParamsCache } from "@/features/auth/auth-search-params";
import { AuthComponent } from "@/features/auth/views";
import type { Metadata } from "next";

type Props = {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const metadata: Metadata = {
	title: "Auth",
};

export default async function AuthPage({ searchParams }: Props) {
	authSearchParamsCache.parse(await searchParams);

	return (
		<main className="min-h-[100svh] w-full flex flex-col items-center justify-center ">
			<AuthComponent />
		</main>
	);
}
