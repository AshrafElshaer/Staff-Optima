create type "public"."application_stage_trigger_condition" as enum ('on_start', 'on_complete');

create table "public"."application_stage_triggers" (
    "id" uuid not null default gen_random_uuid(),
    "company_id" uuid not null,
    "stage_id" uuid not null,
    "action_type" text not null,
    "action_data" jsonb not null,
    "trigger_condition" application_stage_trigger_condition not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
);


alter table "public"."application_stage_triggers" enable row level security;

create table "public"."application_stages" (
    "id" uuid not null default gen_random_uuid(),
    "company_id" uuid not null,
    "title" text not null,
    "description" text not null,
    "stage_order" numeric not null,
    "indicator_color" text not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
);


alter table "public"."application_stages" enable row level security;

CREATE UNIQUE INDEX application_stage_triggers_pkey ON public.application_stage_triggers USING btree (id);


CREATE UNIQUE INDEX application_stages_pkey ON public.application_stages USING btree (id);

CREATE INDEX idx_application_stage_triggers_company_id ON public.application_stage_triggers USING btree (company_id);

CREATE INDEX idx_application_stage_triggers_stage_id ON public.application_stage_triggers USING btree (stage_id);

CREATE INDEX idx_application_stages_company_id ON public.application_stages USING btree (company_id);

alter table "public"."application_stage_triggers" add constraint "application_stage_triggers_pkey" PRIMARY KEY using index "application_stage_triggers_pkey";

alter table "public"."application_stages" add constraint "application_stages_pkey" PRIMARY KEY using index "application_stages_pkey";

alter table "public"."application_stage_triggers" add constraint "application_stage_triggers_company_id_fkey" FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE not valid;

alter table "public"."application_stage_triggers" validate constraint "application_stage_triggers_company_id_fkey";

alter table "public"."application_stage_triggers" add constraint "application_stage_triggers_stage_id_fkey" FOREIGN KEY (stage_id) REFERENCES application_stages(id) ON DELETE CASCADE not valid;

alter table "public"."application_stage_triggers" validate constraint "application_stage_triggers_stage_id_fkey";

alter table "public"."application_stages" add constraint "application_stages_company_id_fkey" FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE not valid;

alter table "public"."application_stages" validate constraint "application_stages_company_id_fkey";


grant delete on table "public"."application_stage_triggers" to "anon";

grant insert on table "public"."application_stage_triggers" to "anon";

grant references on table "public"."application_stage_triggers" to "anon";

grant select on table "public"."application_stage_triggers" to "anon";

grant trigger on table "public"."application_stage_triggers" to "anon";

grant truncate on table "public"."application_stage_triggers" to "anon";

grant update on table "public"."application_stage_triggers" to "anon";

grant delete on table "public"."application_stage_triggers" to "authenticated";

grant insert on table "public"."application_stage_triggers" to "authenticated";

grant references on table "public"."application_stage_triggers" to "authenticated";

grant select on table "public"."application_stage_triggers" to "authenticated";

grant trigger on table "public"."application_stage_triggers" to "authenticated";

grant truncate on table "public"."application_stage_triggers" to "authenticated";

grant update on table "public"."application_stage_triggers" to "authenticated";

grant delete on table "public"."application_stage_triggers" to "service_role";

grant insert on table "public"."application_stage_triggers" to "service_role";

grant references on table "public"."application_stage_triggers" to "service_role";

grant select on table "public"."application_stage_triggers" to "service_role";

grant trigger on table "public"."application_stage_triggers" to "service_role";

grant truncate on table "public"."application_stage_triggers" to "service_role";

grant update on table "public"."application_stage_triggers" to "service_role";

grant delete on table "public"."application_stages" to "anon";

grant insert on table "public"."application_stages" to "anon";

grant references on table "public"."application_stages" to "anon";

grant select on table "public"."application_stages" to "anon";

grant trigger on table "public"."application_stages" to "anon";

grant truncate on table "public"."application_stages" to "anon";

grant update on table "public"."application_stages" to "anon";

grant delete on table "public"."application_stages" to "authenticated";

grant insert on table "public"."application_stages" to "authenticated";

grant references on table "public"."application_stages" to "authenticated";

grant select on table "public"."application_stages" to "authenticated";

grant trigger on table "public"."application_stages" to "authenticated";

grant truncate on table "public"."application_stages" to "authenticated";

grant update on table "public"."application_stages" to "authenticated";

grant delete on table "public"."application_stages" to "service_role";

grant insert on table "public"."application_stages" to "service_role";

grant references on table "public"."application_stages" to "service_role";

grant select on table "public"."application_stages" to "service_role";

grant trigger on table "public"."application_stages" to "service_role";

grant truncate on table "public"."application_stages" to "service_role";

grant update on table "public"."application_stages" to "service_role";

create policy "Anyone can read application stage triggers"
on "public"."application_stage_triggers"
as permissive
for select
to public
using (true);


create policy "Company Admins can create application stage triggers"
on "public"."application_stage_triggers"
as permissive
for insert
to public
with check ((is_user_company_admin(company_id) OR has_permission('settings:workflow'::text)));


create policy "Company Admins can delete application stage triggers"
on "public"."application_stage_triggers"
as permissive
for delete
to public
using ((is_user_company_admin(company_id) OR has_permission('settings:workflow'::text)));


create policy "Company Admins can update application stage triggers"
on "public"."application_stage_triggers"
as permissive
for update
to public
using ((is_user_company_admin(company_id) OR has_permission('settings:workflow'::text)));


create policy "Anyone can read application stages"
on "public"."application_stages"
as permissive
for select
to public
using (true);


create policy "Company Admins can create application stages"
on "public"."application_stages"
as permissive
for insert
to public
with check ((is_user_company_admin(company_id) OR has_permission('settings:workflow'::text)));


create policy "Company Admins can delete application stages"
on "public"."application_stages"
as permissive
for delete
to public
using ((is_user_company_admin(company_id) OR has_permission('settings:workflow'::text)));


create policy "Company Admins can update application stages"
on "public"."application_stages"
as permissive
for update
to public
using ((is_user_company_admin(company_id) OR has_permission('settings:workflow'::text)));



