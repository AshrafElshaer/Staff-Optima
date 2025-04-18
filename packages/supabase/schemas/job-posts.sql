create type employment_type_enum as enum ('full_time', 'part_time', 'contract', 'internship');
create type experience_level_enum as enum ('junior', 'mid', 'senior', 'lead', 'executive');

create type work_mode_enum as enum ('remote','hybrid','on_site');

create type job_post_status_enum as enum ('draft','archived');

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