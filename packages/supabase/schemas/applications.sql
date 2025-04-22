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
