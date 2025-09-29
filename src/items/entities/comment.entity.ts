import { AbstractEntity } from "src/database/abstract.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Item } from "./item.entity";

@Entity()
export class Comment extends AbstractEntity<Comment> {

    @Column()
    content: string;

    @ManyToOne(() => Item, (item) => item.comments, {cascade: true})
    item: Item;
}