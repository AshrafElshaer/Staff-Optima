create or replace function get_user_organization_id() returns uuid
    security invoker
    set search_path = public
as $$
    select organization_id from organization_members where user_id = auth.uid();
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
        and r.organization_id = get_user_organization_id()
    );
$$ language sql stable;



create or replace function is_user_organization_admin(organization_id uuid) returns boolean 
    security invoker
    set search_path = public
as $$
    select admin_id = auth.uid() from organizations where id = organization_id;
$$ language sql stable;

create or replace function is_user_organization_member(organization_id uuid) returns boolean 
    security invoker
    set search_path = public
as $$
    select exists (select 1 from organization_members where user_id = auth.uid() and organization_id = organization_id);
$$ language sql stable;





