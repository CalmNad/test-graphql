import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

import { IAuthor } from "../../domain";

@Entity("authors")
export class Author implements IAuthor {
	@PrimaryGeneratedColumn()
	readonly authorId!: number;

	@Column()
	name!: string;
}
