create table waitlist (
    email text primary key not null unique,
    name text not null,
    is_granted boolean default false,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);


alter table waitlist enable row level security;

create policy "Public can read waitlist" on waitlist for select using (true);
create policy "Public can create waitlist" on waitlist for insert with check (true);
create policy "Public can update waitlist" on waitlist for update using (true);
create policy "Public can delete waitlist" on waitlist for delete using (true);