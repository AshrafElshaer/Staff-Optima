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
			application_stage_triggers: {
				Row: {
					action_data: Json;
					action_type: string;
					company_id: string;
					created_at: string;
					id: string;
					stage_id: string;
					trigger_condition: Database["public"]["Enums"]["application_stage_trigger_condition"];
					updated_at: string;
				};
				Insert: {
					action_data: Json;
					action_type: string;
					company_id: string;
					created_at?: string;
					id?: string;
					stage_id: string;
					trigger_condition: Database["public"]["Enums"]["application_stage_trigger_condition"];
					updated_at?: string;
				};
				Update: {
					action_data?: Json;
					action_type?: string;
					company_id?: string;
					created_at?: string;
					id?: string;
					stage_id?: string;
					trigger_condition?: Database["public"]["Enums"]["application_stage_trigger_condition"];
					updated_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: "application_stage_triggers_company_id_fkey";
						columns: ["company_id"];
						isOneToOne: false;
						referencedRelation: "companies";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "application_stage_triggers_stage_id_fkey";
						columns: ["stage_id"];
						isOneToOne: false;
						referencedRelation: "application_stages";
						referencedColumns: ["id"];
					},
				];
			};
			application_stages: {
				Row: {
					company_id: string;
					created_at: string;
					description: string;
					id: string;
					indicator_color: string;
					stage_order: number;
					title: string;
					updated_at: string;
				};
				Insert: {
					company_id: string;
					created_at?: string;
					description: string;
					id?: string;
					indicator_color: string;
					stage_order: number;
					title: string;
					updated_at?: string;
				};
				Update: {
					company_id?: string;
					created_at?: string;
					description?: string;
					id?: string;
					indicator_color?: string;
					stage_order?: number;
					title?: string;
					updated_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: "application_stages_company_id_fkey";
						columns: ["company_id"];
						isOneToOne: false;
						referencedRelation: "companies";
						referencedColumns: ["id"];
					},
				];
			};
			companies: {
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
						foreignKeyName: "companies_admin_id_fkey";
						columns: ["admin_id"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					},
				];
			};
			company_members: {
				Row: {
					company_id: string;
					created_at: string | null;
					updated_at: string | null;
					user_id: string;
				};
				Insert: {
					company_id: string;
					created_at?: string | null;
					updated_at?: string | null;
					user_id: string;
				};
				Update: {
					company_id?: string;
					created_at?: string | null;
					updated_at?: string | null;
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: "company_members_company_id_fkey";
						columns: ["company_id"];
						isOneToOne: false;
						referencedRelation: "companies";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "company_members_user_id_fkey";
						columns: ["user_id"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					},
				];
			};
			departments: {
				Row: {
					company_id: string;
					created_at: string | null;
					description: string | null;
					head_user_id: string | null;
					id: string;
					name: string;
					updated_at: string | null;
				};
				Insert: {
					company_id: string;
					created_at?: string | null;
					description?: string | null;
					head_user_id?: string | null;
					id?: string;
					name: string;
					updated_at?: string | null;
				};
				Update: {
					company_id?: string;
					created_at?: string | null;
					description?: string | null;
					head_user_id?: string | null;
					id?: string;
					name?: string;
					updated_at?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "departments_company_id_fkey";
						columns: ["company_id"];
						isOneToOne: false;
						referencedRelation: "companies";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "departments_head_user_id_fkey";
						columns: ["head_user_id"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					},
				];
			};
			domain_verification: {
				Row: {
					company_id: string;
					created_at: string | null;
					domain: string;
					id: string;
					updated_at: string | null;
					verification_date: string | null;
					verification_status: Database["public"]["Enums"]["domain_verification_status_enum"];
					verification_token: string;
				};
				Insert: {
					company_id: string;
					created_at?: string | null;
					domain: string;
					id?: string;
					updated_at?: string | null;
					verification_date?: string | null;
					verification_status?: Database["public"]["Enums"]["domain_verification_status_enum"];
					verification_token: string;
				};
				Update: {
					company_id?: string;
					created_at?: string | null;
					domain?: string;
					id?: string;
					updated_at?: string | null;
					verification_date?: string | null;
					verification_status?: Database["public"]["Enums"]["domain_verification_status_enum"];
					verification_token?: string;
				};
				Relationships: [
					{
						foreignKeyName: "domain_verification_company_id_fkey";
						columns: ["company_id"];
						isOneToOne: false;
						referencedRelation: "companies";
						referencedColumns: ["id"];
					},
				];
			};
			job_posts: {
				Row: {
					benefits: string[] | null;
					company_id: string;
					created_at: string;
					created_by: string | null;
					department_id: string | null;
					employment_type: Database["public"]["Enums"]["employment_type_enum"];
					experience_level: Database["public"]["Enums"]["experience_level_enum"];
					id: string;
					job_details: string;
					location: string | null;
					required_skills: string[] | null;
					salary_range: string | null;
					screening_questions: Json | null;
					status: Database["public"]["Enums"]["job_post_status_enum"];
					title: string;
					updated_at: string;
					work_mode: Database["public"]["Enums"]["work_mode_enum"];
				};
				Insert: {
					benefits?: string[] | null;
					company_id: string;
					created_at?: string;
					created_by?: string | null;
					department_id?: string | null;
					employment_type: Database["public"]["Enums"]["employment_type_enum"];
					experience_level: Database["public"]["Enums"]["experience_level_enum"];
					id?: string;
					job_details: string;
					location?: string | null;
					required_skills?: string[] | null;
					salary_range?: string | null;
					screening_questions?: Json | null;
					status?: Database["public"]["Enums"]["job_post_status_enum"];
					title: string;
					updated_at?: string;
					work_mode: Database["public"]["Enums"]["work_mode_enum"];
				};
				Update: {
					benefits?: string[] | null;
					company_id?: string;
					created_at?: string;
					created_by?: string | null;
					department_id?: string | null;
					employment_type?: Database["public"]["Enums"]["employment_type_enum"];
					experience_level?: Database["public"]["Enums"]["experience_level_enum"];
					id?: string;
					job_details?: string;
					location?: string | null;
					required_skills?: string[] | null;
					salary_range?: string | null;
					screening_questions?: Json | null;
					status?: Database["public"]["Enums"]["job_post_status_enum"];
					title?: string;
					updated_at?: string;
					work_mode?: Database["public"]["Enums"]["work_mode_enum"];
				};
				Relationships: [
					{
						foreignKeyName: "job_posts_company_id_fkey";
						columns: ["company_id"];
						isOneToOne: false;
						referencedRelation: "companies";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "job_posts_created_by_fkey";
						columns: ["created_by"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "job_posts_department_id_fkey";
						columns: ["department_id"];
						isOneToOne: false;
						referencedRelation: "departments";
						referencedColumns: ["id"];
					},
				];
			};
			roles: {
				Row: {
					company_id: string;
					created_at: string | null;
					id: string;
					name: string;
					permissions: string[];
					updated_at: string | null;
				};
				Insert: {
					company_id: string;
					created_at?: string | null;
					id?: string;
					name: string;
					permissions: string[];
					updated_at?: string | null;
				};
				Update: {
					company_id?: string;
					created_at?: string | null;
					id?: string;
					name?: string;
					permissions?: string[];
					updated_at?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "roles_company_id_fkey";
						columns: ["company_id"];
						isOneToOne: false;
						referencedRelation: "companies";
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
					company_id: string;
					created_at: string | null;
					role_id: string;
					updated_at: string | null;
					user_id: string;
				};
				Insert: {
					company_id: string;
					created_at?: string | null;
					role_id: string;
					updated_at?: string | null;
					user_id: string;
				};
				Update: {
					company_id?: string;
					created_at?: string | null;
					role_id?: string;
					updated_at?: string | null;
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: "user_roles_company_id_fkey";
						columns: ["company_id"];
						isOneToOne: false;
						referencedRelation: "companies";
						referencedColumns: ["id"];
					},
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
			get_user_company_id: {
				Args: Record<PropertyKey, never>;
				Returns: string;
			};
			has_permission: {
				Args: { permission: string };
				Returns: boolean;
			};
			is_user_company_admin: {
				Args: { company_id: string };
				Returns: boolean;
			};
			is_user_company_member: {
				Args: { company_id: string };
				Returns: boolean;
			};
		};
		Enums: {
			application_stage_trigger_condition: "on_start" | "on_complete";
			domain_verification_status_enum: "pending" | "verified" | "failed";
			employment_type_enum:
				| "full_time"
				| "part_time"
				| "contract"
				| "internship";
			experience_level_enum: "junior" | "mid" | "senior" | "lead" | "executive";
			job_post_status_enum: "draft" | "archived" | "active";
			work_mode_enum: "remote" | "hybrid" | "on_site";
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
};

type DefaultSchema = Database[Extract<keyof Database, "public">];

export type Tables<
	DefaultSchemaTableNameOrOptions extends
		| keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
		| { schema: keyof Database },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
				Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
		: never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
	? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
			Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
			Row: infer R;
		}
		? R
		: never
	: DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
				DefaultSchema["Views"])
		? (DefaultSchema["Tables"] &
				DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
				Row: infer R;
			}
			? R
			: never
		: never;

export type TablesInsert<
	DefaultSchemaTableNameOrOptions extends
		| keyof DefaultSchema["Tables"]
		| { schema: keyof Database },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
		: never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
	? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Insert: infer I;
		}
		? I
		: never
	: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
		? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
				Insert: infer I;
			}
			? I
			: never
		: never;

export type TablesUpdate<
	DefaultSchemaTableNameOrOptions extends
		| keyof DefaultSchema["Tables"]
		| { schema: keyof Database },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
		: never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
	? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Update: infer U;
		}
		? U
		: never
	: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
		? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
				Update: infer U;
			}
			? U
			: never
		: never;

export type Enums<
	DefaultSchemaEnumNameOrOptions extends
		| keyof DefaultSchema["Enums"]
		| { schema: keyof Database },
	EnumName extends DefaultSchemaEnumNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
		: never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
	? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
	: DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
		? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
		: never;

export type CompositeTypes<
	PublicCompositeTypeNameOrOptions extends
		| keyof DefaultSchema["CompositeTypes"]
		| { schema: keyof Database },
	CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
		: never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
	? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
	: PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
		? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
		: never;

export const Constants = {
	public: {
		Enums: {
			application_stage_trigger_condition: ["on_start", "on_complete"],
			domain_verification_status_enum: ["pending", "verified", "failed"],
			employment_type_enum: [
				"full_time",
				"part_time",
				"contract",
				"internship",
			],
			experience_level_enum: ["junior", "mid", "senior", "lead", "executive"],
			job_post_status_enum: ["draft", "archived", "active"],
			work_mode_enum: ["remote", "hybrid", "on_site"],
		},
	},
} as const;
