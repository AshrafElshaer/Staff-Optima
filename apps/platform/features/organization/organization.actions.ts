"use server";
import { authActionClient } from "@/lib/safe-action";
// import { createServerClient } from "@/lib/supabase/server";

import { resolveTxt } from "node:dns/promises";
import {
	updateDomainVerification,
	updateOrganization,
} from "@optima/database/mutations";
import {
	getDomainVerificationByOrganizationId,
	getOrganizationById,
} from "@optima/database/queries";
import {
	domainVerificationSchema,
	domainVerificationUpdateSchema,
	organizationUpdateSchema,
} from "@optima/database/validations";
import { DnsVerificationEmail } from "@optima/email";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const updateOrganizationAction = authActionClient
	.metadata({
		name: "updateOrganization",
		track: {
			event: "update-organization",
			channel: "organization",
		},
	})
	.schema(organizationUpdateSchema)
	.action(async ({ ctx, parsedInput }) => {
		const { user } = ctx;

		const payload = {
			...parsedInput,
		};

		const updated = await updateOrganization(payload);

		revalidatePath("/organization");

		return updated;
	});

export const verifyDomainAction = authActionClient
	.metadata({
		name: "verifyDomain",
		track: {
			event: "verify-domain",
			channel: "organization",
		},
	})
	.schema(domainVerificationUpdateSchema)
	.action(async ({ parsedInput }) => {
		let records: string[][] | null = null;
		try {
			records = await resolveTxt(
				`staffoptima_verification.${parsedInput.domain}`,
			);
		} catch (error) {
			await updateDomainVerification({
				id: parsedInput.id,
				verificationStatus: "failed",
			});
			throw new Error(
				"Unable to verify domain. Please check your DNS settings and try again.",
			);
		}

		const isValid = records
			.flat()
			.includes(parsedInput.verificationToken ?? "");

		if (!isValid) {
			await updateDomainVerification({
				id: parsedInput.id,
				verificationStatus: "failed",
			});
			await updateOrganization({
				id: parsedInput.organizationId ?? "",
				isDomainVerified: false,
			});

			throw new Error("Invalid verification token");
		}

		const updatedDomainVerification = await updateDomainVerification({
			id: parsedInput.id,
			verificationStatus: "verified",
			verificationDate: new Date(),
		});

		const updatedOrganization = await updateOrganization({
			id: parsedInput.organizationId ?? "",
			isDomainVerified: true,
		});

		revalidatePath("/organization");

		return updatedDomainVerification;
	});

export const sendDomainVerificationEmailAction = authActionClient
	.metadata({
		name: "sendDomainVerificationEmail",
		track: {
			event: "send-domain-verification-email",
			channel: "organization",
		},
	})
	.schema(
		z.object({
			organizationId: z.string(),
			sendTo: z.string().email(),
		}),
	)
	.action(async ({ parsedInput, ctx }) => {
		const { user, resend } = ctx;

		const organization = await getOrganizationById(parsedInput.organizationId);

		const domainVerification = await getDomainVerificationByOrganizationId(
			parsedInput.organizationId,
		);

		if (!domainVerification) {
			throw new Error("Domain verification not found");
		}

		const { data, error } = await resend.emails.send({
			from: "StaffOptima <verification@staffoptima.co>",
			to: parsedInput.sendTo,
			subject: "Domain Verification",
			react: DnsVerificationEmail({
				records: [domainVerification],
				organizationDomain: organization?.domain ?? "",
				sentBy: user.email || "",
			}),
		});

		if (error) {
			throw new Error(error.message);
		}

		return data;
	});
