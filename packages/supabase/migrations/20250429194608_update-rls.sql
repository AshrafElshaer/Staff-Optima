alter table "public"."applications" enable row level security;

alter table "public"."attachments" enable row level security;

alter table "public"."reject_reasons" enable row level security;

create policy "Company Admin Can Delete Applications"
on "public"."applications"
as permissive
for delete
to public
using ((is_user_company_admin(company_id) OR has_permission('application:delete'::text)));


create policy "Company Members Can Read Applications"
on "public"."applications"
as permissive
for select
to public
using (is_user_company_member(company_id));


create policy "Company Members Can Update Applications"
on "public"."applications"
as permissive
for update
to public
using ((is_user_company_member(company_id) OR has_permission('application:update'::text)));


create policy "Public Can Create Applications"
on "public"."applications"
as permissive
for insert
to public
with check (true);


create policy "Company Admin Can Delete Attachments"
on "public"."attachments"
as permissive
for delete
to public
using ((is_user_company_admin(company_id) OR has_permission('application:delete'::text)));


create policy "Company Members Can Read Attachments"
on "public"."attachments"
as permissive
for select
to public
using (is_user_company_member(company_id));


create policy "Company Members Can Update Attachments"
on "public"."attachments"
as permissive
for update
to public
using ((is_user_company_member(company_id) OR has_permission('application:update'::text)));


create policy "Public Can Create Attachments"
on "public"."attachments"
as permissive
for insert
to public
with check (true);


create policy "Company Admin Can Delete Reject Reasons"
on "public"."reject_reasons"
as permissive
for delete
to public
using ((is_user_company_admin(company_id) OR has_permission('application:delete'::text)));


create policy "Company Members Can Read Reject Reasons"
on "public"."reject_reasons"
as permissive
for select
to public
using (is_user_company_member(company_id));


create policy "Company Members Can Update Reject Reasons"
on "public"."reject_reasons"
as permissive
for update
to public
using ((is_user_company_member(company_id) OR has_permission('application:update'::text)));


create policy "Public Can Create Reject Reasons"
on "public"."reject_reasons"
as permissive
for insert
to public
with check (true);



