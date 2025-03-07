import { Geist, Geist_Mono } from "next/font/google";

import "@optima/ui/globals.css";
import { Providers } from "@/components/providers";
import type { Metadata } from "next";

const baseUrl = "https://platform.staffoptima.co";

export const metadata: Metadata = {
	metadataBase: new URL(baseUrl),
	title: {
		default: "Staff Optima",
		template: "%s | Staff Optima",
	},
	description:
		"Staff Optima simplifies staffing and applicant tracking for modern organizations.",
	openGraph: {
		title: "Staff Optima | Smarter Staffing and Applicant Tracking",
		description:
			"Simplify staffing and streamline your applicant tracking processes with Staff Optima.",
		url: baseUrl,
		siteName: "Staff Optima",
		locale: "en_US",
		type: "website",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	icons: {
		icon: { rel: "icon", url: "/favicon.ico" },
	},
};

export const viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)" },
		{ media: "(prefers-color-scheme: dark)" },
	],
};

const fontSans = Geist({
	subsets: ["latin"],
	variable: "--font-sans",
});

const fontMono = Geist_Mono({
	subsets: ["latin"],
	variable: "--font-mono",
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}
			>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
