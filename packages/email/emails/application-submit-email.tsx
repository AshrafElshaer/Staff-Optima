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

export interface ApplicationSubmitEmailProps {
	candidateName: string;
	jobTitle: string;
	companyName: string;
	companyLogo: string;
}

export function ApplicationSubmitEmail({
	candidateName,
	jobTitle,
	companyName,
	companyLogo,
}: ApplicationSubmitEmailProps) {
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
					Thank you for applying to {jobTitle} at {companyName}
				</Preview>
				<Body
					className={`bg-[${colors.lightTheme.background}] dark:bg-[${colors.darkTheme.background}] py-8`}
				>
					<Container
						className={"w-[560px]  bg-transparent p-8 py-16 mx-auto shadow"}
					>
						<Img
							src={companyLogo}
							alt={companyName}
							className="mx-auto h-14 w-14 mb-8"
						/>
						<Heading
							className={`text-base text-[${colors.lightTheme.foreground}] dark:text-[${colors.darkTheme.foreground}]`}
						>
							Hello {candidateName},
						</Heading>

						<Text
							className={`text-[14px] text-[${colors.lightTheme.foreground}] dark:text-[${colors.darkTheme.foreground}] w-full`}
						>
							Thank you for applying for the <strong>{jobTitle}</strong>{" "}
							position at <strong>{companyName}</strong>. We have received your
							application and our team is reviewing it.
						</Text>

						<Text
							className={`text-[14px] text-[${colors.lightTheme.foreground}] dark:text-[${colors.darkTheme.foreground}]`}
						>
							We will get back to you soon with updates on the next steps.
						</Text>

						<Section className="mt-[16px]">
							<Text
								className={`text-[14px] text-[${colors.lightTheme.foreground}] dark:text-[${colors.darkTheme.foreground}]`}
							>
								Best regards,
							</Text>
							<Text
								className={`text-[14px] text-[${colors.lightTheme.foreground}] dark:text-[${colors.darkTheme.foreground}]`}
							>
								{companyName} Hiring Team
							</Text>
						</Section>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
}

ApplicationSubmitEmail.PreviewProps = {
	candidateName: "John Doe",
	jobTitle: "Software Engineer",
	companyName: "Staff Optima",
	companyLogo: "https://app.staffoptima.co/logo-dark.png",
};

export default ApplicationSubmitEmail;
