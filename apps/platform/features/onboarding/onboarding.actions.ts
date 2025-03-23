"use server";
import crypto from "node:crypto";
import { redis } from "@/lib/redis";
import { authActionClient } from "@/lib/safe-action";
import { createServerClient } from "@/lib/supabase/server";
import { WaitlistEmail } from "@optima/email";

import {
	createDomainVerification,
	createOrganization,
	createUserAdmin,
} from "@optima/supabase/mutations";
import { getOrganizationByDomain } from "@optima/supabase/queries";
import {
	organizationInsertSchema,
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

export const onboardOrganizationAction = authActionClient
	.metadata({
		name: "onboard-organization",
	})
	.schema(organizationInsertSchema)
	.action(async ({ ctx, parsedInput }) => {
		const { user, resend } = ctx;
		const supabase = await createServerClient({
			isAdmin: true,
		});

		const { data: existingOrganization, error: existingOrganizationError } =
			await getOrganizationByDomain(supabase, parsedInput.domain);

		if (existingOrganizationError) {
			console.log("error")
			throw new Error(existingOrganizationError.message);
		}

		if (existingOrganization.length) {
			throw new Error(
				`Organization already exists with this domain ${parsedInput.domain} , please use a different domain or contact support`,
			);
		}

		const { data: organization, error } = await createOrganization(supabase, {
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
				organization_id: organization.id,
				domain: organization.domain,
				verification_token: crypto.randomBytes(16).toString("hex"),
			},
		);

		if (domainVerificationError) {
			throw new Error(domainVerificationError.message);
		}

		return organization;
	});
