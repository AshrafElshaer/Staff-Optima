"use server";

import { redis } from "@/lib/redis";
import { resend } from "@/lib/resend";
import { actionClientWithMeta } from "@/lib/safe-action";
import { createServerClient } from "@/lib/supabase/server";
import { OtpEmail } from "@optima/email";
import { isAuthApiError } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { z } from "zod";

export const signInAction = actionClientWithMeta
	.metadata({
		name: "sign-in",
		track: {
			event: "sign-in",
			channel: "auth",
		},
	})
	.schema(
		z.object({
			email: z.string().email(),
		}),
	)
	.action(async ({ parsedInput }) => {
		const supabase = await createServerClient({ isAdmin: true });

		const { data, error } = await supabase.auth.admin.generateLink({
			email: parsedInput.email,
			type: "magiclink",
		});

		if (error || isAuthApiError(error)) {
			throw new Error(error.message);
		}

		if (!data?.properties?.email_otp) {
			throw new Error("No OTP code generated");
		}

		const { error: emailError, data: emailData } = await resend.emails.send({
			from: "Staff Optima Access <onboarding@staffoptima.co>",
			to: [parsedInput.email],
			subject: "Staff Optima OTP Access",
			react: OtpEmail({
				otpCode: data.properties?.email_otp,
			}),
			headers: {
				"X-Entity-Ref-ID": data.user?.id,
			},
		});

		if (emailError) {
			throw new Error(emailError.message);
		}

		return data;
	});

export const verifyOtpAction = actionClientWithMeta
	.metadata({
		name: "verify-otp",
		track: {
			event: "verify-otp",
			channel: "auth",
		},
	})
	.schema(
		z.object({
			email: z.string().email(),
			token: z.string(),
			auth_type: z.enum(["signup", "magiclink"]),
			redirect_url: z.string().optional(),
		}),
	)
	.action(async ({ parsedInput }) => {
		let redirect_url = parsedInput.redirect_url ?? "/";
		const supabase = await createServerClient({ isAdmin: true });

		const { data, error } = await supabase.auth.verifyOtp({
			email: parsedInput.email,
			token: parsedInput.token,
			type: parsedInput.auth_type,
		});

		if (error) {
			throw new Error(error.message);
		}

		if (!data.user?.user_metadata.organization_id) {
			redirect_url = "/onboarding";
		}

		redirect(redirect_url);
	});
