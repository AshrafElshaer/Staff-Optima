alter table "public"."job_posts" alter column "status" drop default;

alter type "public"."job_post_status_enum" rename to "job_post_status_enum__old_version_to_be_dropped";

create type "public"."job_post_status_enum" as enum ('draft', 'archived', 'active');

alter table "public"."job_posts" alter column status type "public"."job_post_status_enum" using status::text::"public"."job_post_status_enum";

alter table "public"."job_posts" alter column "status" set default 'draft'::job_post_status_enum;

drop type "public"."job_post_status_enum__old_version_to_be_dropped";


