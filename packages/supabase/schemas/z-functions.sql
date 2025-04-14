create or replace function get_user_company_id() returns uuid
    security invoker
    set search_path = public
as $$
    select company_id from company_members where user_id = auth.uid();
$$ language sql stable;

create or replace function has_permission(permission text) returns boolean
    security invoker
    set search_path = public
as $$
    select exists (
        select 1 
        from user_roles ur
        join roles r on r.id = ur.role_id
        where ur.user_id = auth.uid()
        and r.permissions @> array[permission]
        and r.company_id = get_user_company_id()
    );
$$ language sql stable;



create or replace function is_user_company_admin(company_id uuid) returns boolean 
    security invoker
    set search_path = public
as $$
    select admin_id = auth.uid() from companies where id = company_id;
$$ language sql stable;

create or replace function is_user_company_member(company_id uuid) returns boolean 
    security invoker
    set search_path = public
as $$
    select exists (select 1 from company_members where user_id = auth.uid() and company_id = company_id);
$$ language sql stable;





