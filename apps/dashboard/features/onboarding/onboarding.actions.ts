"use server";
import crypto from "node:crypto";
import { redis } from "@/lib/redis";
import { authActionClient } from "@/lib/safe-action";
import { createServerClient } from "@/lib/supabase/server";
import { WaitlistEmail } from "@optima/email";

import {
	createCompany,
	createDomainVerification,
	createUserAdmin,
} from "@optima/supabase/mutations";
import { getCompanyByDomain } from "@optima/supabase/queries";
import {
	companyInsertSchema,
	userInsertSchema,
} from "@optima/supabase/validations";
import { redirect } from "next/navigation";
import { z } from "zod";

export const onboardUserAction = authActionClient
	.metadata({
		name: "onboard-user",
	})
	.schema(userInsertSchema)
	.action(async ({ ctx, parsedInput }) => {
		const { user } = ctx;
		const supabase = await createServerClient({
			isAdmin: true,
		});
		const { ...rest } = parsedInput;

		const { data, error } = await createUserAdmin(supabase, {
			...rest,
			id: user.id,
		});

		if (error) {
			throw new Error(error.message);
		}

		// await createUserPreferences(supabase, {
		//   user_id: user.id,
		//   timezone,
		// });

		return data;
	});

export const onboardCompanyAction = authActionClient
	.metadata({
		name: "onboard-company",
	})
	.schema(companyInsertSchema)
	.action(async ({ ctx, parsedInput }) => {
		const { user, resend } = ctx;
		const supabase = await createServerClient({
			isAdmin: true,
		});

		const { data: existingCompany, error: existingCompanyError } =
			await getCompanyByDomain(supabase, parsedInput.domain);

		if (existingCompanyError) {
			throw new Error(existingCompanyError.message);
		}

		if (existingCompany) {
			throw new Error(
				`Company already exists with this domain ${parsedInput.domain} , please use a different domain or contact support`,
			);
		}

		const { data: company, error } = await createCompany(supabase, {
			...parsedInput,
			admin_id: user.id,
			profile: null,
		});

		if (error) {
			throw new Error(error.message);
		}

		const { error: domainVerificationError } = await createDomainVerification(
			supabase,
			{
				company_id: company.id,
				domain: company.domain,
				verification_token: crypto.randomBytes(16).toString("hex"),
			},
		);

		if (domainVerificationError) {
			throw new Error(domainVerificationError.message);
		}

		return company;
	});
