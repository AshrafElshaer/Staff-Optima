import {
	Body,
	Column,
	Container,
	Font,
	Head,
	Heading,
	Html,
	Link,
	Preview,
	Row,
	Section,
	Tailwind,
	Text,
} from "@react-email/components";

import type { DomainVerification } from "@optima/supabase/types";
import { colors } from "../components/colors";
import Logo from "../components/logo";

export function DnsVerificationEmail({
	records,
	organizationDomain,
	sentBy,
}: {
	records: DomainVerification[];
	organizationDomain: string;
	sentBy: string;
}) {
	return (
		<Html>
			<Tailwind>
				<Head>
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
				</Head>
				<Preview>DNS Verification Records</Preview>
				<Body
					className={`bg-[${colors.lightTheme.background}] dark:bg-[${colors.darkTheme.background}] py-8`}
				>
					<Container
						className={
							"w-[560px] rounded-lg bg-transparent p-8 py-16 mx-auto shadow"
						}
					>
						<Logo />
						<Heading
							className={`text-base text-[${colors.lightTheme.foreground}] dark:text-[${colors.darkTheme.foreground}]`}
						>
							Hi there,
						</Heading>

						<Text
							className={`text-[14px] text-[${colors.lightTheme.foreground}] dark:text-[${colors.darkTheme.foreground}]`}
						>
							This email contains DNS verification instructions for{" "}
							<Link href={`https://${organizationDomain}`}>
								{organizationDomain}
							</Link>
							, which was submitted for verification on Staff Optima by {sentBy}
							.
							<br />
							If you are the owner of this domain, please add these DNS records
							to verify your ownership:
						</Text>

						{records.map((record, index) => (
							<Section key={record.id} className="mb-4 border-b pb-4">
								<Row>
									<Column align="left" className="w-1/4">
										<Text
											className={`text-left text-[14px] text-[${colors.lightTheme.foreground}] dark:text-[${colors.darkTheme.foreground}]`}
										>
											Type
										</Text>
									</Column>
									<Column align="right" className="w-3/4">
										<Text
											className={`text-left text-[14px] text-[${colors.lightTheme.foreground}] dark:text-[${colors.darkTheme.foreground}]`}
										>
											TXT
										</Text>
									</Column>
								</Row>
								<Row>
									<Column align="left" className="w-1/4">
										<Text
											className={`text-left text-[14px] text-[${colors.lightTheme.foreground}] dark:text-[${colors.darkTheme.foreground}]`}
										>
											Name
										</Text>
									</Column>
									<Column align="right" className="w-3/4">
										<Text
											className={`text-left text-[14px] text-[${colors.lightTheme.foreground}] dark:text-[${colors.darkTheme.foreground}]`}
										>
											staffoptima_verification
										</Text>
									</Column>
								</Row>

								<Row>
									<Column align="left" className="w-1/4">
										<Text
											className={`text-[14px] text-left text-[${colors.lightTheme.foreground}] dark:text-[${colors.darkTheme.foreground}]`}
										>
											Value
										</Text>
									</Column>
									<Column align="right" className="w-3/4">
										<Text
											className={`text-[14px] text-left text-[${colors.lightTheme.foreground}] dark:text-[${colors.darkTheme.foreground}]`}
										>
											{record.verification_token}
										</Text>
									</Column>
								</Row>
								<Row>
									<Column align="left" className="w-1/4">
										<Text
											className={`text-[14px] text-left text-[${colors.lightTheme.foreground}] dark:text-[${colors.darkTheme.foreground}]`}
										>
											TTL
										</Text>
									</Column>
									<Column align="right" className="w-3/4">
										<Text
											className={`text-[14px] text-left text-[${colors.lightTheme.foreground}] dark:text-[${colors.darkTheme.foreground}]`}
										>
											60
										</Text>
									</Column>
								</Row>
								<Row>
									<Column align="left" className="w-1/4">
										<Text
											className={`text-[14px] text-left text-[${colors.lightTheme.foreground}] dark:text-[${colors.darkTheme.foreground}]`}
										>
											Priority
										</Text>
									</Column>
									<Column align="right" className="w-3/4">
										<Text
											className={`text-[14px] text-left text-[${colors.lightTheme.foreground}] dark:text-[${colors.darkTheme.foreground}]`}
										>
											{" "}
										</Text>
									</Column>
								</Row>
							</Section>
						))}

						<Text
							className={`text-[14px] text-[${colors.lightTheme.foreground}] dark:text-[${colors.darkTheme.foreground}]`}
						>
							Kindly add these records to your DNS settings and let us know once
							done.
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
								The Staff Optima Team
							</Text>
						</Section>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
}

DnsVerificationEmail.PreviewProps = {
	records: [
		{
			id: "1",
			type: "TXT",
			name: "staffoptima_verification",
			verification_token: "staffoptima-site-verification=123456",
			verification_status: "pending",
			verification_date: null,
			organizationId: "1",
		},
	],
	organizationDomain: "staffoptima.co",
	sentBy: "ashrafelshaer98@icloud.com",
};

export default DnsVerificationEmail;
