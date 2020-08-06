import { PrimaryGeneratedColumn, Column, Entity, BaseEntity } from "typeorm";

import { IAuthor } from "../../domain";

@Entity("authors")
export class Author extends BaseEntity implements IAuthor {
	@PrimaryGeneratedColumn()
	readonly authorId!: number;

	@Column()
	name!: string;
}
