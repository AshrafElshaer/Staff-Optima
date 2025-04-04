export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export type Database = {
	public: {
		Tables: {
			departments: {
				Row: {
					created_at: string | null;
					description: string | null;
					head_user_id: string | null;
					id: string;
					name: string;
					organization_id: string;
					updated_at: string | null;
				};
				Insert: {
					created_at?: string | null;
					description?: string | null;
					head_user_id?: string | null;
					id?: string;
					name: string;
					organization_id: string;
					updated_at?: string | null;
				};
				Update: {
					created_at?: string | null;
					description?: string | null;
					head_user_id?: string | null;
					id?: string;
					name?: string;
					organization_id?: string;
					updated_at?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "departments_head_user_id_fkey";
						columns: ["head_user_id"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "departments_organization_id_fkey";
						columns: ["organization_id"];
						isOneToOne: false;
						referencedRelation: "organizations";
						referencedColumns: ["id"];
					},
				];
			};
			domain_verification: {
				Row: {
					created_at: string | null;
					domain: string;
					id: string;
					organization_id: string;
					updated_at: string | null;
					verification_date: string | null;
					verification_status: Database["public"]["Enums"]["domain_verification_status_enum"];
					verification_token: string;
				};
				Insert: {
					created_at?: string | null;
					domain: string;
					id?: string;
					organization_id: string;
					updated_at?: string | null;
					verification_date?: string | null;
					verification_status?: Database["public"]["Enums"]["domain_verification_status_enum"];
					verification_token: string;
				};
				Update: {
					created_at?: string | null;
					domain?: string;
					id?: string;
					organization_id?: string;
					updated_at?: string | null;
					verification_date?: string | null;
					verification_status?: Database["public"]["Enums"]["domain_verification_status_enum"];
					verification_token?: string;
				};
				Relationships: [
					{
						foreignKeyName: "domain_verification_organization_id_fkey";
						columns: ["organization_id"];
						isOneToOne: false;
						referencedRelation: "organizations";
						referencedColumns: ["id"];
					},
				];
			};
			organization_members: {
				Row: {
					created_at: string | null;
					organization_id: string;
					updated_at: string | null;
					user_id: string;
				};
				Insert: {
					created_at?: string | null;
					organization_id: string;
					updated_at?: string | null;
					user_id: string;
				};
				Update: {
					created_at?: string | null;
					organization_id?: string;
					updated_at?: string | null;
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: "organization_members_organization_id_fkey";
						columns: ["organization_id"];
						isOneToOne: false;
						referencedRelation: "organizations";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "organization_members_user_id_fkey";
						columns: ["user_id"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					},
				];
			};
			organizations: {
				Row: {
					address_1: string | null;
					address_2: string | null;
					admin_id: string | null;
					city: string | null;
					country: string;
					created_at: string | null;
					domain: string;
					employee_count: string | null;
					id: string;
					industry: string;
					is_domain_verified: boolean;
					logo: string | null;
					name: string;
					profile: string | null;
					state: string | null;
					tax_id: string | null;
					timezone: string;
					updated_at: string | null;
					zip_code: string | null;
				};
				Insert: {
					address_1?: string | null;
					address_2?: string | null;
					admin_id?: string | null;
					city?: string | null;
					country: string;
					created_at?: string | null;
					domain: string;
					employee_count?: string | null;
					id?: string;
					industry: string;
					is_domain_verified?: boolean;
					logo?: string | null;
					name: string;
					profile?: string | null;
					state?: string | null;
					tax_id?: string | null;
					timezone: string;
					updated_at?: string | null;
					zip_code?: string | null;
				};
				Update: {
					address_1?: string | null;
					address_2?: string | null;
					admin_id?: string | null;
					city?: string | null;
					country?: string;
					created_at?: string | null;
					domain?: string;
					employee_count?: string | null;
					id?: string;
					industry?: string;
					is_domain_verified?: boolean;
					logo?: string | null;
					name?: string;
					profile?: string | null;
					state?: string | null;
					tax_id?: string | null;
					timezone?: string;
					updated_at?: string | null;
					zip_code?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "organizations_admin_id_fkey";
						columns: ["admin_id"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					},
				];
			};
			roles: {
				Row: {
					created_at: string | null;
					id: string;
					name: string;
					organization_id: string;
					permissions: string[];
					updated_at: string | null;
				};
				Insert: {
					created_at?: string | null;
					id?: string;
					name: string;
					organization_id: string;
					permissions: string[];
					updated_at?: string | null;
				};
				Update: {
					created_at?: string | null;
					id?: string;
					name?: string;
					organization_id?: string;
					permissions?: string[];
					updated_at?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "roles_organization_id_fkey";
						columns: ["organization_id"];
						isOneToOne: false;
						referencedRelation: "organizations";
						referencedColumns: ["id"];
					},
				];
			};
			user_preferences: {
				Row: {
					created_at: string;
					date_format: string;
					reminder_period: number;
					timezone: string;
					updated_at: string;
					user_id: string;
				};
				Insert: {
					created_at?: string;
					date_format?: string;
					reminder_period?: number;
					timezone: string;
					updated_at?: string;
					user_id: string;
				};
				Update: {
					created_at?: string;
					date_format?: string;
					reminder_period?: number;
					timezone?: string;
					updated_at?: string;
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: "user_preferences_user_id_fkey";
						columns: ["user_id"];
						isOneToOne: true;
						referencedRelation: "users";
						referencedColumns: ["id"];
					},
				];
			};
			user_roles: {
				Row: {
					created_at: string | null;
					role_id: string;
					updated_at: string | null;
					user_id: string;
				};
				Insert: {
					created_at?: string | null;
					role_id: string;
					updated_at?: string | null;
					user_id: string;
				};
				Update: {
					created_at?: string | null;
					role_id?: string;
					updated_at?: string | null;
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: "user_roles_role_id_fkey";
						columns: ["role_id"];
						isOneToOne: false;
						referencedRelation: "roles";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "user_roles_user_id_fkey";
						columns: ["user_id"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					},
				];
			};
			users: {
				Row: {
					created_at: string | null;
					email: string;
					first_name: string;
					id: string;
					image: string | null;
					last_name: string;
					phone_number: string;
					updated_at: string | null;
				};
				Insert: {
					created_at?: string | null;
					email: string;
					first_name: string;
					id: string;
					image?: string | null;
					last_name: string;
					phone_number: string;
					updated_at?: string | null;
				};
				Update: {
					created_at?: string | null;
					email?: string;
					first_name?: string;
					id?: string;
					image?: string | null;
					last_name?: string;
					phone_number?: string;
					updated_at?: string | null;
				};
				Relationships: [];
			};
			waitlist: {
				Row: {
					created_at: string | null;
					email: string;
					is_granted: boolean | null;
					name: string;
					updated_at: string | null;
				};
				Insert: {
					created_at?: string | null;
					email: string;
					is_granted?: boolean | null;
					name: string;
					updated_at?: string | null;
				};
				Update: {
					created_at?: string | null;
					email?: string;
					is_granted?: boolean | null;
					name?: string;
					updated_at?: string | null;
				};
				Relationships: [];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			get_user_organization_id: {
				Args: Record<PropertyKey, never>;
				Returns: string;
			};
			has_permission: {
				Args: {
					permission: string;
				};
				Returns: boolean;
			};
			is_user_organization_admin: {
				Args: {
					organization_id: string;
				};
				Returns: boolean;
			};
			is_user_organization_member: {
				Args: {
					organization_id: string;
				};
				Returns: boolean;
			};
		};
		Enums: {
			domain_verification_status_enum: "pending" | "verified" | "failed";
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
	PublicTableNameOrOptions extends
		| keyof (PublicSchema["Tables"] & PublicSchema["Views"])
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
				Database[PublicTableNameOrOptions["schema"]]["Views"])
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
			Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
			Row: infer R;
		}
		? R
		: never
	: PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
				PublicSchema["Views"])
		? (PublicSchema["Tables"] &
				PublicSchema["Views"])[PublicTableNameOrOptions] extends {
				Row: infer R;
			}
			? R
			: never
		: never;

export type TablesInsert<
	PublicTableNameOrOptions extends
		| keyof PublicSchema["Tables"]
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Insert: infer I;
		}
		? I
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
		? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
				Insert: infer I;
			}
			? I
			: never
		: never;

export type TablesUpdate<
	PublicTableNameOrOptions extends
		| keyof PublicSchema["Tables"]
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Update: infer U;
		}
		? U
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
		? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
				Update: infer U;
			}
			? U
			: never
		: never;

export type Enums<
	PublicEnumNameOrOptions extends
		| keyof PublicSchema["Enums"]
		| { schema: keyof Database },
	EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
		: never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
	? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
	: PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
		? PublicSchema["Enums"][PublicEnumNameOrOptions]
		: never;

export type CompositeTypes<
	PublicCompositeTypeNameOrOptions extends
		| keyof PublicSchema["CompositeTypes"]
		| { schema: keyof Database },
	CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
		: never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
	? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
	: PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
		? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
		: never;
