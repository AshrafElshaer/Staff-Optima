import type {
	SupabaseInstance,
	TimeSlot,
	User,
	// UserAvailability,
} from "../types";

export async function getCurrentUser(supabase: SupabaseInstance) {
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return {
			data: null,
			error: null,
		};
	}
	return supabase.from("users").select("*").eq("id", user.id).single();
}

export async function getTeamMembers(
	supabase: SupabaseInstance,
	organizationId: string,
	filters?: {
		name?: string;
	},
) {
	const query = supabase
		.from("organization_members")
		.select("user:users(*)")
		.eq("organization_id", organizationId);

	if (filters?.name) {
		query.or(
			`last_name.ilike.%${filters.name}%,first_name.ilike.%${filters.name}%`,
			{
				referencedTable: "user",
			},
		);
	}

	const { data, error } = await query;

	if (error) {
		return {
			data: null,
			error: error,
		};
	}

	return {
		data:
			data.length === 0
				? []
				: (data.map((member) => member.user).filter(Boolean) as User[]),
		error: null,
	};
}

export async function getMembersWithRole(
	supabase: SupabaseInstance,
	organizationId: string,
	filters?: {
		name?: string;
		role?: string;
	},
) {
	const query = supabase
		.from("organization_members")
		.select("users(* , role:user_roles(roles(*)))")
		.eq("organization_id", organizationId);

	if (filters?.name) {
		query.or(
			`last_name.ilike.%${filters.name}%,first_name.ilike.%${filters.name}%`,
			{
				referencedTable: "user",
			},
		);
	}

	if (filters?.role) {
		query.or(`user_roles.name.ilike.%${filters.role}%`, {
			referencedTable: "user_roles",
		});
	}

	const { data, error } = await query;

	if (error) {
		return {
			data: null,
			error: error,
		};
	}

	return {
		data: data.map((member) => ({
			...member.users,
			role: member.users.role[0]?.roles,
		})),
		error: null,
	};
}

export async function getUserRole(supabase: SupabaseInstance, userId: string) {
	return await supabase
		.from("user_roles")
		.select("role:roles(*)")
		.eq("user_id", userId)
		.single();
}

// export async function getUserPreferences(supabase: SupabaseInstance) {
//   return await supabase.from("user_preferences").select("*").single();
// }

// export async function getUserAvailability(
//   supabase: SupabaseInstance,
//   userId: string,
// ) {
//   return await supabase
//     .from("user_availability")
//     .select("*")
//     .eq("user_id", userId)
//     .returns<UserAvailability>()
//     .single();
// }
