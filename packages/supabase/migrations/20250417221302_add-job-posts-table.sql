create type "public"."employment_type_enum" as enum ('full_time', 'part_time', 'contract', 'internship');

create type "public"."experience_level_enum" as enum ('junior', 'mid', 'senior', 'lead', 'executive');

create type "public"."job_post_status_enum" as enum ('draft', 'archived');

create type "public"."work_mode_enum" as enum ('remote', 'hybrid', 'on_site');

create table "public"."job_posts" (
    "id" uuid not null default gen_random_uuid(),
    "company_id" uuid not null,
    "created_by" uuid,
    "department_id" uuid,
    "title" text not null,
    "employment_type" employment_type_enum not null,
    "salary_range" text,
    "experience_level" experience_level_enum not null,
    "work_mode" work_mode_enum not null,
    "location" text,
    "status" job_post_status_enum not null default 'draft'::job_post_status_enum,
    "screening_questions" jsonb,
    "required_skills" text[],
    "benefits" text[],
    "job_details" text not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
);


alter table "public"."job_posts" enable row level security;


CREATE INDEX idx_job_posts_company ON public.job_posts USING btree (company_id);

CREATE INDEX idx_job_posts_id ON public.job_posts USING btree (id);

CREATE UNIQUE INDEX job_posts_pkey ON public.job_posts USING btree (id);

alter table "public"."job_posts" add constraint "job_posts_pkey" PRIMARY KEY using index "job_posts_pkey";

alter table "public"."job_posts" add constraint "job_posts_company_id_fkey" FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE not valid;

alter table "public"."job_posts" validate constraint "job_posts_company_id_fkey";

alter table "public"."job_posts" add constraint "job_posts_created_by_fkey" FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL not valid;

alter table "public"."job_posts" validate constraint "job_posts_created_by_fkey";

alter table "public"."job_posts" add constraint "job_posts_department_id_fkey" FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL not valid;

alter table "public"."job_posts" validate constraint "job_posts_department_id_fkey";

grant delete on table "public"."job_posts" to "anon";

grant insert on table "public"."job_posts" to "anon";

grant references on table "public"."job_posts" to "anon";

grant select on table "public"."job_posts" to "anon";

grant trigger on table "public"."job_posts" to "anon";

grant truncate on table "public"."job_posts" to "anon";

grant update on table "public"."job_posts" to "anon";

grant delete on table "public"."job_posts" to "authenticated";

grant insert on table "public"."job_posts" to "authenticated";

grant references on table "public"."job_posts" to "authenticated";

grant select on table "public"."job_posts" to "authenticated";

grant trigger on table "public"."job_posts" to "authenticated";

grant truncate on table "public"."job_posts" to "authenticated";

grant update on table "public"."job_posts" to "authenticated";

grant delete on table "public"."job_posts" to "service_role";

grant insert on table "public"."job_posts" to "service_role";

grant references on table "public"."job_posts" to "service_role";

grant select on table "public"."job_posts" to "service_role";

grant trigger on table "public"."job_posts" to "service_role";

grant truncate on table "public"."job_posts" to "service_role";

grant update on table "public"."job_posts" to "service_role";

create policy "Company Admin Can Create Job Post"
on "public"."job_posts"
as permissive
for insert
to public
with check ((is_user_company_admin(company_id) OR has_permission('job:create'::text)));


create policy "Company Admin Can Delete Job Post"
on "public"."job_posts"
as permissive
for delete
to public
using ((is_user_company_admin(company_id) OR has_permission('job:delete'::text)));


create policy "Company Admin Can Update Job Post"
on "public"."job_posts"
as permissive
for update
to public
using ((is_user_company_admin(company_id) OR has_permission('job:update'::text)));


create policy "Public Can View Job Post"
on "public"."job_posts"
as permissive
for select
to public
using (true);



