import { Field, ObjectType } from "type-graphql";

import { IBook } from "../../domain";
import { Author } from "./author";

@ObjectType({ description: "The book model" })
export class Book implements IBook {
	@Field({ description: "The book's id" })
	bookId!: number;

	@Field({ description: "The name of the book" })
	name!: string;

	@Field({ description: "The number of pages in the book" })
	pageCount!: number;

	@Field({ description: "The book's author's id" })
	authorId!: number;

	@Field(() => Author, { description: "The book's author" })
	author!: Author;
}
