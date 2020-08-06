import {
	Arg,
	Field,
	FieldResolver,
	InputType,
	Int,
	Mutation,
	Query,
	Resolver,
	Root,
} from "type-graphql";
import { Inject } from "typedi";

import {
	IBook,
	IBookService,
	TokenBookService,
	TokenAuthorService,
	IAuthorService,
} from "../domain";

import { Author, Book } from "./models";

@InputType()
class BookCreateDTO implements Partial<IBook> {
	@Field()
	name!: string;

	@Field()
	pageCount!: number;

	@Field()
	authorId!: number;
}

@InputType()
class BookUpdateDTO implements Partial<IBook> {
	@Field(() => String, { nullable: true })
	name?: string;

	@Field(() => Int, { nullable: true })
	pageCount?: number;

	@Field(() => Int, { nullable: true })
	authorId?: number;
}

// @ts-ignore
@Resolver((of) => Book)
export class BookResolver {
	constructor(
		@Inject(TokenBookService) private readonly bookService: IBookService,
		@Inject(TokenAuthorService)
		private readonly authorService: IAuthorService,
	) {}

	@Mutation(() => Book)
	async createBook(
		@Arg("data", () => BookCreateDTO) data: BookCreateDTO,
	): Promise<IBook> {
		return await this.bookService.create(data);
	}

	@Mutation(() => Book)
	async updateBook(
		@Arg("id") id: number,
		@Arg("data", () => BookUpdateDTO) data: BookUpdateDTO,
	): Promise<IBook> {
		return await this.bookService.update(id, data);
	}

	@Query(() => [Book], { description: "Get all the books" })
	async books(): Promise<Book[]> {
		return await this.bookService.findAll();
	}

	@FieldResolver(() => Author)
	async authorByResolver(@Root() book: Book) {
		const author = await this.authorService.findById(book.authorId);
		return author;
	}
}
