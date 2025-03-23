
-- Avatar bucket
insert into storage.buckets (id, name, public)
  values ('avatars', 'avatars', true);


create policy "Avatar images are publicly accessible." on storage.objects
  for select using (bucket_id = 'avatars');

create policy "Anyone can upload an avatar." on storage.objects
  for insert with check (bucket_id = 'avatars');

create policy "Users can delete their own avatar." on storage.objects
  for delete using (bucket_id = 'avatars' and auth.uid() = owner);

create policy "Users can update their own avatar." on storage.objects
  for update using (bucket_id = 'avatars' and auth.uid() = owner);

-- Organization Logo bucket
insert into storage.buckets (id, name, public)
  values ('organization-logos', 'organization-logos', true);


create policy "Logo images are publicly accessible." on storage.objects
  for select using (bucket_id = 'organization-logos');

create policy "Anyone can upload a logo." on storage.objects
  for insert with check (bucket_id = 'organization-logos');

create policy "Users can delete their own logo." on storage.objects
  for delete using (bucket_id = 'organization-logos' and auth.uid() = owner);

create policy "Users can update their own logo." on storage.objects
  for update using (bucket_id = 'organization-logos' and auth.uid() = owner);


-- Editor Document bucket
insert into storage.buckets (id, name, public)
  values ('editor-documents', 'editor-documents', true);

create policy "Editor document images are publicly accessible." on storage.objects
  for select using (bucket_id = 'editor-documents');

create policy "Anyone can upload a editor document." on storage.objects
  for insert with check (bucket_id = 'editor-documents');

create policy "Users can delete their own editor document." on storage.objects
  for delete using (bucket_id = 'editor-documents' and auth.uid() = owner);

create policy "Users can update their own editor document." on storage.objects
  for update using (bucket_id = 'editor-documents' and auth.uid() = owner);

-- attachments bucket
-- insert into storage.buckets (id, name, public)
--   values ('attachments', 'attachments', true);

-- create policy "Attachments are publicly accessible." on storage.objects
--   for select using (bucket_id = 'attachments');

-- create policy "Anyone can upload a attachments." on storage.objects
--   for insert with check (bucket_id = 'attachments');

-- create policy "Anyone delete their own attachments." on storage.objects
--   for delete using (bucket_id = 'attachments');

-- create policy "Anyone can update their own attachments." on storage.objects
--   for update using (bucket_id = 'attachments');


