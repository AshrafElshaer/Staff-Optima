import {
	Body,
	Container,
	Font,
	Heading,
	Html,
	Preview,
	Section,
	Tailwind,
	Text,
} from "@react-email/components";
import React from "react";
import { colors } from "../components/colors";
import Logo from "../components/logo";

export function OtpEmail({ otpCode }: { otpCode: string }) {
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
				<Preview>Secure Your Access to Staff Optima with OTP Code</Preview>
				<Body
					className={` bg-[${colors.lightTheme.background}] dark:bg-[${colors.darkTheme.background}] py-8 `}
				>
					<Container
						className={
							"w-[448px] rounded-lg border   bg-transparent p-8 py-16 mx-auto   shadow "
						}
					>
						<Logo />
						<Text
							className={`text-base text-[${colors.lightTheme.foreground}] dark:text-[${colors.darkTheme.foreground}]  `}
						>
							Hello there ,
						</Text>

						<Heading
							className={`text-[16px] text-[${colors.lightTheme.foreground}] dark:text-[${colors.darkTheme.foreground}] w-full text-center font-semibold `}
						>
							Verification code
						</Heading>

						<Text
							className={`text-4xl font-bold tracking-widest text-[${colors.lightTheme.foreground}] dark:text-[${colors.darkTheme.foreground}] w-full text-center`}
						>
							{otpCode}
						</Text>

						<Text
							className={`text-[14px] text-[${colors.lightTheme.foreground}] dark:text-[${colors.darkTheme.foreground}] `}
						>
							This code will expire in 10 minutes, so make sure to use it
							promptly.
						</Text>
						<Text
							className={`text-[14px] text-[${colors.lightTheme.foreground}] dark:text-[${colors.darkTheme.foreground}] `}
						>
							If you didn&apos;t request this code, no worries – your account is
							safe and sound. Someone might have mistyped their email address.
						</Text>

						<Section className="mt-[16px] text-center">
							<Text
								className={`text-base text-[${colors.lightTheme.mutedForeground}] dark:text-[${colors.darkTheme.mutedForeground}] `}
							>
								Enchanted regards,
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

OtpEmail.PreviewProps = {
	otpCode: "123456",
};

export default OtpEmail;
