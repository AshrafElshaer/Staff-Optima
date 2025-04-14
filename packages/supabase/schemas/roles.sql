create table roles (
    id uuid primary key default gen_random_uuid(),
    company_id uuid not null references companies(id)  on delete cascade,
    name text not null,
    permissions text[] not null,
    created_at timestamp with time zone default now() ,
    updated_at timestamp with time zone default now() 
);

create index idx_roles_company on roles(company_id);



create table user_roles (
    user_id uuid not null references users(id) on delete cascade,
    role_id uuid not null references roles(id) on delete cascade,
    company_id uuid not null references companies(id) on delete cascade,
    created_at timestamp with time zone default now() ,
    updated_at timestamp with time zone default now() 
);

create index idx_user_roles_user on user_roles(user_id);
create index idx_user_roles_role on user_roles(role_id);

