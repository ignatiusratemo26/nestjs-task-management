import { AbstractEntity } from "src/database/abstract.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Listing {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    rating: number;

    constructor(entity: Partial<Listing>) {
        Object.assign(this, entity);
    }

}