"use server";
import { headers } from "next/headers";

export async function getCountryCode(): Promise<string> {
	return (await headers()).get("x-vercel-ip-country") ?? "US";
}
