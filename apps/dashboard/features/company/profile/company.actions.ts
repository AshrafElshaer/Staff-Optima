"use server";
import { authActionClient } from "@/lib/safe-action";
// import { createServerClient } from "@/lib/supabase/server";

import { resolveTxt } from "node:dns/promises";
import { DnsVerificationEmail } from "@optima/email";
import {
	updateDomainVerification,
	updateCompany,
} from "@optima/supabase/mutations";
import {
	getDomainVerificationByToken,
	getCompanyById,
} from "@optima/supabase/queries";
import {
	domainVerificationSchema,
	domainVerificationUpdateSchema,
	companyUpdateSchema,
} from "@optima/supabase/validations";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";

export const updateOrganizationAction = authActionClient
	.metadata({
		name: "updateOrganization",
		track: {
			event: "update-organization",
			channel: "organization",
		},
	})
	.schema(companyUpdateSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { supabase } = ctx;
		const { data, error } = await updateCompany(supabase, parsedInput);

		if (error) {
			throw new Error(error.message);
		}

		revalidatePath("/company");
		revalidateTag("company");

		return data;
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
	.action(async ({ parsedInput, ctx }) => {
		const { supabase } = ctx;
		let records: string[][] | null = null;
		try {
			records = await resolveTxt(
				`staffoptima_verification.${parsedInput.domain}`,
			);
		} catch (error) {
			await updateDomainVerification(supabase, {
				id: parsedInput.id,
				verification_status: "failed",
			});
			throw new Error(
				"Unable to verify domain. Please check your DNS settings and try again.",
			);
		}

		const isValid = records
			.flat()
			.includes(parsedInput.verification_token ?? "");

		if (!isValid) {
			await updateDomainVerification(supabase, {
				id: parsedInput.id,
				verification_status: "failed",
			});
			await updateCompany(supabase, {
				id: parsedInput.company_id ?? "",
				is_domain_verified: false,
			});

			throw new Error("Invalid verification token");
		}

		const updatedDomainVerification = await updateDomainVerification(supabase, {
			id: parsedInput.id,
			verification_status: "verified",
			verification_date: new Date().toISOString(),
		});

		const updatedCompany = await updateCompany(supabase, {
			id: parsedInput.company_id ?? "",
			is_domain_verified: true,
		});

		revalidatePath("/company");
		revalidateTag("company");
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
			company_id: z.string(),
			sendTo: z.string().email(),
		}),
	)
	.action(async ({ parsedInput, ctx }) => {
		const { user, resend, supabase } = ctx;

		const { data: company, error: companyError } = await getCompanyById(
			supabase,
			parsedInput.company_id,
		);

		if (companyError) {
			throw new Error("Company not found");
		}

		const { data: domainVerification, error: domainVerificationError } =
			await getDomainVerificationByToken(supabase, parsedInput.company_id);

		if (domainVerificationError) {
			throw new Error("Domain verification not found");
		}

		const { data, error } = await resend.emails.send({
			from: "StaffOptima <verification@staffoptima.co>",
			to: parsedInput.sendTo,
			subject: "Domain Verification",
			react: DnsVerificationEmail({
				records: [domainVerification],
				organizationDomain: company?.domain ?? "",
				sentBy: user.email || "",
			}),
		});

		if (error) {
			throw new Error(error.message);
		}

		return data;
	});
