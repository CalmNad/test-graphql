import { buildSchema } from "type-graphql";
import { Container } from "typedi";
import { resolve } from "path";

export const createSchema = () =>
	buildSchema({
		resolvers: [resolve(__dirname, "../modules/**/*.resolver.ts")],
		emitSchemaFile: resolve(__dirname, "../schema.gql"),
		container: Container,
	});
