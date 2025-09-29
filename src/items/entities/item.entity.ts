import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Listing } from "./listing.entity";
import { Comment } from "./comment.entity";
import { AbstractEntity } from "src/database/abstract.entity";
import { Tag } from "./tag.entity";

@Entity()
export class Item{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: "Untitled"})
    name: string;

    @Column({default: true})
    public: boolean;

    @OneToOne(() => Listing, {cascade: true})
    @JoinColumn()
    listing: Listing;

    @OneToMany(() => Comment, (comment)=> comment.item, {cascade:true})
    comments: Comment[];

    @ManyToMany(() => Tag, {cascade: true})
    @JoinTable()
    tags: Tag[];


    constructor(entity: Partial<Item>) {
        Object.assign(this, entity);
    }
}
