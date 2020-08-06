import { Service } from "typedi";
import { IAuthor, TokenAuthorRepo, IAuthorRepo } from "../domain";
import { InjectRepository } from "typeorm-typedi-extensions";

import { Repository } from "typeorm";
import { Author } from "./entities";

export { TokenAuthorRepo };

@Service(TokenAuthorRepo)
export class AuthorRepoPostgre implements IAuthorRepo {
	constructor(
		@InjectRepository(Author)
		private authorRepo: Repository<Author>,
	) {}

	async create(author: Partial<IAuthor>): Promise<IAuthor> {
		return await this.authorRepo.save(this.authorRepo.create(author));
	}

	async update(id: number, author: Partial<IAuthor>): Promise<IAuthor> {
		await this.authorRepo.update(id, author);
		return await this.authorRepo.findOneOrFail(id);
	}
}
