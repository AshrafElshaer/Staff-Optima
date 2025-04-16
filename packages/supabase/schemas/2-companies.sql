create table companies (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    logo text,
    domain text not null unique,
    is_domain_verified boolean not null default false,
    admin_id uuid references users(id) on delete set null,
    industry text not null,
    profile text,

    address_1 text,
    address_2 text,
    city text,
    state text,
    zip_code text,
    country text not null,
    timezone text not null,
    tax_id text,
    employee_count text,

    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

create index idx_companies_id on companies(id);
create index idx_companies_domain on companies(domain);




create type domain_verification_status_enum as enum ('pending', 'verified', 'failed');

create table domain_verification (
    id uuid primary key default gen_random_uuid(),
    company_id uuid not null references companies(id) on delete cascade,
    domain text not null,
    verification_token text not null,
    verification_status domain_verification_status_enum not null default 'pending',
    verification_date timestamp with time zone,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);





create table company_members (
    company_id uuid not null references companies(id)  on delete cascade,
    user_id uuid not null references users(id) on delete cascade,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

create index idx_company_members_org on company_members(company_id);
create index idx_company_members_user on company_members(user_id);


create table departments (
    id uuid primary key default gen_random_uuid(),
    company_id uuid not null references companies(id)  on delete cascade,
    name text not null,
    description text,
    head_user_id uuid references users(id) on delete set null,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

create index idx_departments_company on departments(company_id);
