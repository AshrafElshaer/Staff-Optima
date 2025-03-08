"use client";

import { Toaster } from "@optima/ui/components/sonner";
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
				{children}
				<Toaster richColors duration={5000} position="top-center" />
			</NuqsAdapter>
		</NextThemesProvider>
	);
}
