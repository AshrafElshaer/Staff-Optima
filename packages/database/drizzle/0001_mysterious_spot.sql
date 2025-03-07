ALTER TABLE "organizations" RENAME COLUMN "logo_url" TO "logo";--> statement-breakpoint
ALTER TABLE "departments" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "departments" ADD COLUMN "head_user_id" uuid;--> statement-breakpoint
ALTER TABLE "organizations" ADD COLUMN "timezone" text NOT NULL;--> statement-breakpoint
ALTER TABLE "organizations" ADD COLUMN "tax_id" text;--> statement-breakpoint
ALTER TABLE "organizations" ADD COLUMN "employee_count" text;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "organization_id_idx" ON "departments" ("organization_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "organization_id_domain_idx" ON "domain_verification" ("organization_id","domain");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_id_organization_idx" ON "members" ("user_id","organization_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_domain" ON "organizations" ("domain");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "organization_idx" ON "organizations" ("id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "departments" ADD CONSTRAINT "departments_head_user_id_user_id_fk" FOREIGN KEY ("head_user_id") REFERENCES "user"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_domain_unique" UNIQUE("domain");