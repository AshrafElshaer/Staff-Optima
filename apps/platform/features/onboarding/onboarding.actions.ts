"use server";
import crypto from "node:crypto";

import { authActionClient } from "@/lib/safe-action";

import {
	createDomainVerification,
	createOrganization,
	createOrganizationMember,
	createRole,
	createUserRole,
	updateUser,
} from "@optima/database/mutations";
import { getOrganizationByDomain } from "@optima/database/queries";
import {
	organizationInsertSchema,
	userUpdateSchema,
} from "@optima/database/validations";

import { PERMISSIONS_ARRAY } from "@optima/constants";

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
		const { user } = ctx;

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

		const role = await createRole({
			name: "owner",
			permissions: [...PERMISSIONS_ARRAY],
			organizationId: organization.id,
		});

		if (!role) {
			throw new Error("Failed to create owner role");
		}

		const userRole = await createUserRole({
			userId: user.id,
			roleId: role.id,
		});

		if (!userRole) {
			throw new Error("Failed to create user role");
		}

		await createOrganizationMember({
			organizationId: organization.id,
			userId: user.id,
		});

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
