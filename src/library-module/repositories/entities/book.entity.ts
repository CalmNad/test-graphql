import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";

import { IBook } from "../../domain";
import { Author } from "./author.entity";

@Entity("books")
export class Book implements IBook {
	@PrimaryGeneratedColumn()
	readonly bookId!: number;

	@Column()
	name!: string;

	@Column()
	pageCount!: number;

	@Column()
	authorId!: number;

	// @ts-ignore
	@ManyToOne((type) => Author)
	@JoinColumn({ name: "authorId" })
	author!: Author;
}
