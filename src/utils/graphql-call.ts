import { graphql, GraphQLSchema } from "graphql";
import { Maybe } from "type-graphql";
import { createSchema } from "./graphql-schema";
import { Container } from "typedi";

import {
	AuthorRepoPostgre,
	BookRepoPostgre,
} from "../modules/library/repositories";

interface Options {
	source: string;
	variableValues?: Maybe<{
		[key: string]: any;
	}>;
}

let schema: GraphQLSchema;

export const graphqlCall = async ({ source, variableValues }: Options) => {
	if (!schema) {
		schema = await createSchema();
		Container.get(BookRepoPostgre);
		Container.get(AuthorRepoPostgre);
	}

	return graphql({
		schema: schema,
		source,
		variableValues,
	});
};
