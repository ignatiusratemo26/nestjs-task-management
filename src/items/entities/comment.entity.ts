import { AbstractEntity } from "src/database/abstract.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Item } from "./item.entity";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @ManyToOne(() => Item, (item) => item.comments)
    item: Item;

    constructor(entity: Partial<Comment>) {
        Object.assign(this, entity);
    }
}