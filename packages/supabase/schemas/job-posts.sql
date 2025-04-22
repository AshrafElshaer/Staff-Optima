create type employment_type_enum as enum ('full_time', 'part_time', 'contract', 'internship');
create type experience_level_enum as enum ('junior', 'mid', 'senior', 'lead', 'executive');

create type work_mode_enum as enum ('remote','hybrid','on_site');

create type job_post_status_enum as enum ('draft','archived','active');

create table job_posts (
    id uuid primary key default gen_random_uuid(),
    company_id uuid references companies(id) on delete cascade not null ,
    created_by uuid references users(id)  on delete set null,
    department_id uuid references departments(id) on delete set null,
    title text not null,
    employment_type employment_type_enum not null,
    salary_range text,
    experience_level experience_level_enum not null,
    work_mode work_mode_enum not null,
    location text,
    status job_post_status_enum not null default 'draft',

    screening_questions jsonb,
    required_skills text[],
    benefits text[],
    job_details text not null,

    created_at timestamp with time zone default now() not null,
    updated_at timestamp with time zone default now() not null
);


create index idx_job_posts_id on job_posts(id);
create index idx_job_posts_company on job_posts(company_id);


create type job_post_campaign_status_enum as enum ('active', 'paused', 'completed','scheduled');

create table job_posts_campaigns (
    id uuid primary key default gen_random_uuid(),
    company_id uuid references companies(id) on delete cascade  not null,
    job_post_id uuid references job_posts(id) on delete cascade  not null,
    start_date timestamp with time zone not null,
    end_date timestamp with time zone check (end_date is null or end_date > start_date),
    status job_post_campaign_status_enum not null default 'scheduled',
    is_integration_enabled boolean not null default false,
    created_at timestamp with time zone default now() not null,
    updated_at timestamp with time zone default now() not null
);

create index idx_campaigns_org on job_posts_campaigns(company_id);
create index idx_campaigns_job on job_posts_campaigns(job_post_id);
create index idx_campaigns_status on job_posts_campaigns(status);



