export interface IAuthor {
	authorId: number;
	name: string;
}

export class Author implements IAuthor {
	authorId!: number;
	name!: string;
}
