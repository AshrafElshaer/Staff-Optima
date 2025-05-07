"use server";
import { authActionClient } from "@/lib/safe-action";
import { uploadFile } from "@/lib/supabase/storage";
import { ApplicationSubmitEmail } from "@optima/email";
import {
	createApplication,
	createAttachment,
	createCandidate,
	createCandidateEducation,
	createCandidateExperience,
	createCandidateSocialLink,
} from "@optima/supabase/mutations";
import {
	getApplicationStageByStageOrder,
	getCompanyById,
	getJobPostById,
	isCandidateAppliedToJob,
} from "@optima/supabase/queries";
import { after } from "next/server";
import { formSchema } from "./application.schema";
export const applyForJobAction = authActionClient
	.metadata({
		name: "apply_for_job",
	})
	.schema(formSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { resend, supabase } = ctx;
		const { data: candidate, error } = await createCandidate(supabase, {
			...parsedInput.candidate,
			company_id: ctx.user.user_metadata.company_id,
		});

		if (error) {
			throw new Error(error.message);
		}

		const { data: isAlreadyApplied, error: isAlreadyAppliedError } =
			await isCandidateAppliedToJob(
				supabase,
				candidate?.id ?? "",
				parsedInput.application.job_id ?? "",
			);

		if (isAlreadyAppliedError) {
			throw new Error(isAlreadyAppliedError.message);
		}

		if (isAlreadyApplied) {
			throw new Error("You have already applied to this job");
		}

		if (parsedInput.education.length > 0) {
			const { error: educationError } = await createCandidateEducation(
				supabase,
				parsedInput.education.map((education) => ({
					...education,
					candidate_id: candidate?.id ?? "",
					company_id: ctx.user.user_metadata.company_id ?? "",
				})),
			);

			if (educationError) {
				throw new Error(educationError.message);
			}
		}

		if (parsedInput.experience.length > 0) {
			const { error: experienceError } = await createCandidateExperience(
				supabase,
				parsedInput.experience.map((experience) => ({
					...experience,
					candidate_id: candidate?.id ?? "",
					company_id: ctx.user.user_metadata.company_id ?? "",
				})),
			);

			if (experienceError) {
				throw new Error(experienceError.message);
			}
		}

		const { data: socialLinks, error: socialLinksError } =
			await createCandidateSocialLink(
				supabase,
				parsedInput.social_links.map((socialLink) => ({
					...socialLink,
					candidate_id: candidate?.id ?? "",
					company_id: ctx.user.user_metadata.company_id ?? "",
				})),
			);

		if (socialLinksError) {
			throw new Error(socialLinksError.message);
		}

		const { data: applicationStage } = await getApplicationStageByStageOrder(
			supabase,
			ctx.user.user_metadata.company_id ?? "",
			1,
		);

		const { data: application, error: applicationError } =
			await createApplication(supabase, {
				...parsedInput.application,
				candidate_id: candidate?.id ?? "",
				company_id: ctx.user.user_metadata.company_id ?? "",
				stage_id: applicationStage?.id ?? null,
			});

		if (applicationError) {
			throw new Error(applicationError.message);
		}

		const attachmentPromises = parsedInput.attachments.map((attachment) =>
			uploadFile({
				supabase,
				bucket: "attachments",
				path: `${candidate?.id}/${application?.id}/${attachment.file.name}`,
				file: attachment.file,
			}),
		);

		const uploadedFiles = await Promise.all(attachmentPromises);

		const attachments = uploadedFiles.map((file, index) => ({
			application_id: application?.id ?? null,
			attachment_type: parsedInput.attachments[index]?.fileType,
			candidate_id: candidate?.id ?? "",
			company_id: ctx.user.user_metadata.company_id ?? "",
			file_name: parsedInput.attachments[index]?.file?.name ?? "",
			file_path: file.path,
			file_size: parsedInput.attachments[index]?.file?.size ?? 0,
			file_url: file.publicUrl,
		}));

		const { error: attachmentError } = await createAttachment(
			supabase,
			attachments,
		);

		if (attachmentError) {
			throw new Error(attachmentError.message);
		}

		after(async () => {
			const { data: company } = await getCompanyById(
				supabase,
				ctx.user.user_metadata.company_id,
			);

			const { data: jobPost } = await getJobPostById(
				supabase,
				parsedInput.application.job_id ?? "",
			);

			await resend.emails.send({
				from: "Staff Optima <noreply@staffoptima.co>",
				to: candidate?.email ?? "",
				subject: "Application Submitted",
				react: ApplicationSubmitEmail({
					candidateName:
						`${candidate?.first_name} ${candidate?.last_name}` || "",
					jobTitle: jobPost?.title || "",
					companyName: company?.name || "",
					companyLogo: company?.logo ?? "",
				}),
			});
		});

		return application;
	});
