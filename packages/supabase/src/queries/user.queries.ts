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
	companyId: string,
	filters?: {
		name?: string;
	},
) {
	const query = supabase
		.from("company_members")
		.select("user:users(*)")
		.eq("company_id", companyId);

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
	companyId: string,
	filters?: {
		name?: string;
		role: string[] | null;
	},
) {
	const query = supabase
		.from("company_members")
		.select("users(*, user_roles!inner(roles!inner(*)))")
		.eq("company_id", companyId);

	if (filters?.name) {
		query.or(
			`last_name.ilike.%${filters.name}%,first_name.ilike.%${filters.name}%`,
			{
				referencedTable: "users",
			},
		);
	}

	if (filters?.role) {
		query.in("users.user_roles.roles.id", filters.role);
	}

	const { data, error } = await query;

	if (error) {
		return {
			data: null,
			error: error,
		};
	}

	return {
		data: data
			.map((member) => ({
				...member.users,
				role: member.users?.user_roles?.[0]?.roles || null,
			}))
			.filter((member) => member.role !== null),
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

export async function getUserPreferences(supabase: SupabaseInstance) {
	return await supabase.from("user_preferences").select("*").single();
}

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
