create table users (
    id uuid not null references auth.users on delete cascade primary key,
    email text not null unique,
    first_name text not null,
    last_name text not null,
    image text,
    phone_number text not null,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

create index idx_users_id on users(id);
create index idx_users_email on users(email);


-- Users
alter table users enable row level security;

create policy "Public Can Create User" on users for insert with check (auth.uid()=id or has_permission('user:add'));
create policy "Public Can View User" on users for select using (true);
create policy "Admin Or User Can Update User" on users for update using (auth.uid() = id or has_permission('user:update'));
create policy "Admin Can Delete User" on users for delete using (has_permission('user:delete'));
