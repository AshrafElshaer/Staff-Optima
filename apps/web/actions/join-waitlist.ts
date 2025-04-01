"use server";

import { resend } from "@/lib/resend";
import { actionClientWithMeta } from "@/lib/safe-action";
import { createServerClient } from "@/lib/supabase/server";
import { WaitlistEmail } from "@optima/email";
import { z } from "zod";

const waitlistSchema = z.object({
	name: z.string().min(2, {
		message: "Name is required",
	}),
	email: z.string().email(),
});
export const joinWaitlistAction = actionClientWithMeta
	.metadata({
		name: "join-waitlist",
	})
	.schema(waitlistSchema)
	.action(async ({ parsedInput }) => {
		const supabase = await createServerClient();
		const { data, error } = await supabase
			.from("waitlist")
			.insert(parsedInput)
			.select()
			.single();

		if (error) {
			throw new Error(error.message);
		}

		await resend.emails.send({
			from: "Staff Optima <noreply@staffoptima.co>",
			to: parsedInput.email,
			subject: "You're on the List! 🎉",
			react: WaitlistEmail({ name: parsedInput.name }),
		});

		return data;
	});
