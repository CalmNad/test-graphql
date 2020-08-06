import { Resolver, Mutation, InputType, Field, Arg } from "type-graphql";
import { Inject } from "typedi";

import { Author } from "./models";
import { IAuthor, IAuthorService, TokenAuthorService } from "../domain";

@InputType()
class AuthorInput implements Partial<IAuthor> {
	@Field()
	name!: string;
}

@Resolver()
export class AuthorResolver {
	constructor(
		@Inject(TokenAuthorService)
		private readonly authorService: IAuthorService,
	) {}

	@Mutation(() => Author)
	async createAuthor(
		@Arg("data", () => AuthorInput) data: AuthorInput,
	): Promise<IAuthor> {
		return await this.authorService.create(data);
	}

	@Mutation(() => Author)
	async updateAuthor(
		@Arg("id") id: number,
		@Arg("data", () => AuthorInput) data: AuthorInput,
	): Promise<IAuthor> {
		return await this.authorService.update(id, data);
	}
}
