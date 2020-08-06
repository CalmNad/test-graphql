import { Token } from "typedi";
import { IAuthor } from "../entities";

export interface IAuthorRepo {
	create(author: Partial<IAuthor>): Promise<IAuthor>;
}

export const TokenAuthorRepo = new Token<IAuthorRepo>();
