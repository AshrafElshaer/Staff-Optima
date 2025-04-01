import {
	Body,
	Container,
	Font,
	Heading,
	Html,
	Link,
	Preview,
	Section,
	Tailwind,
	Text,
} from "@react-email/components";
import React from "react";
import { colors } from "../components/colors";
import Logo from "../components/logo";

export function WaitlistEmail({ name }: { name: string }) {
	return (
		<Html>
			<Tailwind>
				<head>
					<meta name="color-scheme" content="light dark" />
					<meta name="supported-color-schemes" content="light dark" />
					<Font
						fontFamily="Geist"
						fallbackFontFamily="Helvetica"
						webFont={{
							url: "https://cdn.jsdelivr.net/npm/@fontsource/geist-sans@5.0.1/files/geist-sans-latin-400-normal.woff2",
							format: "woff2",
						}}
						fontWeight={400}
						fontStyle="normal"
					/>

					<Font
						fontFamily="Geist"
						fallbackFontFamily="Helvetica"
						webFont={{
							url: "https://cdn.jsdelivr.net/npm/@fontsource/geist-sans@5.0.1/files/geist-sans-latin-500-normal.woff2",
							format: "woff2",
						}}
						fontWeight={500}
						fontStyle="normal"
					/>
				</head>
				<Preview>🎉 Welcome to the Staff Optima Waitlist!</Preview>
				<Body
					className={` bg-[${colors.lightTheme.background}] dark:bg-[${colors.darkTheme.background}] py-8 `}
				>
					<Container
						className={
							"w-[480px] rounded-lg border bg-transparent p-8 py-16 mx-auto shadow"
						}
					>
						<Logo />
						<Heading
							className={`text-2xl text-[${colors.lightTheme.foreground}] dark:text-[${colors.darkTheme.foreground}] w-full text-left font-semibold mb-6`}
						>
							  You&apos;re on the List! 🎉
						</Heading>

						<Text
							className={`text-base text-[${colors.lightTheme.foreground}] dark:text-[${colors.darkTheme.foreground}] mb-4`}
						>
							Hi {name}.
						</Text>
						<Text
							className={`text-base text-[${colors.lightTheme.foreground}] dark:text-[${colors.darkTheme.foreground}] mb-4`}
						>
							Thank you for signing up! You&apos;ve been added to our waitlist,
							and we can&apos;t wait to give you access.
						</Text>

						<Text
							className={`text-base text-[${colors.lightTheme.foreground}] dark:text-[${colors.darkTheme.foreground}] mb-4`}
						>
							We&apos;ll notify you as soon as it&apos;s your turn to join. Stay
							tuned for updates!
						</Text>

						<Text
							className={`text-base text-[${colors.lightTheme.foreground}] dark:text-[${colors.darkTheme.foreground}] mb-6`}
						>
							If you have any questions, feel free to reach out to us at{" "}
							<Link href="mailto:support@staffoptima.com">
								support@staffoptima.com
							</Link>
						</Text>

						<Section className="mb-6">
							<Text
								className={`text-lg font-semibold text-[${colors.lightTheme.foreground}] dark:text-[${colors.darkTheme.foreground}] mb-4`}
							>
								🔹 Next Steps:
							</Text>
							<Text
								className={`text-base text-[${colors.lightTheme.foreground}] dark:text-[${colors.darkTheme.foreground}]`}
							>
								✅ Keep an eye on your inbox 📩
							</Text>
							<Text
								className={`text-base text-[${colors.lightTheme.foreground}] dark:text-[${colors.darkTheme.foreground}]`}
							>
								✅ Follow us on Twitter @StaffOptima for updates 🚀
							</Text>
							<Text
								className={`text-base text-[${colors.lightTheme.foreground}] dark:text-[${colors.darkTheme.foreground}]`}
							>
								✅ Get excited—we have something awesome in store for you!
							</Text>
						</Section>

						<Section className="mt-[16px] text-center">
							<Text
								className={`text-base text-[${colors.lightTheme.mutedForeground}] dark:text-[${colors.darkTheme.mutedForeground}]`}
							>
								Best regards,
							</Text>
							<Text
								className={`text-[14px] text-[${colors.lightTheme.foreground}] dark:text-[${colors.darkTheme.foreground}] mt-2`}
							>
								The Staff Optima Team
							</Text>
						</Section>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
}

export default WaitlistEmail;
