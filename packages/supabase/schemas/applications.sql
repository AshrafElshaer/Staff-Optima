create table application_stages(
    id uuid primary key default gen_random_uuid(),
    company_id uuid references companies(id) on delete cascade not null ,

    title text not null,
    description text not null,
    stage_order numeric not null,
    indicator_color text not null,

    created_at timestamp with time zone default now() not null,
    updated_at timestamp with time zone default now() not null
);

create index idx_application_stages_company_id on application_stages(company_id);


create type application_stage_trigger_condition as enum ('on_start', 'on_complete');

create table application_stage_triggers(
    id uuid primary key default gen_random_uuid(),
    company_id uuid references companies(id)  on delete cascade not null,
    stage_id uuid references application_stages(id) on delete cascade not null,
    action_type text not null, -- e.g., 'send_email', 'update_status'
    action_data jsonb not null, -- Contains specifics like email templates or status values
    trigger_condition application_stage_trigger_condition not null, -- e.g., 'on_start', 'on_complete'
    created_at timestamp with time zone default now() not null,
    updated_at timestamp with time zone default now() not null
);

create index idx_application_stage_triggers_company_id on application_stage_triggers(company_id);
create index idx_application_stage_triggers_stage_id on application_stage_triggers(stage_id);


create table reject_reasons (
    id uuid primary key default gen_random_uuid(),
    content text not null,
    company_id uuid not null references companies(id) on delete cascade,


    created_at timestamp with time zone default now() not null,
    updated_at timestamp with time zone default now() not null
);

create index idx_rejection_id on reject_reasons(id);



create type application_status_enum as enum ('applied', 'interviewing', 'hired', 'rejected', 'archived');

create table applications(
    id uuid primary key default gen_random_uuid(),
    job_id uuid references job_posts(id) on delete cascade,
    company_id uuid not null references companies(id) on delete cascade not null,
    department_id uuid references departments(id)  on delete set null,
    candidate_id uuid not null references candidates(id)  on delete cascade not null,
    stage_id uuid references application_stages(id)  on delete set null,

    status application_status_enum not null default 'applied',
    source text,
    screening_question_answers jsonb,
    candidate_match numeric not null,

    created_at timestamp with time zone default now() not null,
    updated_at timestamp with time zone default now() not null
);
create index idx_applications_company_id ON applications(company_id);
create index idx_applications_candidate_id ON applications(candidate_id);
create index idx_applications_job_id ON applications(job_id);


create type attachment_type_enum as enum ('resume', 'cover_letter', 'portfolio', 'certificate', 'reference_letter', 'other', 'transcript', 'work_sample', 'professional_license');

create table attachments (
    id uuid primary key default gen_random_uuid(),
    candidate_id uuid not null references candidates(id) on delete cascade,
    company_id uuid not null references companies(id) on delete cascade,
    application_id uuid references applications (id) on delete cascade,

    file_name text not null,
    file_url text not null,
    file_path text not null,
    file_size bigint not null check (file_size > 0), -- size in bytes
    attachment_type attachment_type_enum default 'resume',
    created_at timestamp with time zone default now() not null,
    updated_at timestamp with time zone default now() not null
);

create index idx_attachments_candidate_id on attachments(candidate_id);

alter table reject_reasons add column application_id uuid not null references applications(id) on delete cascade;
alter table applications add column reject_reason_id uuid references reject_reasons(id) on delete set null;
create index idx_rejection_application_id on reject_reasons(application_id);
