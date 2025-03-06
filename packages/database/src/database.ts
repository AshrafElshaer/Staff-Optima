import "dotenv/config";

import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";
import postgres from "postgres";


const getEnvVariable = (name: string) => {
	const value = process.env[name];
	if (value == null) throw new Error(`environment variable ${name} not found`);
	return value;
};

export const client = postgres(getEnvVariable("DATABASE_URL"));

export const db = drizzle(client, { schema });
