alter table users enable row level security;

create policy "Public Can Create User" on users for insert with check (auth.uid()=id or has_permission('user:add'));
create policy "Public Can View User" on users for select using (true);
create policy "Admin Or User Can Update User" on users for update using (auth.uid() = id or has_permission('user:update'));
create policy "Admin Can Delete User" on users for delete using (has_permission('user:delete'));


alter table user_preferences enable row level security;

create policy "Users can view their own preferences" on user_preferences for select using (auth.uid() = user_id);
create policy "Users can update their own preferences" on user_preferences for update using (auth.uid() = user_id);
create policy "Users or admins can insert their own preferences" on user_preferences for insert with check (auth.uid() = user_id);

alter table companies enable row level security;

create policy "Create Company" on companies for insert with check (admin_id = auth.uid());
create policy "Public Can View Company" on companies for select using (true);
create policy "Company Admin or Has Permission Can Update Company" on companies for update using (auth.uid() = admin_id or has_permission('settings:company'));
create policy "Company Admin Can Delete Company" on companies for delete using (auth.uid() = admin_id);


alter table domain_verification enable row level security;

create policy "Only Admin Can View Domain Verification" on domain_verification for select using (is_user_company_admin(company_id));
create policy "Company Admin Can Create Domain Verification" on domain_verification for insert with check (is_user_company_admin(company_id));
create policy "Company Admin Can Update Domain Verification" on domain_verification for update using (is_user_company_admin(company_id) or has_permission('settings:company'));
create policy "Company Admin Can Delete Domain Verification" on domain_verification for delete using (is_user_company_admin(company_id));

alter table company_members enable row level security;

create policy "View Company Member" on company_members for select using (true);
create policy "Company Admin Can Create Company Member" on company_members for insert with check (is_user_company_admin(company_id) or has_permission('user:add'));
create policy "Company Admin Can Update Company Member" on company_members for update using (is_user_company_admin(company_id) or has_permission('user:update'));
create policy "Company Admin Can Delete Company Member" on company_members for delete using (is_user_company_admin(company_id) or has_permission('user:delete'));

alter table departments enable row level security;

create policy "Public can read department" on departments for select using (true);
create policy "Company Admin Can Create Department" on departments for insert with check (is_user_company_admin(company_id) or has_permission('settings:departments'));
create policy "Company Admin Can Update Department" on departments for update using (is_user_company_admin(company_id) or has_permission('settings:departments'));
create policy "Company Admin Can Delete Department" on departments for delete using (is_user_company_admin(company_id) or has_permission('settings:departments'));

alter table roles enable row level security;

create policy "Public can read role" on roles for select using (true);
create policy "Company Admin Can Create Role" on roles for insert with check (is_user_company_admin(company_id) or has_permission('settings:roles'));
create policy "Company Admin Can Update Role" on roles for update using (is_user_company_admin(company_id) or has_permission('settings:roles'));
create policy "Company Admin Can Delete Role" on roles for delete using (is_user_company_admin(company_id) or has_permission('settings:roles'));

alter table user_roles enable row level security;

create policy "Public can read user role" on user_roles for select using (true);
create policy "Company Admin Can Create User Role" on user_roles for insert with check (is_user_company_admin(company_id) or has_permission('settings:roles'));
create policy "Company Admin Can Update User Role" on user_roles for update using (is_user_company_admin(company_id) or has_permission('settings:roles'));
create policy "Company Admin Can Delete User Role" on user_roles for delete using (is_user_company_admin(company_id) or has_permission('settings:roles'));


alter table application_stages enable row level security;

create policy "Anyone can read application stages" on application_stages for select using (true);
create policy "Company Admins can create application stages" on application_stages for insert with check (is_user_company_admin(company_id) or has_permission('settings:workflow'));
create policy "Company Admins can update application stages" on application_stages for update using (is_user_company_admin(company_id) or has_permission('settings:workflow'));
create policy "Company Admins can delete application stages" on application_stages for delete using (is_user_company_admin(company_id) or has_permission('settings:workflow'));


alter table application_stage_triggers enable row level security;

create policy "Anyone can read application stage triggers" on application_stage_triggers for select using (true);
create policy "Company Admins can create application stage triggers" on application_stage_triggers for insert with check (is_user_company_admin(company_id) or has_permission('settings:workflow'));
create policy "Company Admins can update application stage triggers" on application_stage_triggers for update using (is_user_company_admin(company_id) or has_permission('settings:workflow'));
create policy "Company Admins can delete application stage triggers" on application_stage_triggers for delete using (is_user_company_admin(company_id) or has_permission('settings:workflow'));


alter table job_posts enable row level security;

create policy "Company Admin Can Create Job Post" on job_posts for insert with check (is_user_company_admin(company_id) or has_permission('job:create'));

create policy "Public Can View Job Post" on job_posts for select using (true);

create policy "Company Admin Can Update Job Post" on job_posts for update using 
(is_user_company_admin(company_id) or has_permission('job:update'));

create policy "Company Admin Can Delete Job Post" on job_posts for delete using (is_user_company_admin(company_id) or has_permission('job:delete'));



-- Job Posts Campaigns
alter table job_posts_campaigns enable row level security;
create policy "Company Admins Can Create Job Post Campaign" on job_posts_campaigns for insert with check (is_user_company_admin(company_id) or has_permission('job:publish'));

create policy "Company Admins Can Update Job Post Campaign" on job_posts_campaigns for update using (is_user_company_admin(company_id) or has_permission('job:status'));

create policy "Company Admins Can Delete Job Post Campaign" on job_posts_campaigns for delete using (is_user_company_admin(company_id) or has_permission('job:status'));

create policy "Public Can View Job Post Campaign" on job_posts_campaigns for select using (true);


-- Candidates
alter table candidates enable row level security;

create policy "Public Can Create Candidates" on candidates for insert with check(true);
create policy "Company Members Can Read Candidates" on candidates for select using(is_user_company_member(company_id));
create policy "Company Members Can Update Candidates" on candidates for update using(is_user_company_member(company_id) or has_permission('candidate:update'));
create policy "Company Admin Can Delete Candidates" on candidates for delete using(is_user_company_admin(company_id) or has_permission('candidate:delete'));


-- Candidate Social Links
alter table candidate_social_links enable row level security;
create policy "Public Can Create Candidates" on candidate_social_links for insert with check(true);
create policy "Company Members Can Read Candidates" on candidate_social_links for select using(is_user_company_member(company_id));
create policy "Company Members Can Update Candidates" on candidate_social_links for update using(is_user_company_member(company_id) or has_permission('candidate:update'));
create policy "Company Admin Can Delete Candidates" on candidate_social_links for delete using(is_user_company_admin(company_id) or has_permission('candidate:delete'));

-- Candidate_educations
alter table candidate_educations enable row level security;

create policy "Public Can Create Candidate Educations" on candidate_educations for insert with check(true);
create policy "Company Members Can Read Candidate Educations" on candidate_educations for select using(is_user_company_member(company_id));
create policy "Company Members Can Update Candidate Educations" on candidate_educations for update using(is_user_company_member(company_id) or has_permission('candidate:update'));
create policy "Company Admin Can Delete Candidate Educations" on candidate_educations for delete using(is_user_company_admin(company_id) or has_permission('candidate:delete'));

-- Candidate_experiences
alter table candidate_experiences enable row level security;
create policy "Public Can Create Candidate Experiences" on candidate_experiences for insert with check(true);
create policy "Company Members Can Read Candidate Experiences" on candidate_experiences for select using(is_user_company_member(company_id));
create policy "Company Members Can Update Candidate Experiences" on candidate_experiences for update using(is_user_company_member(company_id) or has_permission('candidate:update'));
create policy "Company Admin Can Delete Candidate Experiences" on candidate_experiences for delete using(is_user_company_admin(company_id) or has_permission('candidate:delete'));


-- Applications
alter table applications enable row level security;

create policy "Public Can Create Applications" on applications for insert with check(true);
create policy "Company Members Can Read Applications" on applications for select using(is_user_company_member(company_id));
create policy "Company Members Can Update Applications" on applications for update using(is_user_company_member(company_id) or has_permission('application:update'));
create policy "Company Admin Can Delete Applications" on applications for delete using(is_user_company_admin(company_id) or has_permission('application:delete'));

-- Attachments
alter table attachments enable row level security;

create policy "Public Can Create Attachments" on attachments for insert with check(true);
create policy "Company Members Can Read Attachments" on attachments for select using(is_user_company_member(company_id));
create policy "Company Members Can Update Attachments" on attachments for update using(is_user_company_member(company_id) or has_permission('application:update'));
create policy "Company Admin Can Delete Attachments" on attachments for delete using(is_user_company_admin(company_id) or has_permission('application:delete'));

-- Reject Reasons
alter table reject_reasons enable row level security;

create policy "Public Can Create Reject Reasons" on reject_reasons for insert with check(true);
create policy "Company Members Can Read Reject Reasons" on reject_reasons for select using(is_user_company_member(company_id));
create policy "Company Members Can Update Reject Reasons" on reject_reasons for update using(is_user_company_member(company_id) or has_permission('application:update'));
create policy "Company Admin Can Delete Reject Reasons" on reject_reasons for delete using(is_user_company_admin(company_id) or has_permission('application:delete'));