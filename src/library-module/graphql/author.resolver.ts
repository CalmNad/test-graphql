import { Arg, Field, InputType, Mutation, Resolver } from "type-graphql";
import { Inject } from "typedi";

import { IAuthor, IAuthorService, TokenAuthorService } from "../domain";

import { Author } from "./models";

@InputType()
class AuthorDTO implements Partial<IAuthor> {
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
		@Arg("data", () => AuthorDTO) data: AuthorDTO,
	): Promise<IAuthor> {
		return await this.authorService.create(data);
	}

	@Mutation(() => Author)
	async updateAuthor(
		@Arg("id") id: number,
		@Arg("data", () => AuthorDTO) data: AuthorDTO,
	): Promise<IAuthor> {
		return await this.authorService.update(id, data);
	}
}
