import { Token } from "typedi";
import { IBook } from "../entities";

export interface IBookRepo {
	create(book: Partial<IBook>): Promise<IBook>;
	update(id: number, book: Partial<IBook>): Promise<IBook>;
	findAll(): Promise<IBook[]>;
}

export const TokenBookRepo = new Token<IBookRepo>();
