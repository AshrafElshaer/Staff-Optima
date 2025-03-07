import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Only load .env file in development
if (process.env.NODE_ENV !== "production") {
	config({ path: require.resolve("../../.env") });
}

const getEnvVariable = (name: string) => {
	const value = process.env[name];
	if (value == null) throw new Error(`environment variable ${name} not found`);
	return value;
};

export const client = postgres(getEnvVariable("DATABASE_URL"));

export const db = drizzle(client, { schema });
