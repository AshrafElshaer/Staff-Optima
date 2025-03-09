import { isValidPhoneNumber } from "libphonenumber-js";
import { z } from "zod";

export const userSchema = z.object({
	id: z.string().uuid(),
	name: z.string().min(1, {
		message: "Name is required",
	}),
	email: z.string().email(),
	emailVerified: z.boolean(),
	image: z.string().nullable().optional(),
	createdAt: z.date(),
	updatedAt: z.date(),
	stripeCustomerId: z.string().nullable().optional(),
	role: z.string().nullable().optional(),
	banned: z.boolean().nullable().optional(),
	banReason: z.string().nullable().optional(),
	banExpires: z.date().nullable().optional(),
	phoneNumber: z.string().refine(
		(val) => {
			if (!val) return true;
			return isValidPhoneNumber(val);
		},
		{
			message: "Invalid phone number",
		},
	),
});
export const userInsertSchema = userSchema.omit({
	createdAt: true,
	updatedAt: true,
});

export const userUpdateSchema = userSchema.partial().required({
	id: true,
});

export const organizationSchema = z.object({
	id: z.string().uuid().optional(),
	name: z.string().min(1, {
		message: "Name is required",
	}),
	logo: z.string().nullable().optional(),
	domain: z.string().min(1, {
		message: "Domain is required",
	}),
	adminId: z.string().uuid(),
	industry: z.string().min(1, {
		message: "Industry is required",
	}),
	profile: z.string().nullable().optional(),
	address1: z.string().nullable().optional(),
	address2: z.string().nullable().optional(),
	city: z.string().nullable().optional(),
	state: z.string().nullable().optional(),
	zipCode: z.string().nullable().optional(),
	country: z.string().min(1, {
		message: "Country is required",
	}),
	timezone: z.string().min(1, {
		message: "Timezone is required",
	}),
	taxId: z.string().nullable().optional(),
	employeeCount: z.string().nullable().optional(),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional(),
	isDomainVerified: z.boolean().optional(),
});

export const organizationInsertSchema = organizationSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
	adminId: true,
});

export const organizationUpdateSchema = organizationSchema.partial().required({
	id: true,
});

export const memberSchema = z.object({
	id: z.string().uuid().optional(),
	organizationId: z.string().uuid(),
	userId: z.string().uuid(),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional(),
});

export const memberInsertSchema = memberSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
});

export const memberUpdateSchema = memberSchema.partial().required({
	id: true,
});

export const departmentSchema = z.object({
	id: z.string().uuid().optional(),
	name: z.string().min(1),
	description: z.string().nullable().optional(),
	organizationId: z.string().uuid(),
	headUserId: z.string().uuid().nullable().optional(),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional(),
});

export const departmentInsertSchema = departmentSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
});

export const departmentUpdateSchema = departmentSchema.partial().required({
	id: true,
});

export const domainVerificationSchema = z.object({
	id: z.string().uuid().optional(),
	organizationId: z.string().uuid(),
	domain: z.string().min(1),
	verificationToken: z.string().min(1),
	verificationStatus: z
		.enum(["pending", "verified", "failed"])
		.default("pending"),
	verificationDate: z.date().nullable().optional(),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional(),
});

export const domainVerificationInsertSchema = domainVerificationSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
});

export const domainVerificationUpdateSchema = domainVerificationSchema
	.partial()
	.required({
		id: true,
	});
