import { createConnection, useContainer } from "typeorm";
import { resolve } from "path";
import { Container } from "typedi";

require("dotenv").config({
	path: resolve(process.cwd(), `.env.${process.env.TIER}`),
});

export const typeormConnection = () => {
	useContainer(Container);

	return createConnection({
		type: "postgres",
		host: process.env.TYPEORM_MIGRATION_POSTGRES_HOST,
		port: (process.env
			.TYPEORM_MIGRATION_POSTGRES_PORT as unknown) as number,
		username: process.env.POSTGRES_USER,
		password: process.env.POSTGRES_PASSWORD,
		database: process.env.POSTGRES_DB,
		entities: [
			__dirname + "/../../modules/**/repositories/**/*.entity{.ts,.js}",
		],
		synchronize: process.env.TYPEORM_SYNCHRONIZE === "true",
		dropSchema: process.env.TYPEORM_DROPSCHEMA === "true",
		logger: "advanced-console",
		logging: ["error"],
		cache: true,
	});
};
