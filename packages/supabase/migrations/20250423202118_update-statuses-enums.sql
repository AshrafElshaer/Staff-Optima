alter table "public"."job_posts" alter column "status" drop default;

alter table "public"."job_posts_campaigns" alter column "status" drop default;

alter type "public"."job_post_campaign_status_enum" rename to "job_post_campaign_status_enum__old_version_to_be_dropped";

create type "public"."job_post_campaign_status_enum" as enum ('running', 'paused', 'completed', 'scheduled');

alter type "public"."job_post_status_enum" rename to "job_post_status_enum__old_version_to_be_dropped";

create type "public"."job_post_status_enum" as enum ('draft', 'archived', 'published');

alter table "public"."job_posts" alter column status type "public"."job_post_status_enum" using case status::text
  when 'active' then 'published'
  else status::text
end::"public"."job_post_status_enum";

alter table "public"."job_posts_campaigns" alter column status type "public"."job_post_campaign_status_enum" using status::text::"public"."job_post_campaign_status_enum";

alter table "public"."job_posts" alter column "status" set default 'draft'::job_post_status_enum;

alter table "public"."job_posts_campaigns" alter column "status" set default 'scheduled'::job_post_campaign_status_enum;

drop type "public"."job_post_campaign_status_enum__old_version_to_be_dropped";

drop type "public"."job_post_status_enum__old_version_to_be_dropped";
