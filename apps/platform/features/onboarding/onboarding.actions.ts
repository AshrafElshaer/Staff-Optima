"use server";
import crypto from "node:crypto";
import { redis } from "@/lib/redis";
import { authActionClient } from "@/lib/safe-action";
// import { createServerClient } from "@/lib/supabase/server";
import { WaitlistEmail } from "@optima/email";

import {
	// createUser,
	// createUserAdmin,
	// createUserAvailability,
	// createUserPreferences,
	createDomainVerification,
	// createDomainVerification,
	createOrganization,
	createUser,
	updateUser,
} from "@optima/database/mutations";
import { getOrganizationByDomain } from "@optima/database/queries";
import {
	organizationInsertSchema,
	userUpdateSchema,
} from "@optima/database/validations";
import { redirect } from "next/navigation";
import { z } from "zod";
// import { getOrganizationByDomain } from "@optima/supabase/queries";

export const onboardUserAction = authActionClient
	.metadata({
		name: "onboard-user",
	})
	.schema(userUpdateSchema)
	.action(async ({ ctx, parsedInput }) => {
		const { user } = ctx;
		const updatedUser = await updateUser(user.id, parsedInput);
		return updatedUser;
	});

export const onboardOrganizationAction = authActionClient
	.metadata({
		name: "onboard-organization",
	})
	.schema(organizationInsertSchema)
	.action(async ({ ctx, parsedInput }) => {
		const { user, resend } = ctx;

		const existingOrganization = await getOrganizationByDomain(
			parsedInput.domain,
		);

		if (existingOrganization) {
			throw new Error(
				`Organization already exists with this domain ${parsedInput.domain} , please use a different domain or contact support`,
			);
		}

		const organization = await createOrganization({
			...parsedInput,
			adminId: user.id,
		});

		if (!organization) {
			throw new Error("Failed to create organization");
		}

		const domainVerification = await createDomainVerification({
			organizationId: organization.id,
			domain: parsedInput.domain,
			verificationToken: crypto.randomBytes(16).toString("hex"),
			verificationStatus: "pending",
		});

		if (!domainVerification) {
			throw new Error("Failed to create domain verification");
		}

		return organization;
	});
