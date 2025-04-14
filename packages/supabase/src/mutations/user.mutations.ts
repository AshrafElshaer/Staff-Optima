// import type { UserAvailability } from "../types";
import type { SupabaseInstance, TablesInsert, TablesUpdate } from "../types";

type UserInsert = TablesInsert<"users">;
type UserUpdate = TablesUpdate<"users">;
type UserRoleInsert = TablesInsert<"user_roles">;
type UserRoleUpdate = TablesUpdate<"user_roles">;
type UserPreferencesInsert = TablesInsert<"user_preferences">;
type UserPreferencesUpdate = TablesUpdate<"user_preferences">;
// type UserAvailabilityInsert = TablesInsert<"user_availability">;
// type UserAvailabilityUpdate = TablesUpdate<"user_availability">;

export async function createUserAdmin(
	supabase: SupabaseInstance,
	data: UserInsert,
) {
	return await supabase.from("users").insert(data).select().single();
}
export async function createUser(
	supabase: SupabaseInstance,
	data: Omit<UserInsert, "id">,
	companyId: string,
) {
	const { data: auth, error: authError } = await supabase.auth.admin.createUser(
		{
			email: data.email,
			user_metadata: {
				company_id: companyId,
			},
		},
	);

	if (!auth.user || authError) {
		return {
			data: null,
			error: authError,
		};
	}

	const { data: user, error: userError } = await supabase
		.from("users")
		.insert({
			...data,
			id: auth.user.id,
		})
		.select()
		.single();

	if (userError) {
		return {
			data: null,
			error: userError,
		};
	}

	await supabase.from("company_members").insert({
		user_id: auth.user.id,
		company_id: companyId,
	});

	return {
		data: user,
		error: null,
	};
}

export async function updateUser(supabase: SupabaseInstance, data: UserUpdate) {
	if (!data.id) {
		return {
			data: null,
			error: new Error("User id is required"),
		};
	}

	return await supabase
		.from("users")
		.update(data)
		.eq("id", data.id)
		.select()
		.single();
}

export async function deleteUser(supabase: SupabaseInstance, userId: string) {
	return await supabase.auth.admin.deleteUser(userId);
}

export async function createUserRole(
	supabase: SupabaseInstance,
	data: UserRoleInsert,
) {
	return await supabase.from("user_roles").insert(data).select().single();
}

export async function createUserPreferences(
	supabase: SupabaseInstance,
	data: UserPreferencesInsert,
) {
	return await supabase.from("user_preferences").insert(data).select().single();
}

export async function updateUserPreferences(
	supabase: SupabaseInstance,
	data: UserPreferencesUpdate,
) {
	if (!data.user_id) {
		throw new Error("User id is required");
	}

	return await supabase
		.from("user_preferences")
		.update(data)
		.eq("user_id", data.user_id)
		.select()
		.single();
}

// export async function createUserAvailability(
//   supabase: SupabaseInstance,
//   data: UserAvailabilityInsert,
// ) {
//   return await supabase
//     .from("user_availability")
//     .insert(data)
//     .select()
//     .single();
// }

// export async function updateUserAvailability(
//   supabase: SupabaseInstance,
//   data: UserAvailabilityUpdate,
// ) {
//   if (!data.user_id) {
//     throw new Error("User id is required");
//   }

//   return await supabase
//     .from("user_availability")
//     .update(data)
//     .eq("user_id", data.user_id)
//     .select()
//     .single();
// }
