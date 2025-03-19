ALTER TABLE "user_roles" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "user_roles" ALTER COLUMN "updated_at" SET DEFAULT now();