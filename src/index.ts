import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import * as TypeORM from "typeorm";
import * as path from "path";
// import { buildSchema } from "type-graphql";
import { Container } from "typedi";

// tslint:disable-next-line
import {
	AuthorRepoPostgre,
	BookRepoPostgre,
} from "./modules/library/repositories";

// import { AuthorResolver, BookResolver } from "./modules/library/graphql";
import { createSchema } from "./utils";

require("dotenv").config({
	path: path.resolve(process.cwd(), `.env.${process.env.TIER}`),
});

async function bootstrap() {
	try {
		TypeORM.useContainer(Container);
		await TypeORM.createConnection({
			type: "postgres",
			host: process.env.TYPEORM_MIGRATION_POSTGRES_HOST,
			port: (process.env
				.TYPEORM_MIGRATION_POSTGRES_PORT as unknown) as number,
			username: process.env.POSTGRES_USER,
			password: process.env.POSTGRES_PASSWORD,
			database: process.env.POSTGRES_DB,
			entities: [
				__dirname + "/modules/**/repositories/**/*.entity{.ts,.js}",
			],
			synchronize: process.env.TYPEORM_SYNCHRONIZE === "true",
			dropSchema: process.env.TYPEORM_DROPSCHEMA === "true",
			logger: "advanced-console",
			logging: "all",
			cache: true,
		});

		Container.get(BookRepoPostgre);
		Container.get(AuthorRepoPostgre);

		// build TypeGraphQL executable schema
		const schema = await createSchema();
		// buildSchema({
		// 	resolvers: [AuthorResolver, BookResolver],
		// 	emitSchemaFile: path.resolve(__dirname, "schema.gql"), // automatically create `schema.gql` file with schema definition in current folder
		// 	container: Container,
		// });

		// Create GraphQL server
		const server = new ApolloServer({
			schema,
			playground: true, // enable GraphQL Playground
		});

		// Start the server
		const { url } = await server.listen(4000);
		console.log(
			`Server is running, GraphQL Playground available at ${url}`,
		);
	} catch (error) {
		console.log(`ERROR:${error}`);
	}
}

bootstrap();
