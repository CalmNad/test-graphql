import { IAuthor } from ".";

export interface IBook {
	bookId: number;
	name: string;
	pageCount: number;
	authorId: number;
	author: IAuthor;
}

export class Book implements IBook {
	bookId!: number;
	name!: string;
	pageCount!: number;
	authorId!: number;
	author!: IAuthor;

	// constructor(
	// 	bookId: number,
	// 	name: string,
	// 	pageCount: number,
	// 	authorId: number,
	// ) {
	// 	this.bookId = bookId;
	// 	this.name = name;
	// 	this.pageCount = pageCount;
	// 	this.authorId = authorId;
	// }
}
