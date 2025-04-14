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





create table user_preferences (
    user_id uuid primary key references users(id) on delete cascade not null,
    timezone text not null,
    date_format text not null default 'MM/DD/YYYY',
    reminder_period integer not null default 30 CHECK (reminder_period >= 0 AND reminder_period <= 1440),
    created_at timestamp with time zone default now() not null,
    updated_at timestamp with time zone default now() not null
);

create index idx_perfer_user_id on user_preferences(user_id);

