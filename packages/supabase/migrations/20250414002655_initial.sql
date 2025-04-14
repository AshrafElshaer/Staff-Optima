create type "public"."domain_verification_status_enum" as enum ('pending', 'verified', 'failed');

create table "public"."companies" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "logo" text,
    "domain" text not null,
    "is_domain_verified" boolean not null default false,
    "admin_id" uuid,
    "industry" text not null,
    "profile" text,
    "address_1" text,
    "address_2" text,
    "city" text,
    "state" text,
    "zip_code" text,
    "country" text not null,
    "timezone" text not null,
    "tax_id" text,
    "employee_count" text,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."companies" enable row level security;

create table "public"."company_members" (
    "company_id" uuid not null,
    "user_id" uuid not null,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."company_members" enable row level security;

create table "public"."departments" (
    "id" uuid not null default gen_random_uuid(),
    "company_id" uuid not null,
    "name" text not null,
    "description" text,
    "head_user_id" uuid,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."departments" enable row level security;

create table "public"."domain_verification" (
    "id" uuid not null default gen_random_uuid(),
    "company_id" uuid not null,
    "domain" text not null,
    "verification_token" text not null,
    "verification_status" domain_verification_status_enum not null default 'pending'::domain_verification_status_enum,
    "verification_date" timestamp with time zone,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."domain_verification" enable row level security;

create table "public"."roles" (
    "id" uuid not null default gen_random_uuid(),
    "company_id" uuid not null,
    "name" text not null,
    "permissions" text[] not null,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."roles" enable row level security;

create table "public"."user_preferences" (
    "user_id" uuid not null,
    "timezone" text not null,
    "date_format" text not null default 'MM/DD/YYYY'::text,
    "reminder_period" integer not null default 30,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
);


alter table "public"."user_preferences" enable row level security;

create table "public"."user_roles" (
    "user_id" uuid not null,
    "role_id" uuid not null,
    "company_id" uuid not null,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."user_roles" enable row level security;

create table "public"."users" (
    "id" uuid not null,
    "email" text not null,
    "first_name" text not null,
    "last_name" text not null,
    "image" text,
    "phone_number" text not null,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."users" enable row level security;

create table "public"."waitlist" (
    "email" text not null,
    "name" text not null,
    "is_granted" boolean default false,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."waitlist" enable row level security;

CREATE UNIQUE INDEX companies_domain_key ON public.companies USING btree (domain);

CREATE UNIQUE INDEX companies_pkey ON public.companies USING btree (id);

CREATE UNIQUE INDEX departments_pkey ON public.departments USING btree (id);

CREATE UNIQUE INDEX domain_verification_pkey ON public.domain_verification USING btree (id);

CREATE INDEX idx_companies_domain ON public.companies USING btree (domain);

CREATE INDEX idx_companies_id ON public.companies USING btree (id);

CREATE INDEX idx_company_members_org ON public.company_members USING btree (company_id);

CREATE INDEX idx_company_members_user ON public.company_members USING btree (user_id);

CREATE INDEX idx_departments_company ON public.departments USING btree (company_id);

CREATE INDEX idx_perfer_user_id ON public.user_preferences USING btree (user_id);

CREATE INDEX idx_roles_company ON public.roles USING btree (company_id);

CREATE INDEX idx_user_roles_role ON public.user_roles USING btree (role_id);

CREATE INDEX idx_user_roles_user ON public.user_roles USING btree (user_id);

CREATE INDEX idx_users_email ON public.users USING btree (email);

CREATE INDEX idx_users_id ON public.users USING btree (id);

CREATE UNIQUE INDEX roles_pkey ON public.roles USING btree (id);

CREATE UNIQUE INDEX user_preferences_pkey ON public.user_preferences USING btree (user_id);

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);

CREATE UNIQUE INDEX users_pkey ON public.users USING btree (id);

CREATE UNIQUE INDEX waitlist_pkey ON public.waitlist USING btree (email);

alter table "public"."companies" add constraint "companies_pkey" PRIMARY KEY using index "companies_pkey";

alter table "public"."departments" add constraint "departments_pkey" PRIMARY KEY using index "departments_pkey";

alter table "public"."domain_verification" add constraint "domain_verification_pkey" PRIMARY KEY using index "domain_verification_pkey";

alter table "public"."roles" add constraint "roles_pkey" PRIMARY KEY using index "roles_pkey";

alter table "public"."user_preferences" add constraint "user_preferences_pkey" PRIMARY KEY using index "user_preferences_pkey";

alter table "public"."users" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";

alter table "public"."waitlist" add constraint "waitlist_pkey" PRIMARY KEY using index "waitlist_pkey";

alter table "public"."companies" add constraint "companies_admin_id_fkey" FOREIGN KEY (admin_id) REFERENCES users(id) ON DELETE SET NULL not valid;

alter table "public"."companies" validate constraint "companies_admin_id_fkey";

alter table "public"."companies" add constraint "companies_domain_key" UNIQUE using index "companies_domain_key";

alter table "public"."company_members" add constraint "company_members_company_id_fkey" FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE not valid;

alter table "public"."company_members" validate constraint "company_members_company_id_fkey";

alter table "public"."company_members" add constraint "company_members_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."company_members" validate constraint "company_members_user_id_fkey";

alter table "public"."departments" add constraint "departments_company_id_fkey" FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE not valid;

alter table "public"."departments" validate constraint "departments_company_id_fkey";

alter table "public"."departments" add constraint "departments_head_user_id_fkey" FOREIGN KEY (head_user_id) REFERENCES users(id) ON DELETE SET NULL not valid;

alter table "public"."departments" validate constraint "departments_head_user_id_fkey";

alter table "public"."domain_verification" add constraint "domain_verification_company_id_fkey" FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE not valid;

alter table "public"."domain_verification" validate constraint "domain_verification_company_id_fkey";

alter table "public"."roles" add constraint "roles_company_id_fkey" FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE not valid;

alter table "public"."roles" validate constraint "roles_company_id_fkey";

alter table "public"."user_preferences" add constraint "user_preferences_reminder_period_check" CHECK (((reminder_period >= 0) AND (reminder_period <= 1440))) not valid;

alter table "public"."user_preferences" validate constraint "user_preferences_reminder_period_check";

alter table "public"."user_preferences" add constraint "user_preferences_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."user_preferences" validate constraint "user_preferences_user_id_fkey";

alter table "public"."user_roles" add constraint "user_roles_company_id_fkey" FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE not valid;

alter table "public"."user_roles" validate constraint "user_roles_company_id_fkey";

alter table "public"."user_roles" add constraint "user_roles_role_id_fkey" FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE not valid;

alter table "public"."user_roles" validate constraint "user_roles_role_id_fkey";

alter table "public"."user_roles" add constraint "user_roles_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."user_roles" validate constraint "user_roles_user_id_fkey";

alter table "public"."users" add constraint "users_email_key" UNIQUE using index "users_email_key";

alter table "public"."users" add constraint "users_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."users" validate constraint "users_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_user_company_id()
 RETURNS uuid
 LANGUAGE sql
 STABLE
 SET search_path TO 'public'
AS $function$
    select company_id from company_members where user_id = auth.uid();
$function$
;

CREATE OR REPLACE FUNCTION public.has_permission(permission text)
 RETURNS boolean
 LANGUAGE sql
 STABLE
 SET search_path TO 'public'
AS $function$
    select exists (
        select 1 
        from user_roles ur
        join roles r on r.id = ur.role_id
        where ur.user_id = auth.uid()
        and r.permissions @> array[permission]
        and r.company_id = get_user_company_id()
    );
$function$
;

CREATE OR REPLACE FUNCTION public.is_user_company_admin(company_id uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE
 SET search_path TO 'public'
AS $function$
    select admin_id = auth.uid() from companies where id = company_id;
$function$
;

CREATE OR REPLACE FUNCTION public.is_user_company_member(company_id uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE
 SET search_path TO 'public'
AS $function$
    select exists (select 1 from company_members where user_id = auth.uid() and company_id = company_id);
$function$
;

grant delete on table "public"."companies" to "anon";

grant insert on table "public"."companies" to "anon";

grant references on table "public"."companies" to "anon";

grant select on table "public"."companies" to "anon";

grant trigger on table "public"."companies" to "anon";

grant truncate on table "public"."companies" to "anon";

grant update on table "public"."companies" to "anon";

grant delete on table "public"."companies" to "authenticated";

grant insert on table "public"."companies" to "authenticated";

grant references on table "public"."companies" to "authenticated";

grant select on table "public"."companies" to "authenticated";

grant trigger on table "public"."companies" to "authenticated";

grant truncate on table "public"."companies" to "authenticated";

grant update on table "public"."companies" to "authenticated";

grant delete on table "public"."companies" to "service_role";

grant insert on table "public"."companies" to "service_role";

grant references on table "public"."companies" to "service_role";

grant select on table "public"."companies" to "service_role";

grant trigger on table "public"."companies" to "service_role";

grant truncate on table "public"."companies" to "service_role";

grant update on table "public"."companies" to "service_role";

grant delete on table "public"."company_members" to "anon";

grant insert on table "public"."company_members" to "anon";

grant references on table "public"."company_members" to "anon";

grant select on table "public"."company_members" to "anon";

grant trigger on table "public"."company_members" to "anon";

grant truncate on table "public"."company_members" to "anon";

grant update on table "public"."company_members" to "anon";

grant delete on table "public"."company_members" to "authenticated";

grant insert on table "public"."company_members" to "authenticated";

grant references on table "public"."company_members" to "authenticated";

grant select on table "public"."company_members" to "authenticated";

grant trigger on table "public"."company_members" to "authenticated";

grant truncate on table "public"."company_members" to "authenticated";

grant update on table "public"."company_members" to "authenticated";

grant delete on table "public"."company_members" to "service_role";

grant insert on table "public"."company_members" to "service_role";

grant references on table "public"."company_members" to "service_role";

grant select on table "public"."company_members" to "service_role";

grant trigger on table "public"."company_members" to "service_role";

grant truncate on table "public"."company_members" to "service_role";

grant update on table "public"."company_members" to "service_role";

grant delete on table "public"."departments" to "anon";

grant insert on table "public"."departments" to "anon";

grant references on table "public"."departments" to "anon";

grant select on table "public"."departments" to "anon";

grant trigger on table "public"."departments" to "anon";

grant truncate on table "public"."departments" to "anon";

grant update on table "public"."departments" to "anon";

grant delete on table "public"."departments" to "authenticated";

grant insert on table "public"."departments" to "authenticated";

grant references on table "public"."departments" to "authenticated";

grant select on table "public"."departments" to "authenticated";

grant trigger on table "public"."departments" to "authenticated";

grant truncate on table "public"."departments" to "authenticated";

grant update on table "public"."departments" to "authenticated";

grant delete on table "public"."departments" to "service_role";

grant insert on table "public"."departments" to "service_role";

grant references on table "public"."departments" to "service_role";

grant select on table "public"."departments" to "service_role";

grant trigger on table "public"."departments" to "service_role";

grant truncate on table "public"."departments" to "service_role";

grant update on table "public"."departments" to "service_role";

grant delete on table "public"."domain_verification" to "anon";

grant insert on table "public"."domain_verification" to "anon";

grant references on table "public"."domain_verification" to "anon";

grant select on table "public"."domain_verification" to "anon";

grant trigger on table "public"."domain_verification" to "anon";

grant truncate on table "public"."domain_verification" to "anon";

grant update on table "public"."domain_verification" to "anon";

grant delete on table "public"."domain_verification" to "authenticated";

grant insert on table "public"."domain_verification" to "authenticated";

grant references on table "public"."domain_verification" to "authenticated";

grant select on table "public"."domain_verification" to "authenticated";

grant trigger on table "public"."domain_verification" to "authenticated";

grant truncate on table "public"."domain_verification" to "authenticated";

grant update on table "public"."domain_verification" to "authenticated";

grant delete on table "public"."domain_verification" to "service_role";

grant insert on table "public"."domain_verification" to "service_role";

grant references on table "public"."domain_verification" to "service_role";

grant select on table "public"."domain_verification" to "service_role";

grant trigger on table "public"."domain_verification" to "service_role";

grant truncate on table "public"."domain_verification" to "service_role";

grant update on table "public"."domain_verification" to "service_role";

grant delete on table "public"."roles" to "anon";

grant insert on table "public"."roles" to "anon";

grant references on table "public"."roles" to "anon";

grant select on table "public"."roles" to "anon";

grant trigger on table "public"."roles" to "anon";

grant truncate on table "public"."roles" to "anon";

grant update on table "public"."roles" to "anon";

grant delete on table "public"."roles" to "authenticated";

grant insert on table "public"."roles" to "authenticated";

grant references on table "public"."roles" to "authenticated";

grant select on table "public"."roles" to "authenticated";

grant trigger on table "public"."roles" to "authenticated";

grant truncate on table "public"."roles" to "authenticated";

grant update on table "public"."roles" to "authenticated";

grant delete on table "public"."roles" to "service_role";

grant insert on table "public"."roles" to "service_role";

grant references on table "public"."roles" to "service_role";

grant select on table "public"."roles" to "service_role";

grant trigger on table "public"."roles" to "service_role";

grant truncate on table "public"."roles" to "service_role";

grant update on table "public"."roles" to "service_role";

grant delete on table "public"."user_preferences" to "anon";

grant insert on table "public"."user_preferences" to "anon";

grant references on table "public"."user_preferences" to "anon";

grant select on table "public"."user_preferences" to "anon";

grant trigger on table "public"."user_preferences" to "anon";

grant truncate on table "public"."user_preferences" to "anon";

grant update on table "public"."user_preferences" to "anon";

grant delete on table "public"."user_preferences" to "authenticated";

grant insert on table "public"."user_preferences" to "authenticated";

grant references on table "public"."user_preferences" to "authenticated";

grant select on table "public"."user_preferences" to "authenticated";

grant trigger on table "public"."user_preferences" to "authenticated";

grant truncate on table "public"."user_preferences" to "authenticated";

grant update on table "public"."user_preferences" to "authenticated";

grant delete on table "public"."user_preferences" to "service_role";

grant insert on table "public"."user_preferences" to "service_role";

grant references on table "public"."user_preferences" to "service_role";

grant select on table "public"."user_preferences" to "service_role";

grant trigger on table "public"."user_preferences" to "service_role";

grant truncate on table "public"."user_preferences" to "service_role";

grant update on table "public"."user_preferences" to "service_role";

grant delete on table "public"."user_roles" to "anon";

grant insert on table "public"."user_roles" to "anon";

grant references on table "public"."user_roles" to "anon";

grant select on table "public"."user_roles" to "anon";

grant trigger on table "public"."user_roles" to "anon";

grant truncate on table "public"."user_roles" to "anon";

grant update on table "public"."user_roles" to "anon";

grant delete on table "public"."user_roles" to "authenticated";

grant insert on table "public"."user_roles" to "authenticated";

grant references on table "public"."user_roles" to "authenticated";

grant select on table "public"."user_roles" to "authenticated";

grant trigger on table "public"."user_roles" to "authenticated";

grant truncate on table "public"."user_roles" to "authenticated";

grant update on table "public"."user_roles" to "authenticated";

grant delete on table "public"."user_roles" to "service_role";

grant insert on table "public"."user_roles" to "service_role";

grant references on table "public"."user_roles" to "service_role";

grant select on table "public"."user_roles" to "service_role";

grant trigger on table "public"."user_roles" to "service_role";

grant truncate on table "public"."user_roles" to "service_role";

grant update on table "public"."user_roles" to "service_role";

grant delete on table "public"."users" to "anon";

grant insert on table "public"."users" to "anon";

grant references on table "public"."users" to "anon";

grant select on table "public"."users" to "anon";

grant trigger on table "public"."users" to "anon";

grant truncate on table "public"."users" to "anon";

grant update on table "public"."users" to "anon";

grant delete on table "public"."users" to "authenticated";

grant insert on table "public"."users" to "authenticated";

grant references on table "public"."users" to "authenticated";

grant select on table "public"."users" to "authenticated";

grant trigger on table "public"."users" to "authenticated";

grant truncate on table "public"."users" to "authenticated";

grant update on table "public"."users" to "authenticated";

grant delete on table "public"."users" to "service_role";

grant insert on table "public"."users" to "service_role";

grant references on table "public"."users" to "service_role";

grant select on table "public"."users" to "service_role";

grant trigger on table "public"."users" to "service_role";

grant truncate on table "public"."users" to "service_role";

grant update on table "public"."users" to "service_role";

grant delete on table "public"."waitlist" to "anon";

grant insert on table "public"."waitlist" to "anon";

grant references on table "public"."waitlist" to "anon";

grant select on table "public"."waitlist" to "anon";

grant trigger on table "public"."waitlist" to "anon";

grant truncate on table "public"."waitlist" to "anon";

grant update on table "public"."waitlist" to "anon";

grant delete on table "public"."waitlist" to "authenticated";

grant insert on table "public"."waitlist" to "authenticated";

grant references on table "public"."waitlist" to "authenticated";

grant select on table "public"."waitlist" to "authenticated";

grant trigger on table "public"."waitlist" to "authenticated";

grant truncate on table "public"."waitlist" to "authenticated";

grant update on table "public"."waitlist" to "authenticated";

grant delete on table "public"."waitlist" to "service_role";

grant insert on table "public"."waitlist" to "service_role";

grant references on table "public"."waitlist" to "service_role";

grant select on table "public"."waitlist" to "service_role";

grant trigger on table "public"."waitlist" to "service_role";

grant truncate on table "public"."waitlist" to "service_role";

grant update on table "public"."waitlist" to "service_role";

create policy "Company Admin Can Delete Company"
on "public"."companies"
as permissive
for delete
to public
using ((auth.uid() = admin_id));


create policy "Company Admin or Has Permission Can Update Company"
on "public"."companies"
as permissive
for update
to public
using (((auth.uid() = admin_id) OR has_permission('settings:company'::text)));


create policy "Create Company"
on "public"."companies"
as permissive
for insert
to public
with check ((admin_id = auth.uid()));


create policy "Public Can View Company"
on "public"."companies"
as permissive
for select
to public
using (true);


create policy "Company Admin Can Create Company Member"
on "public"."company_members"
as permissive
for insert
to public
with check ((is_user_company_admin(company_id) OR has_permission('user:add'::text)));


create policy "Company Admin Can Delete Company Member"
on "public"."company_members"
as permissive
for delete
to public
using ((is_user_company_admin(company_id) OR has_permission('user:delete'::text)));


create policy "Company Admin Can Update Company Member"
on "public"."company_members"
as permissive
for update
to public
using ((is_user_company_admin(company_id) OR has_permission('user:update'::text)));


create policy "View Company Member"
on "public"."company_members"
as permissive
for select
to public
using (true);


create policy "Company Admin Can Create Department"
on "public"."departments"
as permissive
for insert
to public
with check ((is_user_company_admin(company_id) OR has_permission('settings:departments'::text)));


create policy "Company Admin Can Delete Department"
on "public"."departments"
as permissive
for delete
to public
using ((is_user_company_admin(company_id) OR has_permission('settings:departments'::text)));


create policy "Company Admin Can Update Department"
on "public"."departments"
as permissive
for update
to public
using ((is_user_company_admin(company_id) OR has_permission('settings:departments'::text)));


create policy "Public can read department"
on "public"."departments"
as permissive
for select
to public
using (true);


create policy "Company Admin Can Create Domain Verification"
on "public"."domain_verification"
as permissive
for insert
to public
with check (is_user_company_admin(company_id));


create policy "Company Admin Can Delete Domain Verification"
on "public"."domain_verification"
as permissive
for delete
to public
using (is_user_company_admin(company_id));


create policy "Company Admin Can Update Domain Verification"
on "public"."domain_verification"
as permissive
for update
to public
using ((is_user_company_admin(company_id) OR has_permission('settings:company'::text)));


create policy "Only Admin Can View Domain Verification"
on "public"."domain_verification"
as permissive
for select
to public
using (is_user_company_admin(company_id));


create policy "Company Admin Can Create Role"
on "public"."roles"
as permissive
for insert
to public
with check ((is_user_company_admin(company_id) OR has_permission('settings:roles'::text)));


create policy "Company Admin Can Delete Role"
on "public"."roles"
as permissive
for delete
to public
using ((is_user_company_admin(company_id) OR has_permission('settings:roles'::text)));


create policy "Company Admin Can Update Role"
on "public"."roles"
as permissive
for update
to public
using ((is_user_company_admin(company_id) OR has_permission('settings:roles'::text)));


create policy "Public can read role"
on "public"."roles"
as permissive
for select
to public
using (true);


create policy "Users can update their own preferences"
on "public"."user_preferences"
as permissive
for update
to public
using ((auth.uid() = user_id));


create policy "Users can view their own preferences"
on "public"."user_preferences"
as permissive
for select
to public
using ((auth.uid() = user_id));


create policy "Users or admins can insert their own preferences"
on "public"."user_preferences"
as permissive
for insert
to public
with check ((auth.uid() = user_id));


create policy "Company Admin Can Create User Role"
on "public"."user_roles"
as permissive
for insert
to public
with check ((is_user_company_admin(company_id) OR has_permission('settings:roles'::text)));


create policy "Company Admin Can Delete User Role"
on "public"."user_roles"
as permissive
for delete
to public
using ((is_user_company_admin(company_id) OR has_permission('settings:roles'::text)));


create policy "Company Admin Can Update User Role"
on "public"."user_roles"
as permissive
for update
to public
using ((is_user_company_admin(company_id) OR has_permission('settings:roles'::text)));


create policy "Public can read user role"
on "public"."user_roles"
as permissive
for select
to public
using (true);


create policy "Admin Can Delete User"
on "public"."users"
as permissive
for delete
to public
using (has_permission('user:delete'::text));


create policy "Admin Or User Can Update User"
on "public"."users"
as permissive
for update
to public
using (((auth.uid() = id) OR has_permission('user:update'::text)));


create policy "Public Can Create User"
on "public"."users"
as permissive
for insert
to public
with check (((auth.uid() = id) OR has_permission('user:add'::text)));


create policy "Public Can View User"
on "public"."users"
as permissive
for select
to public
using (true);


create policy "Public can create waitlist"
on "public"."waitlist"
as permissive
for insert
to public
with check (true);


create policy "Public can delete waitlist"
on "public"."waitlist"
as permissive
for delete
to public
using (true);


create policy "Public can read waitlist"
on "public"."waitlist"
as permissive
for select
to public
using (true);


create policy "Public can update waitlist"
on "public"."waitlist"
as permissive
for update
to public
using (true);



