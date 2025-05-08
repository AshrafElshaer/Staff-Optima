import { ApplicationsList } from "@/features/job-post/applications/views/applications-list";
import { createServerClient } from "@/lib/supabase/server";
import {
	getApplicationStages,
	getApplicationsByJobId,
} from "@optima/supabase/queries";
import type { Application } from "@optima/supabase/types";
import { buttonVariants } from "@optima/ui/components/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@optima/ui/components/card";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@optima/ui/components/tabs";
import { headers } from "next/headers";
import Link from "next/link";

// Demo application data with stages that match your schema

interface JobDetailsPageProps {
	params: Promise<{ jobId: string }>;
}

export default async function JobDetailsPage({ params }: JobDetailsPageProps) {
	const { jobId } = await params;
	return <ApplicationsList jobId={jobId} />;
}
