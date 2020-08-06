import { Service, Token, Inject } from "typedi";
// import { plainToClass } from "class-transformer";

import { IBook } from "../entities";
import { IBookRepo, TokenBookRepo } from ".";

export interface IBookService {
	create(book: Partial<IBook>): Promise<IBook>;
	update(id: number, book: Partial<IBook>): Promise<IBook>;
	findAll(): Promise<IBook[]>;
}

export const TokenBookService = new Token<IBookService>();

@Service(TokenBookService)
export class BookService implements IBookService {
	constructor(@Inject(TokenBookRepo) private readonly bookRepo: IBookRepo) {}

	async create(book: Partial<IBook>): Promise<IBook> {
		return this.bookRepo.create(book);
	}

	async update(id: number, book: Partial<IBook>): Promise<IBook> {
		return this.bookRepo.update(id, book);
	}

	async findAll(): Promise<IBook[]> {
		return this.bookRepo.findAll();
	}
}
