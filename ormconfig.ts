import { ConnectionOptions } from "typeorm";
import path = require("path");

require("dotenv").config({
	path: path.resolve(process.cwd(), `.env`),
});

// Check typeORM documentation for more information.
const config: ConnectionOptions = {
	type: "postgres",
	host: process.env.TYPEORM_MIGRATION_POSTGRES_HOST,
	port: (process.env.TYPEORM_MIGRATION_POSTGRES_PORT as unknown) as number,
	username: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	database: process.env.POSTGRES_DB,
	entities: [__dirname + "/src/**/*.entity{.ts,.js}"],

	// We are using migrations, synchronize should be set to false.
	synchronize: false,

	// Run migrations automatically,
	// you can disable this if you prefer running migration manually.
	migrationsRun: true,
	logging: true,
	logger: "file",

	// allow both start:prod and start:dev to use migrations
	// __dirname is either dist or src folder, meaning either
	// the compiled js in prod or the ts in dev
	migrations: [__dirname + "/migrations/**/*{.ts,.js}"],
	cli: {
		migrationsDir: "migrations",
	},
};

export = config;
