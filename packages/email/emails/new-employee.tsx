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

const baseUrl = "https://dashboard.staffoptima.co";

export function NewEmployeeEmail({
	name,
	organizationName = "Staff Optima",
}: { name: string; organizationName?: string }) {
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
				<Preview>
					Welcome to {organizationName}! Your New Account is Ready
				</Preview>
				<Body
					className={` bg-[${colors.lightTheme.background}] dark:bg-[${colors.darkTheme.background}] py-8 `}
				>
					<Container
						className={`w-[560px] rounded-lg border  border-[${colors.lightTheme.border}] dark:border-[${colors.darkTheme.border}] bg-transparent p-8 py-16 mx-auto   shadow `}
						style={{ borderStyle: "solid", borderWidth: "1px" }}
					>
						<Logo />
						<Heading
							className={`text-base text-[${colors.lightTheme.foreground}] dark:text-[${colors.darkTheme.foreground}]  `}
						>
							Dear {name},
						</Heading>

						<Text
							className={`text-[14px]  text-[${colors.lightTheme.foreground}] dark:text-[${colors.darkTheme.foreground}] w-full `}
						>
							Welcome to {organizationName}! We are thrilled to have you join
							our team. As part of our onboarding process, we have created an
							account for you to access our systems and start your work
							smoothly.
						</Text>

						<Text
							className={`text-[14px] text-[${colors.lightTheme.foreground}] dark:text-[${colors.darkTheme.foreground}] `}
						>
							Next Steps:
						</Text>
						<Text
							className={`text-[14px] text-[${colors.lightTheme.foreground}] dark:text-[${colors.darkTheme.foreground}] `}
						>
							Log In: Visit <Link href={baseUrl}>Staff Optima</Link> and use
							your email to log in.
						</Text>
						<Text
							className={`text-[14px] text-[${colors.lightTheme.foreground}] dark:text-[${colors.darkTheme.foreground}] `}
						>
							If you have any questions or need assistance, please do not
							hesitate to reach out to our IT support team at{" "}
							<Link href="mailto:support@staffoptima.co">
								support@staffoptima.co
							</Link>{" "}
							.
						</Text>

						<Text
							className={`text-[14px] text-[${colors.lightTheme.foreground}] dark:text-[${colors.darkTheme.foreground}] `}
						>
							Once again, welcome to the team! We are excited to see the
							contributions you'll bring to {organizationName}.
						</Text>
						<Section className="mt-[16px] text-center">
							<Text
								className={`text-base text-[${colors.lightTheme.mutedForeground}] dark:text-[${colors.darkTheme.mutedForeground}] `}
							>
								Best regards,
							</Text>
							<Text
								className={`text-[14px] text-[${colors.lightTheme.foreground}] dark:text-[${colors.darkTheme.foreground}]  mt-2`}
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

NewEmployeeEmail.PreviewProps = {
	name: "Ashraf Elshaer",
	organizationName: "Staff Optima",
};

export default NewEmployeeEmail;
