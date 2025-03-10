"use client";

import { queryClient } from "@/lib/react-query";
import { Toaster } from "@optima/ui/components/sonner";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import type * as React from "react";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<NextThemesProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
			enableColorScheme
		>
			<NuqsAdapter>
				<QueryClientProvider client={queryClient}>
					{children}
					<Toaster richColors duration={5000} position="top-center" />
				</QueryClientProvider>
			</NuqsAdapter>
		</NextThemesProvider>
	);
}
