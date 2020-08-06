import { Token } from "typedi";
import { IBook } from "../entities";

export interface IBookRepo {
	findAll(): Promise<IBook[]>;
}

export const TokenBookRepo = new Token<IBookRepo>();
