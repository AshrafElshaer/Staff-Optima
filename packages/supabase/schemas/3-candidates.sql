create table candidates (
  id uuid primary key default gen_random_uuid (),
  company_id uuid not null references companies(id) on delete cascade not null,
  avatar_url text null,
  first_name text not null,
  last_name text not null,
  email text not null,
  phone_number text null,
  timezone text not null,
  country text not null,
  city text not null,
  gender text not null,
  date_of_birth date not null,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

create index idx_candidates_company on candidates(company_id);
create index idx_candidates_email on candidates(email);


create table candidate_social_links (
  id uuid primary key default gen_random_uuid(),
  candidate_id uuid not null references candidates(id) on delete cascade,
  company_id uuid not null references companies(id) on delete cascade,
  platform text not null,  -- e.g., LinkedIn, GitHub
  url text not null,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null,
  unique (candidate_id, platform)
);

create index idx_candidate_social_links_candidate_id on candidate_social_links(candidate_id);

create table candidate_educations (
  id uuid primary key default gen_random_uuid (),
  candidate_id uuid not null references candidates(id) on delete cascade,
  company_id uuid not null references companies(id) on delete cascade,
  institution text not null,
  degree text,
  field_of_study text,
  start_date date,
  end_date date,
  grade text

);

create index idx_candidate_educations_candidate_id on candidate_educations(candidate_id);

create table candidate_experiences (
  id uuid primary key default gen_random_uuid(),
  candidate_id uuid not null references candidates(id) on delete cascade,
  company_id uuid not null references companies(id) on delete cascade,
  job_title text not null,
  company text not null,
  start_date date,
  end_date date,
  description text,
  skills text[]
);

create index idx_candidate_experiences_candidate_id on candidate_experiences(candidate_id);