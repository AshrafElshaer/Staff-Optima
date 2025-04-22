create type "public"."job_post_campaign_status_enum" as enum ('active', 'paused', 'completed', 'scheduled');

create table "public"."job_posts_campaigns" (
    "id" uuid not null default gen_random_uuid(),
    "company_id" uuid not null,
    "job_post_id" uuid not null,
    "start_date" timestamp with time zone not null,
    "end_date" timestamp with time zone,
    "status" job_post_campaign_status_enum not null default 'scheduled'::job_post_campaign_status_enum,
    "is_integration_enabled" boolean not null default false,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
);


alter table "public"."job_posts_campaigns" enable row level security;

CREATE INDEX idx_campaigns_job ON public.job_posts_campaigns USING btree (job_post_id);

CREATE INDEX idx_campaigns_org ON public.job_posts_campaigns USING btree (company_id);

CREATE INDEX idx_campaigns_status ON public.job_posts_campaigns USING btree (status);

CREATE UNIQUE INDEX job_posts_campaigns_pkey ON public.job_posts_campaigns USING btree (id);

alter table "public"."job_posts_campaigns" add constraint "job_posts_campaigns_pkey" PRIMARY KEY using index "job_posts_campaigns_pkey";

alter table "public"."job_posts_campaigns" add constraint "job_posts_campaigns_check" CHECK (((end_date IS NULL) OR (end_date > start_date))) not valid;

alter table "public"."job_posts_campaigns" validate constraint "job_posts_campaigns_check";

alter table "public"."job_posts_campaigns" add constraint "job_posts_campaigns_company_id_fkey" FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE not valid;

alter table "public"."job_posts_campaigns" validate constraint "job_posts_campaigns_company_id_fkey";

alter table "public"."job_posts_campaigns" add constraint "job_posts_campaigns_job_post_id_fkey" FOREIGN KEY (job_post_id) REFERENCES job_posts(id) ON DELETE CASCADE not valid;

alter table "public"."job_posts_campaigns" validate constraint "job_posts_campaigns_job_post_id_fkey";

grant delete on table "public"."job_posts_campaigns" to "anon";

grant insert on table "public"."job_posts_campaigns" to "anon";

grant references on table "public"."job_posts_campaigns" to "anon";

grant select on table "public"."job_posts_campaigns" to "anon";

grant trigger on table "public"."job_posts_campaigns" to "anon";

grant truncate on table "public"."job_posts_campaigns" to "anon";

grant update on table "public"."job_posts_campaigns" to "anon";

grant delete on table "public"."job_posts_campaigns" to "authenticated";

grant insert on table "public"."job_posts_campaigns" to "authenticated";

grant references on table "public"."job_posts_campaigns" to "authenticated";

grant select on table "public"."job_posts_campaigns" to "authenticated";

grant trigger on table "public"."job_posts_campaigns" to "authenticated";

grant truncate on table "public"."job_posts_campaigns" to "authenticated";

grant update on table "public"."job_posts_campaigns" to "authenticated";

grant delete on table "public"."job_posts_campaigns" to "service_role";

grant insert on table "public"."job_posts_campaigns" to "service_role";

grant references on table "public"."job_posts_campaigns" to "service_role";

grant select on table "public"."job_posts_campaigns" to "service_role";

grant trigger on table "public"."job_posts_campaigns" to "service_role";

grant truncate on table "public"."job_posts_campaigns" to "service_role";

grant update on table "public"."job_posts_campaigns" to "service_role";

create policy "Company Admins Can Create Job Post Campaign"
on "public"."job_posts_campaigns"
as permissive
for insert
to public
with check ((is_user_company_admin(company_id) OR has_permission('job:publish'::text)));


create policy "Company Admins Can Delete Job Post Campaign"
on "public"."job_posts_campaigns"
as permissive
for delete
to public
using ((is_user_company_admin(company_id) OR has_permission('job:status'::text)));


create policy "Company Admins Can Update Job Post Campaign"
on "public"."job_posts_campaigns"
as permissive
for update
to public
using ((is_user_company_admin(company_id) OR has_permission('job:status'::text)));


create policy "Public Can View Job Post Campaign"
on "public"."job_posts_campaigns"
as permissive
for select
to public
using (true);



