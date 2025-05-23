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
			applications: {
				Row: {
					candidate_id: string;
					candidate_match: number;
					company_id: string;
					created_at: string;
					department_id: string | null;
					id: string;
					job_id: string | null;
					reject_reason_id: string | null;
					screening_question_answers: Json | null;
					source: string | null;
					stage_id: string | null;
					status: Database["public"]["Enums"]["application_status_enum"];
					updated_at: string;
				};
				Insert: {
					candidate_id: string;
					candidate_match: number;
					company_id: string;
					created_at?: string;
					department_id?: string | null;
					id?: string;
					job_id?: string | null;
					reject_reason_id?: string | null;
					screening_question_answers?: Json | null;
					source?: string | null;
					stage_id?: string | null;
					status?: Database["public"]["Enums"]["application_status_enum"];
					updated_at?: string;
				};
				Update: {
					candidate_id?: string;
					candidate_match?: number;
					company_id?: string;
					created_at?: string;
					department_id?: string | null;
					id?: string;
					job_id?: string | null;
					reject_reason_id?: string | null;
					screening_question_answers?: Json | null;
					source?: string | null;
					stage_id?: string | null;
					status?: Database["public"]["Enums"]["application_status_enum"];
					updated_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: "applications_candidate_id_fkey";
						columns: ["candidate_id"];
						isOneToOne: false;
						referencedRelation: "candidates";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "applications_company_id_fkey";
						columns: ["company_id"];
						isOneToOne: false;
						referencedRelation: "companies";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "applications_department_id_fkey";
						columns: ["department_id"];
						isOneToOne: false;
						referencedRelation: "departments";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "applications_job_id_fkey";
						columns: ["job_id"];
						isOneToOne: false;
						referencedRelation: "job_posts";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "applications_reject_reason_id_fkey";
						columns: ["reject_reason_id"];
						isOneToOne: false;
						referencedRelation: "reject_reasons";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "applications_stage_id_fkey";
						columns: ["stage_id"];
						isOneToOne: false;
						referencedRelation: "application_stages";
						referencedColumns: ["id"];
					},
				];
			};
			attachments: {
				Row: {
					application_id: string | null;
					attachment_type:
						| Database["public"]["Enums"]["attachment_type_enum"]
						| null;
					candidate_id: string;
					company_id: string;
					created_at: string;
					file_name: string;
					file_path: string;
					file_size: number;
					file_url: string;
					id: string;
					updated_at: string;
				};
				Insert: {
					application_id?: string | null;
					attachment_type?:
						| Database["public"]["Enums"]["attachment_type_enum"]
						| null;
					candidate_id: string;
					company_id: string;
					created_at?: string;
					file_name: string;
					file_path: string;
					file_size: number;
					file_url: string;
					id?: string;
					updated_at?: string;
				};
				Update: {
					application_id?: string | null;
					attachment_type?:
						| Database["public"]["Enums"]["attachment_type_enum"]
						| null;
					candidate_id?: string;
					company_id?: string;
					created_at?: string;
					file_name?: string;
					file_path?: string;
					file_size?: number;
					file_url?: string;
					id?: string;
					updated_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: "attachments_application_id_fkey";
						columns: ["application_id"];
						isOneToOne: false;
						referencedRelation: "applications";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "attachments_candidate_id_fkey";
						columns: ["candidate_id"];
						isOneToOne: false;
						referencedRelation: "candidates";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "attachments_company_id_fkey";
						columns: ["company_id"];
						isOneToOne: false;
						referencedRelation: "companies";
						referencedColumns: ["id"];
					},
				];
			};
			candidate_educations: {
				Row: {
					candidate_id: string;
					company_id: string;
					degree: string | null;
					end_date: string | null;
					field_of_study: string | null;
					grade: string | null;
					id: string;
					institution: string;
					start_date: string | null;
				};
				Insert: {
					candidate_id: string;
					company_id: string;
					degree?: string | null;
					end_date?: string | null;
					field_of_study?: string | null;
					grade?: string | null;
					id?: string;
					institution: string;
					start_date?: string | null;
				};
				Update: {
					candidate_id?: string;
					company_id?: string;
					degree?: string | null;
					end_date?: string | null;
					field_of_study?: string | null;
					grade?: string | null;
					id?: string;
					institution?: string;
					start_date?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "candidate_educations_candidate_id_fkey";
						columns: ["candidate_id"];
						isOneToOne: false;
						referencedRelation: "candidates";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "candidate_educations_company_id_fkey";
						columns: ["company_id"];
						isOneToOne: false;
						referencedRelation: "companies";
						referencedColumns: ["id"];
					},
				];
			};
			candidate_experiences: {
				Row: {
					candidate_id: string;
					company: string;
					company_id: string;
					description: string | null;
					end_date: string | null;
					id: string;
					job_title: string;
					skills: string[] | null;
					start_date: string | null;
				};
				Insert: {
					candidate_id: string;
					company: string;
					company_id: string;
					description?: string | null;
					end_date?: string | null;
					id?: string;
					job_title: string;
					skills?: string[] | null;
					start_date?: string | null;
				};
				Update: {
					candidate_id?: string;
					company?: string;
					company_id?: string;
					description?: string | null;
					end_date?: string | null;
					id?: string;
					job_title?: string;
					skills?: string[] | null;
					start_date?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "candidate_experiences_candidate_id_fkey";
						columns: ["candidate_id"];
						isOneToOne: false;
						referencedRelation: "candidates";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "candidate_experiences_company_id_fkey";
						columns: ["company_id"];
						isOneToOne: false;
						referencedRelation: "companies";
						referencedColumns: ["id"];
					},
				];
			};
			candidate_social_links: {
				Row: {
					candidate_id: string;
					company_id: string;
					created_at: string;
					id: string;
					platform: string;
					updated_at: string;
					url: string;
				};
				Insert: {
					candidate_id: string;
					company_id: string;
					created_at?: string;
					id?: string;
					platform: string;
					updated_at?: string;
					url: string;
				};
				Update: {
					candidate_id?: string;
					company_id?: string;
					created_at?: string;
					id?: string;
					platform?: string;
					updated_at?: string;
					url?: string;
				};
				Relationships: [
					{
						foreignKeyName: "candidate_social_links_candidate_id_fkey";
						columns: ["candidate_id"];
						isOneToOne: false;
						referencedRelation: "candidates";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "candidate_social_links_company_id_fkey";
						columns: ["company_id"];
						isOneToOne: false;
						referencedRelation: "companies";
						referencedColumns: ["id"];
					},
				];
			};
			candidates: {
				Row: {
					avatar_url: string | null;
					city: string;
					company_id: string;
					country: string;
					created_at: string;
					date_of_birth: string;
					email: string;
					first_name: string;
					gender: string;
					id: string;
					last_name: string;
					phone_number: string | null;
					timezone: string;
					updated_at: string;
				};
				Insert: {
					avatar_url?: string | null;
					city: string;
					company_id: string;
					country: string;
					created_at?: string;
					date_of_birth: string;
					email: string;
					first_name: string;
					gender: string;
					id?: string;
					last_name: string;
					phone_number?: string | null;
					timezone: string;
					updated_at?: string;
				};
				Update: {
					avatar_url?: string | null;
					city?: string;
					company_id?: string;
					country?: string;
					created_at?: string;
					date_of_birth?: string;
					email?: string;
					first_name?: string;
					gender?: string;
					id?: string;
					last_name?: string;
					phone_number?: string | null;
					timezone?: string;
					updated_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: "candidates_company_id_fkey";
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
			job_posts_campaigns: {
				Row: {
					company_id: string;
					created_at: string;
					end_date: string | null;
					id: string;
					is_integration_enabled: boolean;
					job_post_id: string;
					start_date: string;
					status: Database["public"]["Enums"]["job_post_campaign_status_enum"];
					updated_at: string;
				};
				Insert: {
					company_id: string;
					created_at?: string;
					end_date?: string | null;
					id?: string;
					is_integration_enabled?: boolean;
					job_post_id: string;
					start_date: string;
					status?: Database["public"]["Enums"]["job_post_campaign_status_enum"];
					updated_at?: string;
				};
				Update: {
					company_id?: string;
					created_at?: string;
					end_date?: string | null;
					id?: string;
					is_integration_enabled?: boolean;
					job_post_id?: string;
					start_date?: string;
					status?: Database["public"]["Enums"]["job_post_campaign_status_enum"];
					updated_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: "job_posts_campaigns_company_id_fkey";
						columns: ["company_id"];
						isOneToOne: false;
						referencedRelation: "companies";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "job_posts_campaigns_job_post_id_fkey";
						columns: ["job_post_id"];
						isOneToOne: false;
						referencedRelation: "job_posts";
						referencedColumns: ["id"];
					},
				];
			};
			reject_reasons: {
				Row: {
					application_id: string;
					company_id: string;
					content: string;
					created_at: string;
					id: string;
					updated_at: string;
				};
				Insert: {
					application_id: string;
					company_id: string;
					content: string;
					created_at?: string;
					id?: string;
					updated_at?: string;
				};
				Update: {
					application_id?: string;
					company_id?: string;
					content?: string;
					created_at?: string;
					id?: string;
					updated_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: "reject_reasons_application_id_fkey";
						columns: ["application_id"];
						isOneToOne: false;
						referencedRelation: "applications";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "reject_reasons_company_id_fkey";
						columns: ["company_id"];
						isOneToOne: false;
						referencedRelation: "companies";
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
			application_status_enum:
				| "applied"
				| "interviewing"
				| "hired"
				| "rejected"
				| "archived";
			attachment_type_enum:
				| "resume"
				| "cover_letter"
				| "portfolio"
				| "certificate"
				| "reference_letter"
				| "other"
				| "transcript"
				| "work_sample"
				| "professional_license";
			domain_verification_status_enum: "pending" | "verified" | "failed";
			employment_type_enum:
				| "full_time"
				| "part_time"
				| "contract"
				| "internship";
			experience_level_enum: "junior" | "mid" | "senior" | "lead" | "executive";
			job_post_campaign_status_enum:
				| "running"
				| "paused"
				| "completed"
				| "scheduled";
			job_post_status_enum: "draft" | "archived" | "published";
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
			application_status_enum: [
				"applied",
				"interviewing",
				"hired",
				"rejected",
				"archived",
			],
			attachment_type_enum: [
				"resume",
				"cover_letter",
				"portfolio",
				"certificate",
				"reference_letter",
				"other",
				"transcript",
				"work_sample",
				"professional_license",
			],
			domain_verification_status_enum: ["pending", "verified", "failed"],
			employment_type_enum: [
				"full_time",
				"part_time",
				"contract",
				"internship",
			],
			experience_level_enum: ["junior", "mid", "senior", "lead", "executive"],
			job_post_campaign_status_enum: [
				"running",
				"paused",
				"completed",
				"scheduled",
			],
			job_post_status_enum: ["draft", "archived", "published"],
			work_mode_enum: ["remote", "hybrid", "on_site"],
		},
	},
} as const;
