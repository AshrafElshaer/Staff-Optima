// import type { Organization } from "@optima/supabase/types";
import {
	Body,
	Container,
	Font,
	Heading,
	Html,
	Img,
	Link,
	Preview,
	Section,
	Tailwind,
	Text,
} from "@react-email/components";
import React from "react";
import { colors } from "../components/colors";
import Logo from "../components/logo";

const baseUrl = "https://app.staffoptima.co";

export function InvitationEmail({
	name,
	company,
}: {
	name: string;

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	company: any;
}) {
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
				<Preview>Invitation to Join {company.name}!</Preview>
				<Body
					className={` bg-[${colors.lightTheme.background}] dark:bg-[${colors.darkTheme.background}] py-8 `}
				>
					<Container
						className={
							"w-[560px] rounded-lg  bg-transparent p-8 py-16 mx-auto shadow "
						}
					>
						{company.logo_url && (
							<Img
								src={company.logo_url}
								alt={company.name}
								className="mx-auto h-14 w-14 mb-8"
							/>
						)}
						<Heading
							className={`text-base text-[${colors.lightTheme.foreground}] dark:text-[${colors.darkTheme.foreground}]`}
						>
							Hi {name},
						</Heading>

						<Text
							className={`text-[14px] text-[${colors.lightTheme.foreground}] dark:text-[${colors.darkTheme.foreground}]`}
						>
							We are thrilled to invite you to join us at {company.name}! As
							part of our growing team, you’ll have the opportunity to make an
							impact and work in a dynamic, collaborative environment.
						</Text>

						<Text
							className={`text-[14px] text-[${colors.lightTheme.foreground}] dark:text-[${colors.darkTheme.foreground}]`}
						>
							To get started:
						</Text>
						<Text
							className={`text-[14px] text-[${colors.lightTheme.foreground}] dark:text-[${colors.darkTheme.foreground}]`}
						>
							1. Click the link below to set up your account:
							<br />
							<Link href={baseUrl}>Set Up Your Account</Link>
						</Text>
						<Text
							className={`text-[14px] text-[${colors.lightTheme.foreground}] dark:text-[${colors.darkTheme.foreground}]`}
						>
							2. Log in and explore our platform to learn more about how we
							work.
						</Text>
						<Text
							className={`text-[14px] text-[${colors.lightTheme.foreground}] dark:text-[${colors.darkTheme.foreground}]`}
						>
							If you have any questions, feel free to contact us at{" "}
							<Link href="mailto:support@staffoptima.co">
								support@staffoptima.co
							</Link>{" "}
							.
						</Text>

						<Text
							className={`text-[14px] text-[${colors.lightTheme.foreground}] dark:text-[${colors.darkTheme.foreground}]`}
						>
							We are excited to have you on board and look forward to seeing you
							grow with {company.name}.
						</Text>
						<Section className="mt-[16px] text-center">
							<Text
								className={`text-base text-[${colors.lightTheme.mutedForeground}] dark:text-[${colors.darkTheme.mutedForeground}]`}
							>
								Best regards,
							</Text>
							<Text
								className={`text-[14px] text-[${colors.lightTheme.foreground}] dark:text-[${colors.darkTheme.foreground}] mt-2`}
							>
								The {company.name} Team
							</Text>
						</Section>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
}

InvitationEmail.PreviewProps = {
	name: "Ashraf Elshaer",
	company: {
		name: "Staff Optima",
		logo_url: "",
	},
};

export default InvitationEmail;
