insert into storage.buckets (id, name)
  values ('organization-logos', 'organization-logos');


insert into storage.buckets (id, name)
  values ('editor-documents', 'editor-documents');


CREATE POLICY "allow all 17gdgt4_5" ON storage.objects FOR INSERT TO public WITH CHECK (bucket_id = 'organization-logos');
CREATE POLICY "allow all 17gdgt4_6" ON storage.objects FOR SELECT TO public USING (bucket_id = 'organization-logos');
CREATE POLICY "allow all 17gdgt4_7" ON storage.objects FOR UPDATE TO public USING (bucket_id = 'organization-logos');
CREATE POLICY "allow all 17gdgt4_8" ON storage.objects FOR DELETE TO public USING (bucket_id = 'organization-logos');


CREATE POLICY "allow all 17gdgt4_1" ON storage.objects FOR INSERT TO public WITH CHECK (bucket_id = 'editor-documents');
CREATE POLICY "allow all 17gdgt4_2" ON storage.objects FOR SELECT TO public USING (bucket_id = 'editor-documents');
CREATE POLICY "allow all 17gdgt4_3" ON storage.objects FOR UPDATE TO public USING (bucket_id = 'editor-documents');
CREATE POLICY "allow all 17gdgt4_4" ON storage.objects FOR DELETE TO public USING (bucket_id = 'editor-documents');
