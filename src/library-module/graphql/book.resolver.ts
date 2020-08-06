import { Resolver, Query } from "type-graphql";
import { Inject } from "typedi";

import { Book } from "./models";
import { IBookService, TokenBookService } from "../domain";

@Resolver()
export class BookResolver {
	constructor(
		@Inject(TokenBookService) private readonly bookService: IBookService,
	) {}

	@Query(() => [Book], { description: "Get all the books" })
	async books(): Promise<Book[]> {
		return await this.bookService.findAll();
	}
}
