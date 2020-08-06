import { Service } from "typedi";
import { IBook, TokenBookRepo, IBookRepo } from "../domain";
import { InjectRepository } from "typeorm-typedi-extensions";

import { Repository } from "typeorm";
import { Book } from "./entities";

export { TokenBookRepo };

@Service(TokenBookRepo)
export class BookRepoMemory implements IBookRepo {
	constructor(
		@InjectRepository(Book)
		private bookRepo: Repository<Book>,
	) {}

	async findAll(): Promise<IBook[]> {
		return await this.bookRepo.find({ relations: ["author"] });
	}
}
