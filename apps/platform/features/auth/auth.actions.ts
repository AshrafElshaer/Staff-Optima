"use server";
import { auth } from "@/lib/auth/auth";
import { actionClient } from "@/lib/safe-action";
import { getUserOrganization } from "@optima/database/queries";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
export const signInAction = actionClient
	.schema(
		z.object({
			email: z.string().email(),
		}),
	)
	.action(async ({ parsedInput: { email } }) => {
		const { success } = await auth.api.sendVerificationOTP({
			body: {
				email,
				type: "sign-in",
			},
		});

		return { success };
	});

export const verifyOtpAction = actionClient
	.schema(
		z.object({
			email: z.string().email(),
			otp: z.string(),
			redirectUrl: z.string(),
		}),
	)
	.action(async ({ parsedInput: { email, otp, redirectUrl } }) => {
		const { user } = await auth.api.signInEmailOTP({
			body: {
				email,
				otp,
			},
		});

		const organization = await getUserOrganization(user.id);

		if (!organization) {
			redirect("/onboarding");
		}

		redirect(redirectUrl);
	});

export const signOutAction = actionClient
	.schema(z.object({ redirectUrl: z.string() }))
	.action(async ({ parsedInput: { redirectUrl } }) => {
		await auth.api.signOut({
			headers: await headers(),
		});
		redirect(redirectUrl);
	});
