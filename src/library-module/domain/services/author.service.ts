import { Service, Token, Inject } from "typedi";
// import { plainToClass } from "class-transformer";

import { IAuthor } from "../entities";
import { IAuthorRepo, TokenAuthorRepo } from ".";

export interface IAuthorService {
	create(author: Partial<IAuthor>): Promise<IAuthor>;
}

export const TokenAuthorService = new Token<IAuthorService>();

@Service(TokenAuthorService)
export class AuthorService implements IAuthorService {
	constructor(
		@Inject(TokenAuthorRepo) private readonly authorRepo: IAuthorRepo,
	) {}

	async create(author: Partial<IAuthor>): Promise<IAuthor> {
		return this.authorRepo.create(author);
	}
}
