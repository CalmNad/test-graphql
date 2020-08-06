import { Field, ObjectType } from "type-graphql";

import { IAuthor } from "../../domain";

@ObjectType({ description: "The Author model" })
export class Author implements IAuthor {
	@Field({ description: "The author's id" })
	authorId!: number;

	@Field({ description: "The author's name" })
	name!: string;
}
