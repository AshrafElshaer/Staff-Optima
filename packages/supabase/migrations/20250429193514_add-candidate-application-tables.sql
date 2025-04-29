create type "public"."application_status_enum" as enum ('applied', 'interviewing', 'hired', 'rejected', 'archived');

create type "public"."attachment_type_enum" as enum ('resume', 'cover_letter', 'portfolio', 'certificate', 'reference_letter', 'other', 'transcript', 'work_sample', 'professional_license');

create table "public"."applications" (
    "id" uuid not null default gen_random_uuid(),
    "job_id" uuid,
    "company_id" uuid not null,
    "department_id" uuid,
    "candidate_id" uuid not null,
    "stage_id" uuid,
    "status" application_status_enum not null default 'applied'::application_status_enum,
    "source" text,
    "screening_question_answers" jsonb,
    "candidate_match" numeric not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "reject_reason_id" uuid
);


create table "public"."attachments" (
    "id" uuid not null default gen_random_uuid(),
    "candidate_id" uuid not null,
    "company_id" uuid not null,
    "application_id" uuid,
    "file_name" text not null,
    "file_url" text not null,
    "file_path" text not null,
    "file_size" bigint not null,
    "attachment_type" attachment_type_enum default 'resume'::attachment_type_enum,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
);


create table "public"."candidate_educations" (
    "id" uuid not null default gen_random_uuid(),
    "candidate_id" uuid not null,
    "company_id" uuid not null,
    "institution" text not null,
    "degree" text,
    "field_of_study" text,
    "start_date" date,
    "end_date" date,
    "grade" text
);


alter table "public"."candidate_educations" enable row level security;

create table "public"."candidate_experiences" (
    "id" uuid not null default gen_random_uuid(),
    "candidate_id" uuid not null,
    "company_id" uuid not null,
    "job_title" text not null,
    "company" text not null,
    "start_date" date,
    "end_date" date,
    "location" text,
    "description" text
);


alter table "public"."candidate_experiences" enable row level security;

create table "public"."candidate_social_links" (
    "id" uuid not null default gen_random_uuid(),
    "candidate_id" uuid not null,
    "company_id" uuid not null,
    "platform" text not null,
    "url" text not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
);


alter table "public"."candidate_social_links" enable row level security;

create table "public"."candidates" (
    "id" uuid not null default gen_random_uuid(),
    "company_id" uuid not null,
    "avatar_url" text,
    "first_name" text not null,
    "last_name" text not null,
    "email" text not null,
    "phone_number" text,
    "timezone" text not null,
    "country" text not null,
    "city" text not null,
    "gender" text not null,
    "date_of_birth" date not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
);


alter table "public"."candidates" enable row level security;

create table "public"."reject_reasons" (
    "id" uuid not null default gen_random_uuid(),
    "content" text not null,
    "company_id" uuid not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "application_id" uuid not null
);


CREATE UNIQUE INDEX applications_pkey ON public.applications USING btree (id);

CREATE UNIQUE INDEX attachments_pkey ON public.attachments USING btree (id);

CREATE UNIQUE INDEX candidate_educations_pkey ON public.candidate_educations USING btree (id);

CREATE UNIQUE INDEX candidate_experiences_pkey ON public.candidate_experiences USING btree (id);

CREATE UNIQUE INDEX candidate_social_links_candidate_id_platform_key ON public.candidate_social_links USING btree (candidate_id, platform);

CREATE UNIQUE INDEX candidate_social_links_pkey ON public.candidate_social_links USING btree (id);

CREATE UNIQUE INDEX candidates_pkey ON public.candidates USING btree (id);

CREATE INDEX idx_applications_candidate_id ON public.applications USING btree (candidate_id);

CREATE INDEX idx_applications_company_id ON public.applications USING btree (company_id);

CREATE INDEX idx_applications_job_id ON public.applications USING btree (job_id);

CREATE INDEX idx_attachments_candidate_id ON public.attachments USING btree (candidate_id);

CREATE INDEX idx_candidate_educations_candidate_id ON public.candidate_educations USING btree (candidate_id);

CREATE INDEX idx_candidate_experiences_candidate_id ON public.candidate_experiences USING btree (candidate_id);

CREATE INDEX idx_candidate_social_links_candidate_id ON public.candidate_social_links USING btree (candidate_id);

CREATE INDEX idx_candidates_company ON public.candidates USING btree (company_id);

CREATE INDEX idx_candidates_email ON public.candidates USING btree (email);

CREATE INDEX idx_rejection_application_id ON public.reject_reasons USING btree (application_id);

CREATE INDEX idx_rejection_id ON public.reject_reasons USING btree (id);

CREATE UNIQUE INDEX reject_reasons_pkey ON public.reject_reasons USING btree (id);

alter table "public"."applications" add constraint "applications_pkey" PRIMARY KEY using index "applications_pkey";

alter table "public"."attachments" add constraint "attachments_pkey" PRIMARY KEY using index "attachments_pkey";

alter table "public"."candidate_educations" add constraint "candidate_educations_pkey" PRIMARY KEY using index "candidate_educations_pkey";

alter table "public"."candidate_experiences" add constraint "candidate_experiences_pkey" PRIMARY KEY using index "candidate_experiences_pkey";

alter table "public"."candidate_social_links" add constraint "candidate_social_links_pkey" PRIMARY KEY using index "candidate_social_links_pkey";

alter table "public"."candidates" add constraint "candidates_pkey" PRIMARY KEY using index "candidates_pkey";

alter table "public"."reject_reasons" add constraint "reject_reasons_pkey" PRIMARY KEY using index "reject_reasons_pkey";

alter table "public"."applications" add constraint "applications_candidate_id_fkey" FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE not valid;

alter table "public"."applications" validate constraint "applications_candidate_id_fkey";

alter table "public"."applications" add constraint "applications_company_id_fkey" FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE not valid;

alter table "public"."applications" validate constraint "applications_company_id_fkey";

alter table "public"."applications" add constraint "applications_department_id_fkey" FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL not valid;

alter table "public"."applications" validate constraint "applications_department_id_fkey";

alter table "public"."applications" add constraint "applications_job_id_fkey" FOREIGN KEY (job_id) REFERENCES job_posts(id) ON DELETE CASCADE not valid;

alter table "public"."applications" validate constraint "applications_job_id_fkey";

alter table "public"."applications" add constraint "applications_reject_reason_id_fkey" FOREIGN KEY (reject_reason_id) REFERENCES reject_reasons(id) ON DELETE SET NULL not valid;

alter table "public"."applications" validate constraint "applications_reject_reason_id_fkey";

alter table "public"."applications" add constraint "applications_stage_id_fkey" FOREIGN KEY (stage_id) REFERENCES application_stages(id) ON DELETE SET NULL not valid;

alter table "public"."applications" validate constraint "applications_stage_id_fkey";

alter table "public"."attachments" add constraint "attachments_application_id_fkey" FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE not valid;

alter table "public"."attachments" validate constraint "attachments_application_id_fkey";

alter table "public"."attachments" add constraint "attachments_candidate_id_fkey" FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE not valid;

alter table "public"."attachments" validate constraint "attachments_candidate_id_fkey";

alter table "public"."attachments" add constraint "attachments_company_id_fkey" FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE not valid;

alter table "public"."attachments" validate constraint "attachments_company_id_fkey";

alter table "public"."attachments" add constraint "attachments_file_size_check" CHECK ((file_size > 0)) not valid;

alter table "public"."attachments" validate constraint "attachments_file_size_check";

alter table "public"."candidate_educations" add constraint "candidate_educations_candidate_id_fkey" FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE not valid;

alter table "public"."candidate_educations" validate constraint "candidate_educations_candidate_id_fkey";

alter table "public"."candidate_educations" add constraint "candidate_educations_company_id_fkey" FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE not valid;

alter table "public"."candidate_educations" validate constraint "candidate_educations_company_id_fkey";

alter table "public"."candidate_experiences" add constraint "candidate_experiences_candidate_id_fkey" FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE not valid;

alter table "public"."candidate_experiences" validate constraint "candidate_experiences_candidate_id_fkey";

alter table "public"."candidate_experiences" add constraint "candidate_experiences_company_id_fkey" FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE not valid;

alter table "public"."candidate_experiences" validate constraint "candidate_experiences_company_id_fkey";

alter table "public"."candidate_social_links" add constraint "candidate_social_links_candidate_id_fkey" FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE not valid;

alter table "public"."candidate_social_links" validate constraint "candidate_social_links_candidate_id_fkey";

alter table "public"."candidate_social_links" add constraint "candidate_social_links_candidate_id_platform_key" UNIQUE using index "candidate_social_links_candidate_id_platform_key";

alter table "public"."candidate_social_links" add constraint "candidate_social_links_company_id_fkey" FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE not valid;

alter table "public"."candidate_social_links" validate constraint "candidate_social_links_company_id_fkey";

alter table "public"."candidates" add constraint "candidates_company_id_fkey" FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE not valid;

alter table "public"."candidates" validate constraint "candidates_company_id_fkey";

alter table "public"."reject_reasons" add constraint "reject_reasons_application_id_fkey" FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE not valid;

alter table "public"."reject_reasons" validate constraint "reject_reasons_application_id_fkey";

alter table "public"."reject_reasons" add constraint "reject_reasons_company_id_fkey" FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE not valid;

alter table "public"."reject_reasons" validate constraint "reject_reasons_company_id_fkey";

grant delete on table "public"."applications" to "anon";

grant insert on table "public"."applications" to "anon";

grant references on table "public"."applications" to "anon";

grant select on table "public"."applications" to "anon";

grant trigger on table "public"."applications" to "anon";

grant truncate on table "public"."applications" to "anon";

grant update on table "public"."applications" to "anon";

grant delete on table "public"."applications" to "authenticated";

grant insert on table "public"."applications" to "authenticated";

grant references on table "public"."applications" to "authenticated";

grant select on table "public"."applications" to "authenticated";

grant trigger on table "public"."applications" to "authenticated";

grant truncate on table "public"."applications" to "authenticated";

grant update on table "public"."applications" to "authenticated";

grant delete on table "public"."applications" to "service_role";

grant insert on table "public"."applications" to "service_role";

grant references on table "public"."applications" to "service_role";

grant select on table "public"."applications" to "service_role";

grant trigger on table "public"."applications" to "service_role";

grant truncate on table "public"."applications" to "service_role";

grant update on table "public"."applications" to "service_role";

grant delete on table "public"."attachments" to "anon";

grant insert on table "public"."attachments" to "anon";

grant references on table "public"."attachments" to "anon";

grant select on table "public"."attachments" to "anon";

grant trigger on table "public"."attachments" to "anon";

grant truncate on table "public"."attachments" to "anon";

grant update on table "public"."attachments" to "anon";

grant delete on table "public"."attachments" to "authenticated";

grant insert on table "public"."attachments" to "authenticated";

grant references on table "public"."attachments" to "authenticated";

grant select on table "public"."attachments" to "authenticated";

grant trigger on table "public"."attachments" to "authenticated";

grant truncate on table "public"."attachments" to "authenticated";

grant update on table "public"."attachments" to "authenticated";

grant delete on table "public"."attachments" to "service_role";

grant insert on table "public"."attachments" to "service_role";

grant references on table "public"."attachments" to "service_role";

grant select on table "public"."attachments" to "service_role";

grant trigger on table "public"."attachments" to "service_role";

grant truncate on table "public"."attachments" to "service_role";

grant update on table "public"."attachments" to "service_role";

grant delete on table "public"."candidate_educations" to "anon";

grant insert on table "public"."candidate_educations" to "anon";

grant references on table "public"."candidate_educations" to "anon";

grant select on table "public"."candidate_educations" to "anon";

grant trigger on table "public"."candidate_educations" to "anon";

grant truncate on table "public"."candidate_educations" to "anon";

grant update on table "public"."candidate_educations" to "anon";

grant delete on table "public"."candidate_educations" to "authenticated";

grant insert on table "public"."candidate_educations" to "authenticated";

grant references on table "public"."candidate_educations" to "authenticated";

grant select on table "public"."candidate_educations" to "authenticated";

grant trigger on table "public"."candidate_educations" to "authenticated";

grant truncate on table "public"."candidate_educations" to "authenticated";

grant update on table "public"."candidate_educations" to "authenticated";

grant delete on table "public"."candidate_educations" to "service_role";

grant insert on table "public"."candidate_educations" to "service_role";

grant references on table "public"."candidate_educations" to "service_role";

grant select on table "public"."candidate_educations" to "service_role";

grant trigger on table "public"."candidate_educations" to "service_role";

grant truncate on table "public"."candidate_educations" to "service_role";

grant update on table "public"."candidate_educations" to "service_role";

grant delete on table "public"."candidate_experiences" to "anon";

grant insert on table "public"."candidate_experiences" to "anon";

grant references on table "public"."candidate_experiences" to "anon";

grant select on table "public"."candidate_experiences" to "anon";

grant trigger on table "public"."candidate_experiences" to "anon";

grant truncate on table "public"."candidate_experiences" to "anon";

grant update on table "public"."candidate_experiences" to "anon";

grant delete on table "public"."candidate_experiences" to "authenticated";

grant insert on table "public"."candidate_experiences" to "authenticated";

grant references on table "public"."candidate_experiences" to "authenticated";

grant select on table "public"."candidate_experiences" to "authenticated";

grant trigger on table "public"."candidate_experiences" to "authenticated";

grant truncate on table "public"."candidate_experiences" to "authenticated";

grant update on table "public"."candidate_experiences" to "authenticated";

grant delete on table "public"."candidate_experiences" to "service_role";

grant insert on table "public"."candidate_experiences" to "service_role";

grant references on table "public"."candidate_experiences" to "service_role";

grant select on table "public"."candidate_experiences" to "service_role";

grant trigger on table "public"."candidate_experiences" to "service_role";

grant truncate on table "public"."candidate_experiences" to "service_role";

grant update on table "public"."candidate_experiences" to "service_role";

grant delete on table "public"."candidate_social_links" to "anon";

grant insert on table "public"."candidate_social_links" to "anon";

grant references on table "public"."candidate_social_links" to "anon";

grant select on table "public"."candidate_social_links" to "anon";

grant trigger on table "public"."candidate_social_links" to "anon";

grant truncate on table "public"."candidate_social_links" to "anon";

grant update on table "public"."candidate_social_links" to "anon";

grant delete on table "public"."candidate_social_links" to "authenticated";

grant insert on table "public"."candidate_social_links" to "authenticated";

grant references on table "public"."candidate_social_links" to "authenticated";

grant select on table "public"."candidate_social_links" to "authenticated";

grant trigger on table "public"."candidate_social_links" to "authenticated";

grant truncate on table "public"."candidate_social_links" to "authenticated";

grant update on table "public"."candidate_social_links" to "authenticated";

grant delete on table "public"."candidate_social_links" to "service_role";

grant insert on table "public"."candidate_social_links" to "service_role";

grant references on table "public"."candidate_social_links" to "service_role";

grant select on table "public"."candidate_social_links" to "service_role";

grant trigger on table "public"."candidate_social_links" to "service_role";

grant truncate on table "public"."candidate_social_links" to "service_role";

grant update on table "public"."candidate_social_links" to "service_role";

grant delete on table "public"."candidates" to "anon";

grant insert on table "public"."candidates" to "anon";

grant references on table "public"."candidates" to "anon";

grant select on table "public"."candidates" to "anon";

grant trigger on table "public"."candidates" to "anon";

grant truncate on table "public"."candidates" to "anon";

grant update on table "public"."candidates" to "anon";

grant delete on table "public"."candidates" to "authenticated";

grant insert on table "public"."candidates" to "authenticated";

grant references on table "public"."candidates" to "authenticated";

grant select on table "public"."candidates" to "authenticated";

grant trigger on table "public"."candidates" to "authenticated";

grant truncate on table "public"."candidates" to "authenticated";

grant update on table "public"."candidates" to "authenticated";

grant delete on table "public"."candidates" to "service_role";

grant insert on table "public"."candidates" to "service_role";

grant references on table "public"."candidates" to "service_role";

grant select on table "public"."candidates" to "service_role";

grant trigger on table "public"."candidates" to "service_role";

grant truncate on table "public"."candidates" to "service_role";

grant update on table "public"."candidates" to "service_role";

grant delete on table "public"."reject_reasons" to "anon";

grant insert on table "public"."reject_reasons" to "anon";

grant references on table "public"."reject_reasons" to "anon";

grant select on table "public"."reject_reasons" to "anon";

grant trigger on table "public"."reject_reasons" to "anon";

grant truncate on table "public"."reject_reasons" to "anon";

grant update on table "public"."reject_reasons" to "anon";

grant delete on table "public"."reject_reasons" to "authenticated";

grant insert on table "public"."reject_reasons" to "authenticated";

grant references on table "public"."reject_reasons" to "authenticated";

grant select on table "public"."reject_reasons" to "authenticated";

grant trigger on table "public"."reject_reasons" to "authenticated";

grant truncate on table "public"."reject_reasons" to "authenticated";

grant update on table "public"."reject_reasons" to "authenticated";

grant delete on table "public"."reject_reasons" to "service_role";

grant insert on table "public"."reject_reasons" to "service_role";

grant references on table "public"."reject_reasons" to "service_role";

grant select on table "public"."reject_reasons" to "service_role";

grant trigger on table "public"."reject_reasons" to "service_role";

grant truncate on table "public"."reject_reasons" to "service_role";

grant update on table "public"."reject_reasons" to "service_role";

create policy "Company Admin Can Delete Candidate Educations"
on "public"."candidate_educations"
as permissive
for delete
to public
using ((is_user_company_admin(company_id) OR has_permission('candidate:delete'::text)));


create policy "Company Members Can Read Candidate Educations"
on "public"."candidate_educations"
as permissive
for select
to public
using (is_user_company_member(company_id));


create policy "Company Members Can Update Candidate Educations"
on "public"."candidate_educations"
as permissive
for update
to public
using ((is_user_company_member(company_id) OR has_permission('candidate:update'::text)));


create policy "Public Can Create Candidate Educations"
on "public"."candidate_educations"
as permissive
for insert
to public
with check (true);


create policy "Company Admin Can Delete Candidate Experiences"
on "public"."candidate_experiences"
as permissive
for delete
to public
using ((is_user_company_admin(company_id) OR has_permission('candidate:delete'::text)));


create policy "Company Members Can Read Candidate Experiences"
on "public"."candidate_experiences"
as permissive
for select
to public
using (is_user_company_member(company_id));


create policy "Company Members Can Update Candidate Experiences"
on "public"."candidate_experiences"
as permissive
for update
to public
using ((is_user_company_member(company_id) OR has_permission('candidate:update'::text)));


create policy "Public Can Create Candidate Experiences"
on "public"."candidate_experiences"
as permissive
for insert
to public
with check (true);


create policy "Company Admin Can Delete Candidates"
on "public"."candidate_social_links"
as permissive
for delete
to public
using ((is_user_company_admin(company_id) OR has_permission('candidate:delete'::text)));


create policy "Company Members Can Read Candidates"
on "public"."candidate_social_links"
as permissive
for select
to public
using (is_user_company_member(company_id));


create policy "Company Members Can Update Candidates"
on "public"."candidate_social_links"
as permissive
for update
to public
using ((is_user_company_member(company_id) OR has_permission('candidate:update'::text)));


create policy "Public Can Create Candidates"
on "public"."candidate_social_links"
as permissive
for insert
to public
with check (true);


create policy "Company Admin Can Delete Candidates"
on "public"."candidates"
as permissive
for delete
to public
using ((is_user_company_admin(company_id) OR has_permission('candidate:delete'::text)));


create policy "Company Members Can Read Candidates"
on "public"."candidates"
as permissive
for select
to public
using (is_user_company_member(company_id));


create policy "Company Members Can Update Candidates"
on "public"."candidates"
as permissive
for update
to public
using ((is_user_company_member(company_id) OR has_permission('candidate:update'::text)));


create policy "Public Can Create Candidates"
on "public"."candidates"
as permissive
for insert
to public
with check (true);



