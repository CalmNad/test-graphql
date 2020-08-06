import { Service, Token, Inject } from "typedi";
// import { plainToClass } from "class-transformer";

import { IBook } from "../entities";
import { IBookRepo, TokenBookRepo } from ".";

export interface IBookService {
	findAll(): Promise<IBook[]>;
}

export const TokenBookService = new Token<IBookService>();

@Service(TokenBookService)
export class BookService implements IBookService {
	constructor(@Inject(TokenBookRepo) private readonly bookRepo: IBookRepo) {}

	async findAll(): Promise<IBook[]> {
		return this.bookRepo.findAll();
	}
}
