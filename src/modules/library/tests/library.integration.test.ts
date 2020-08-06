import "reflect-metadata";
import { graphqlCall } from "../../../utils";
import { Connection } from "typeorm";
import { Author, Book } from "../repositories/entities";
import * as faker from "faker";

import { typeormConnection } from "../../../tests";

let conn: Connection;

beforeAll(async () => {
	conn = await typeormConnection();
});

afterAll(() => {
	conn.close();
});

beforeEach(async () => {
	await Book.delete({});
	await Author.delete({});
});

describe("create author", () => {
	it("with correct data", async () => {
		// prepare data
		const request = `
			mutation Register($data: AuthorDTO!) {
				createAuthor(
					data: $data
				) {
					authorId
					name
				}
			}
		`;
		const author = {
			authorId: 1,
			name: `${faker.name.firstName()} ${faker.name.lastName()}`,
		};

		// call API
		const result = await graphqlCall({
			source: request,
			variableValues: {
				data: {
					name: author.name,
				},
			},
		});

		// check DB data
		const authorDB = await Author.findOne({
			where: { authorId: author.authorId, name: author.name },
		});
		expect(authorDB).toBeDefined();

		// check response data
		expect(result).toMatchObject({
			data: {
				createAuthor: {
					authorId: authorDB!.authorId,
					name: author.name,
				},
			},
		});
	});
});

describe("create book", () => {
	it("with correct data", async () => {
		// prepare data
		const author = await Author.save(
			Author.create({
				name: `${faker.name.firstName()} ${faker.name.lastName()}`,
			}),
		);
		const request = `
			mutation Register($data: BookCreateDTO!) {
				createBook(
					data: $data
				) {
					bookId
					name
					pageCount
					authorId
				}
			}
		`;
		const book = {
			bookId: 1,
			name: `${faker.commerce.productName()}`,
			pageCount: 120,
			authorId: author.authorId,
		};

		// call API
		const result = await graphqlCall({
			source: request,
			variableValues: {
				data: {
					name: book.name,
					pageCount: book.pageCount,
					authorId: book.authorId,
				},
			},
		});

		// check DB data
		const bookDB = await Book.findOne({
			where: {
				name: book.name,
				pageCount: book.pageCount,
				authorId: book.authorId,
			},
		});
		expect(bookDB).toBeDefined();

		// check response data
		expect(result).toMatchObject({
			data: {
				createBook: {
					bookId: bookDB!.bookId,
					name: book.name,
					pageCount: book.pageCount,
					authorId: book.authorId,
				},
			},
		});
	});
});

describe("read all books", () => {
	it("without authors", async () => {
		// prepare data
		const authorDB = await Author.save(
			Author.create({
				name: `${faker.name.firstName()} ${faker.name.lastName()}`,
			}),
		);
		const bookDB = await Book.save(
			Book.create({
				name: `${faker.commerce.productName()}`,
				pageCount: 110,
				authorId: authorDB.authorId,
			}),
		);
		const request = `
			{
				findBooks {
					bookId
					name
					pageCount
					authorId
				}
			}
		`;

		// call API
		const result = await graphqlCall({
			source: request,
		});

		// check response data
		expect(result).toMatchObject({
			data: {
				findBooks: [
					{
						bookId: bookDB.bookId,
						name: bookDB.name,
						pageCount: bookDB.pageCount,
						authorId: bookDB.authorId,
					},
				],
			},
		});
	});

	it("with authors", async () => {
		// prepare data
		const authorDB = await Author.save(
			Author.create({
				name: `${faker.name.firstName()} ${faker.name.lastName()}`,
			}),
		);
		const bookDB = await Book.save(
			Book.create({
				name: `${faker.commerce.productName()}`,
				pageCount: 110,
				authorId: authorDB.authorId,
			}),
		);
		const request = `
			{
				findBooks {
					bookId
					name
					pageCount
					author {
						authorId
						name
					}
				}
			}
		`;

		// call API
		const result = await graphqlCall({
			source: request,
		});

		// check response data
		expect(result).toMatchObject({
			data: {
				findBooks: [
					{
						bookId: bookDB.bookId,
						name: bookDB.name,
						pageCount: bookDB.pageCount,
						author: {
							authorId: authorDB.authorId,
							name: authorDB.name,
						},
					},
				],
			},
		});
	});
});
