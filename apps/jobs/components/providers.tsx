"use client";

import { queryClient } from "@/lib/react-query";
import { Toaster } from "@optima/ui/components/sonner";
import { QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<NuqsAdapter>
			<QueryClientProvider client={queryClient}>
				<Toaster
					theme={"dark"}
					duration={5000}
					position="top-right"
					richColors
				/>
				{children}
			</QueryClientProvider>
		</NuqsAdapter>
	);
}
