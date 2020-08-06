import { Service } from "typedi";
import { IBook, TokenBookRepo, IBookRepo } from "../domain";
import { InjectRepository } from "typeorm-typedi-extensions";

import { Repository } from "typeorm";
import { Book } from "./entities";

export { TokenBookRepo };

@Service(TokenBookRepo)
export class BookRepoPostgre implements IBookRepo {
	constructor(
		@InjectRepository(Book)
		private bookRepo: Repository<Book>,
	) {}

	async create(book: Partial<IBook>): Promise<IBook> {
		const newBook: IBook = await this.bookRepo.save(
			this.bookRepo.create(book),
		);
		return await this.bookRepo.findOneOrFail(newBook.bookId, {
			relations: ["author"],
		});
	}

	async update(id: number, book: Partial<IBook>): Promise<IBook> {
		await this.bookRepo.update(id, book);
		return await this.bookRepo.findOneOrFail(id, { relations: ["author"] });
	}

	async findAll(): Promise<IBook[]> {
		return await this.bookRepo.find({ relations: ["author"] });
	}
}
