import "dotenv/config";

import { client } from "@/database";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";

if (process.env.NODE_ENV !== "production") {
	config({ path: require.resolve("../../.env") });
}

const main = async () => {
	await migrate(drizzle(client), {
		migrationsFolder: `${__dirname}/../drizzle`,
	});
	await client.end();
	process.exit(0);
};

void main();
