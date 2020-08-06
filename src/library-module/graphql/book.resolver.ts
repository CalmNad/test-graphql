import {
	Arg,
	Field,
	InputType,
	Int,
	Mutation,
	Query,
	Resolver,
} from "type-graphql";
import { Inject } from "typedi";

import { IBook, IBookService, TokenBookService } from "../domain";

import { Book } from "./models";

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

@Resolver()
export class BookResolver {
	constructor(
		@Inject(TokenBookService) private readonly bookService: IBookService,
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
}
