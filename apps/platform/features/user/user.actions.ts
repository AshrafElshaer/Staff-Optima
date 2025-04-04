"use server";
import { authActionClient } from "@/lib/safe-action";
import {
	createUserPreferences,
	// createUserAvailability,
	updateUser,
	// updateUserAvailability,
	updateUserPreferences,
} from "@optima/supabase/mutations";
import {
	userPreferencesInsertSchema,
	// userAvailabilityInsertSchema,
	// userAvailabilityUpdateSchema,
	userPreferencesUpdateSchema,
	userUpdateSchema,
} from "@optima/supabase/validations";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const updateUserAction = authActionClient
	.metadata({
		name: "update-user",
		track: {
			event: "update-user",
			channel: "user",
		},
	})
	.schema(userUpdateSchema)
	.action(async ({ ctx, parsedInput }) => {
		const { supabase } = ctx;
		const { id, ...data } = parsedInput;

		if (data.email) {
			const updatedAuth = await supabase.auth.updateUser({
				email: data.email,
			});
			if (updatedAuth.error) throw new Error(updatedAuth.error.message);
		}
		const { error, data: user } = await updateUser(supabase, { id, ...data });
		if (error) throw new Error(error.message);

		revalidatePath("/account");
		return user;
	});

export const createUserPreferencesAction = authActionClient
	.metadata({
		name: "create-user-preferences",
		track: {
			event: "create-user-preferences",
			channel: "user",
		},
	})
	.schema(userPreferencesInsertSchema.omit({ user_id: true }))
	.action(async ({ ctx, parsedInput }) => {
		const { supabase, user } = ctx;
		const { timezone, date_format, reminder_period } = parsedInput;
		const { error, data: userPreferences } = await createUserPreferences(
			supabase,
			{
				user_id: user.id,
				timezone,
				date_format,
				reminder_period,
			},
		);
		if (error) throw new Error(error.message);
		revalidatePath("/account/preferences");
		return userPreferences;
	});
export const updateUserPreferencesAction = authActionClient
	.metadata({
		name: "update-user-preferences",
	})
	.schema(userPreferencesUpdateSchema.omit({ user_id: true }))
	.action(async ({ ctx, parsedInput }) => {
		const { supabase, user } = ctx;
		const { timezone, date_format, reminder_period } = parsedInput;
		const { error, data: userPreferences } = await updateUserPreferences(
			supabase,
			{
				user_id: user.id,
				timezone,
				date_format,
				reminder_period,
			},
		);
		if (error) throw new Error(error.message);
		revalidatePath("/account-settings/preferences");
		return userPreferences;
	});

export const createUserAvailabilityAction = authActionClient
	.metadata({
		name: "create-user-availability",
	})
	// .schema(userAvailabilityInsertSchema.omit({ user_id: true }))
	.action(async ({ ctx, parsedInput }) => {
		const { supabase, user } = ctx;

		// const { error, data: userAvailability } = await createUserAvailability(
		//   supabase,
		//   {
		//     ...parsedInput,
		//     user_id: user.id,
		//   },
		// );

		// if (error) throw new Error(error.message);

		// revalidatePath("/account-settings/availability");

		// return userAvailability;
	});

export const updateUserAvailabilityAction = authActionClient
	.metadata({
		name: "update-user-availability",
	})
	// .schema(userAvailabilityUpdateSchema)
	.action(async ({ ctx, parsedInput }) => {
		// const { supabase, user } = ctx;
		// const { error, data: userAvailability } = await updateUserAvailability(
		//   supabase,
		//   {
		//     ...parsedInput,
		//     user_id: user.id,
		//   },
		// );
		// if (error) throw new Error(error.message);
		// revalidatePath("/account-settings/availability");
		// return userAvailability;
	});
