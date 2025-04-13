"use server";
import { authActionClient } from "@/lib/safe-action";
import { createServerClient } from "@/lib/supabase/server";
import { InvitationEmail } from "@optima/email";
import { createUser, createUserRole } from "@optima/supabase/mutations";
import { getOrganizationById } from "@optima/supabase/queries";
import { userInsertSchema } from "@optima/supabase/validations";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const inviteMemberAction = authActionClient
	.metadata({
		name: "inviteMember",
		track: {
			event: "invite-member",
			channel: "organization",
		},
	})
	.schema(
		userInsertSchema.extend({
			role_id: z.string().uuid(),
		}),
	)
	.action(async ({ ctx, parsedInput }) => {
		const { user, resend } = ctx;
		const supabase = await createServerClient({
			isAdmin: true,
		});
		const { role_id, ...rest } = parsedInput;
		const { data, error } = await createUser(
			supabase,
			rest,
			user.user_metadata.organization_id,
		);

		if (error) {
			throw new Error(error.message);
		}

		const { data: organization, error: organizationError } =
			await getOrganizationById(supabase, user.user_metadata.organization_id);

		if (organizationError) {
			throw new Error(organizationError.message);
		}

		const { data: role, error: roleError } = await createUserRole(supabase, {
			user_id: data?.id ?? "",
			role_id,
		});

		if (roleError) {
			throw new Error(roleError.message);
		}

		const { data: emailData, error: emailError } = await resend.emails.send({
			from: "Access Granted <onboarding@staffoptima.co>",
			to: [parsedInput.email],
			subject: `Welcome to ${organization.name}!`,
			react: InvitationEmail({
				name: `${parsedInput.first_name} ${parsedInput.last_name}`,
				organization,
			}),
			headers: {
				"X-Entity-Ref-ID": data?.id ?? "",
			},
		});

		if (emailError) {
			throw new Error(emailError.message);
		}

		revalidatePath("/organization/team");

		return data;
	});
